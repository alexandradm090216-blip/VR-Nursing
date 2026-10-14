/* =====================================================================
   VR Bridge: conecta la web con la app de Unity en Meta Quest.
   Flujo: la web crea una sesión con un código corto -> la app del Quest
   introduce el código, lee la sesión y escribe el resultado -> la web lo
   recibe y actualiza el progreso del estudiante.
   Backend: Firebase Realtime Database mediante su API REST (sin SDK).
   ===================================================================== */
const VR_BRIDGE_CONFIG = {
  // Pega aquí la URL de tu Realtime Database, sin barra final.
  // Ejemplo: 'https://mi-proyecto-default-rtdb.firebaseio.com'
  databaseUrl: '',
  pollMs: 3000,
  sessionTtlMs: 2 * 60 * 60 * 1000
};

const VR_CASES = {
  'Sala de procedimientos': 'canalizacion_iv_01',
  'Habitación del paciente': 'signos_vitales_01',
  'Servicio de urgencias': 'urgencias_01',
  'Área de hospitalización': 'administracion_med_01'
};

let vrSessionCode = null;
let vrPollTimer = null;

function vrBridgeConfigured(){ return !!VR_BRIDGE_CONFIG.databaseUrl; }

function vrNewCode(){
  // 6 caracteres sin letras ambiguas (sin 0/O, 1/I/L)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let c = '';
  const buf = new Uint32Array(6);
  crypto.getRandomValues(buf);
  buf.forEach(n => c += chars[n % chars.length]);
  return c;
}

function vrSessionUrl(code){
  return VR_BRIDGE_CONFIG.databaseUrl.replace(/\/$/, '') + '/sessions/' + code + '.json';
}

async function vrCreateSession(scenario){
  const code = vrNewCode();
  const payload = {
    scenario: scenario,
    caseId: VR_CASES[scenario] || 'canalizacion_iv_01',
    level: overallProgressPct(),
    progress: STATE.progress,
    createdAt: Date.now(),
    expiresAt: Date.now() + VR_BRIDGE_CONFIG.sessionTtlMs,
    status: 'waiting',
    result: null
  };
  const res = await fetch(vrSessionUrl(code), {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('No se pudo crear la sesión (HTTP ' + res.status + ')');
  return code;
}

async function vrFetchSession(code){
  const res = await fetch(vrSessionUrl(code));
  if(!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

function vrStopPolling(){
  if(vrPollTimer){ clearInterval(vrPollTimer); vrPollTimer = null; }
}

function vrRenderPanel(html){
  const el = document.getElementById('vrPairing');
  if(el){ el.style.display = 'block'; el.innerHTML = html; }
}

function vrApplyResult(result){
  // result = { correct:number, total:number, errors:number, seconds:number }
  if(!result) return;
  const total = Math.max(1, Number(result.total) || 1);
  const pct = Math.round((Number(result.correct) || 0) / total * 100);
  addScore(pct);
  for(let i = 0; i < (Number(result.errors) || 0); i++) addError();
  addPracticeMinutes(Math.max(1, Math.round((Number(result.seconds) || 60) / 60)));
  setModuleProgress('simulacion', Math.max(STATE.progress.simulacion || 0, pct));
}

function vrPoll(){
  vrFetchSession(vrSessionCode).then(s => {
    if(!s) return;
    if(s.status === 'connected'){
      vrRenderPanel(vrPanelHTML('connected'));
    } else if(s.status === 'completed'){
      vrStopPolling();
      vrApplyResult(s.result);
      vrRenderPanel(vrPanelHTML('completed', s.result));
    }
  }).catch(() => { /* reintenta en el siguiente ciclo */ });
}

function vrPanelHTML(state, result){
  const code = vrSessionCode;
  if(state === 'waiting'){
    return `<div class="case-box"><div class="case-lbl">SESIÓN CREADA</div>
      <p class="txt">En la app VR Nursing Lab de las gafas Meta Quest, elige <b>Conectar con la web</b> e introduce este código:</p>
      <div style="font-family:var(--font-mono);font-size:34px;font-weight:600;letter-spacing:.25em;margin:14px 0;color:var(--blue);">${code}</div>
      <p class="txt">Esperando conexión del visor. El código caduca en 2 horas.</p>
      <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="vrCancelSession()">Cancelar sesión</button></div>`;
  }
  if(state === 'connected'){
    return `<div class="case-box"><div class="case-lbl">VISOR CONECTADO</div>
      <p class="txt">La app del Quest ya cargó el escenario. Cuando termines la práctica, el resultado aparecerá aquí automáticamente.</p>
      <div style="font-family:var(--font-mono);font-size:20px;margin-top:10px;">${code}</div></div>`;
  }
  if(state === 'completed'){
    const r = result || {};
    return `<div class="case-box"><div class="case-lbl">RESULTADO DE LA PRÁCTICA EN VR</div>
      <div class="report-grid">
        <div class="stat"><div class="stat-num">${r.correct ?? 0}/${r.total ?? 0}</div><div class="stat-label">ACCIONES CORRECTAS</div></div>
        <div class="stat"><div class="stat-num">${r.errors ?? 0}</div><div class="stat-label">ERRORES</div></div>
        <div class="stat"><div class="stat-num">${r.seconds ?? 0}s</div><div class="stat-label">TIEMPO</div></div>
      </div>
      <p class="txt">El resultado ya se sumó a tu progreso. Puntuación educativa de entrenamiento, no equivale a una calificación clínica real.</p></div>`;
  }
  if(state === 'error'){
    return `<div class="case-box"><div class="case-lbl">NO SE PUDO CREAR LA SESIÓN</div>
      <p class="txt">${result}</p></div>`;
  }
  return '';
}

function vrCancelSession(){
  vrStopPolling();
  if(vrBridgeConfigured() && vrSessionCode){
    fetch(vrSessionUrl(vrSessionCode), {method:'DELETE'}).catch(() => {});
  }
  vrSessionCode = null;
  const el = document.getElementById('vrPairing');
  if(el){ el.style.display = 'none'; el.innerHTML = ''; }
}

async function pickVRScenario(name){
  vrStopPolling();
  if(!vrBridgeConfigured()){
    vrRenderPanel(vrPanelHTML('error',
      'El puente con el visor aún no está configurado. Falta indicar la URL de la base de datos en assets/js/vr-bridge.js. Los pasos están en docs/UNITY.md.'));
    return;
  }
  try{
    vrSessionCode = await vrCreateSession(name);
    vrRenderPanel(vrPanelHTML('waiting'));
    vrPollTimer = setInterval(vrPoll, VR_BRIDGE_CONFIG.pollMs);
  }catch(e){
    vrRenderPanel(vrPanelHTML('error', e.message));
  }
}
