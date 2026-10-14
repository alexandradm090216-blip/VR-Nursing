# Conexión con Unity y Meta Quest

La web y la app del Quest se conectan con un **código de emparejamiento de 6 caracteres**, a través de una base de datos Firebase Realtime Database (gratuita para este uso).

```
Web (GitHub Pages)  ──crea sesión ABC234──▶  Firebase  ◀──lee ABC234──  App Unity (Quest)
        ▲                                                                      │
        └─────────────── resultado de la práctica (correctas, errores, tiempo) ◀┘
```

## Parte 1. Crear la base de datos (una sola vez)

1. Entra a https://console.firebase.google.com con una cuenta de Google y crea un proyecto (puedes desactivar Google Analytics).
2. En el menú **Build → Realtime Database**, haz clic en **Create Database**. Elige la ubicación más cercana y el modo **Locked mode**.
3. Ve a la pestaña **Rules**, reemplaza todo por esto y pulsa **Publish**:

```json
{
  "rules": {
    "sessions": {
      "$code": {
        ".read": true,
        ".write": true,
        ".validate": "!newData.exists() || newData.hasChildren(['scenario', 'status'])"
      }
    }
  }
}
```

   Con estas reglas nadie puede listar todas las sesiones: solo se accede a una sesión si se conoce su código. No se guardan datos personales, solo porcentajes de progreso. Para uso con estudiantes reales, conviene después agregar autenticación.
4. Copia la **URL de la base de datos** (arriba de la pestaña Data), por ejemplo `https://mi-proyecto-default-rtdb.firebaseio.com`.

## Parte 2. Configurar la web

1. Abre `assets/js/vr-bridge.js` en este repositorio.
2. En `databaseUrl` pega la URL del paso anterior, sin barra final.
3. Guarda el cambio (commit). GitHub Pages se actualiza solo.

Prueba: en la web, entra a **Simulación VR → Entrar al entorno VR**, elige un escenario y debe aparecer un código de 6 caracteres.

## Parte 3. Configurar Unity

Requisitos: Unity 2022 LTS o superior, módulo Android, XR Interaction Toolkit y plugin de Meta/Oculus.

1. Copia `unity/Assets/Scripts/VRNursingBridge.cs` a `Assets/Scripts/` de tu proyecto.
2. Crea un objeto vacío llamado `VRNursingBridge` en tu escena de menú y agrégale el script. En **Database Url** pega la misma URL de Firebase.
3. Crea una pantalla con un campo de texto y un botón **Conectar con la web**. El botón llama a `Connect(codigo)` con lo que escribió el estudiante (puedes usar el teclado virtual del Quest).
4. En el evento **On Session Loaded** del componente, enlaza una función tuya que cargue la escena según `session.scenario` y `session.caseId`. Los escenarios que envía la web son: Sala de procedimientos, Habitación del paciente, Servicio de urgencias y Área de hospitalización.
5. Al terminar la práctica, llama a `SendResult(correctas, total, errores, segundos)`. La web recibe el resultado en unos 3 segundos y lo suma al progreso del estudiante.
6. Compila: **File → Build Settings → Android**, con el Quest conectado por USB y el modo desarrollador activado en la app Meta Horizon del celular.

## Estados de una sesión

| Estado | Quién lo escribe | Qué significa |
|---|---|---|
| `waiting` | Web | Sesión creada, esperando al visor |
| `connected` | Unity | El visor leyó el código y cargó el escenario |
| `completed` | Unity | La práctica terminó y trae `result` |

## Identificadores de casos clínicos

| Escenario | caseId |
|---|---|
| Sala de procedimientos | `canalizacion_iv_01` |
| Habitación del paciente | `signos_vitales_01` |
| Servicio de urgencias | `urgencias_01` |
| Área de hospitalización | `administracion_med_01` |

Para cambiarlos o agregar más, edita `VR_CASES` en `assets/js/vr-bridge.js`.
