/* ================= DATA ================= */

const NAV = [
  {group:'PLATAFORMA', items:[
    {id:'home', label:'Inicio'},
    {id:'dashboard', label:'Mi entrenamiento'},
  ]},
  {group:'MÓDULOS', items:[
    {id:'modulos', label:'Módulos'},
    {id:'signos', label:'Signos vitales'},
    {id:'inyecciones', label:'Inyecciones'},
    {id:'canalizacion', label:'Canalización'},
    {id:'anatomia', label:'Anatomía'},
    {id:'seguridad', label:'Bioseguridad'},
  ]},
  {group:'SIMULACIÓN', items:[
    {id:'vr', label:'Simulación VR'},
    {id:'simulacion', label:'Casos clínicos'},
    {id:'evaluacion', label:'Evaluación'},
  ]},
  {group:'SEGUIMIENTO', items:[
    {id:'progreso', label:'Mi progreso'},
    {id:'docente', label:'Panel docente'},
    {id:'config', label:'Configuración'},
  ]},
];

const MODULES = [
  {id:'signos', title:'Signos vitales', desc:'Temperatura, FC, FR, presión arterial, SpO₂ y dolor.', level:'Principiante', view:'signos'},
  {id:'inyecciones', title:'Vía parenteral', desc:'Intramuscular, subcutánea, intradérmica e intravenosa.', level:'Básico', view:'inyecciones'},
  {id:'canalizacion', title:'Canalización venosa', desc:'Anatomía, técnica y bioseguridad de la vía periférica.', level:'Intermedio', view:'canalizacion'},
  {id:'anatomia', title:'Anatomía interactiva', desc:'Sitios anatómicos para administración de medicamentos.', level:'Básico', view:'anatomia'},
  {id:'seguridad', title:'Seguridad del paciente', desc:'Bioseguridad, identificación y manejo de riesgos.', level:'Transversal', view:'seguridad'},
  {id:'simulacion', title:'Simulación clínica', desc:'Casos completos con decisiones y reporte final.', level:'Avanzado', view:'simulacion'},
];

const LEVELS = ['Exploración','Fundamentos','Práctica guiada','Simulación','Evaluación','Competencia'];

const DISCLAIMER = "Este contenido tiene finalidad educativa y debe contrastarse con los protocolos institucionales, guías clínicas y normativa vigente antes de su aplicación en pacientes reales.";

/* ---- Vital signs data ---- */
const VITAL_SIGNS = {
  pa: {
    name:'Presión arterial', objetivo:'Valorar la fuerza que ejerce la sangre sobre las paredes arteriales durante la sístole y la diástole, como indicador del estado hemodinámico del paciente.',
    fundamento:'La presión arterial refleja el equilibrio entre el gasto cardíaco y la resistencia vascular periférica. Sus variaciones permiten detectar tempranamente estados de hipotensión, hipertensión o inestabilidad hemodinámica.',
    materiales:['Tensiómetro','Fonendoscopio','Reloj o cronómetro','Guantes (si corresponde)','Hoja de registro'],
    prep:['Identificar al paciente por dos datos.','Explicar el procedimiento y obtener cooperación.','Realizar higiene de manos.','Posicionar al paciente con el brazo apoyado a la altura del corazón.','Garantizar reposo previo de al menos 5 minutos y privacidad.'],
    pasos:[
      {t:'Seleccionar el brazalete adecuado', b:'Elegir un manguito cuyo ancho cubra aproximadamente el 40% de la circunferencia del brazo. Un tamaño incorrecto altera significativamente la lectura.'},
      {t:'Colocar el manguito', b:'Ubicar el brazalete 2-3 cm por encima del pliegue del codo, centrado sobre la arteria braquial, sin ropa que comprima el brazo.'},
      {t:'Palpar y auscultar', b:'Palpar el pulso radial mientras se infla el manguito, luego colocar el fonendoscopio sobre la arteria braquial e inflar 20-30 mmHg por encima del punto donde desapareció el pulso.'},
      {t:'Desinflar y registrar', b:'Desinflar lentamente (2-3 mmHg/seg), identificar los ruidos de Korotkoff para sístole y diástole, y registrar el resultado junto con la posición y el brazo utilizado.'},
    ],
    errores:['Colocar incorrectamente el brazalete (muy alto, muy bajo o suelto).','No permitir reposo previo de 5 minutos antes de la medición.','Hablar con el paciente durante la toma.','Utilizar un tamaño de manguito incorrecto para el brazo.','Desinflar demasiado rápido, perdiendo precisión en la lectura.','Registrar el resultado sin indicar brazo, posición o condición del paciente.'],
    caso:{
      texto:'Paciente adulto, 58 años, acude a control. Se registra: PA 148/94 mmHg, FC 88 lpm, sin síntomas asociados. El estudiante debe interpretar el hallazgo.',
      vitals:[['PA','148/94','mmHg'],['FC','88','lpm'],['FR','16','rpm'],['SpO₂','97','%']],
      pregunta:'¿Cómo debería interpretarse inicialmente esta presión arterial?',
      opciones:[
        'Valor dentro de parámetros normales, no requiere seguimiento.',
        'Valor elevado; se sugiere confirmar con una segunda toma y correlacionar con antecedentes del paciente.',
        'Se trata de una urgencia hipertensiva que requiere manejo inmediato.',
        'El resultado no es válido y debe repetirse sin ninguna otra consideración.'],
      correcta:1,
      explicacion:'Un valor de 148/94 mmHg corresponde a presión elevada según los umbrales clínicos habituales. Lo educativamente correcto es confirmar con una segunda medición y correlacionar con historia clínica, sin calificarlo aún como urgencia.'
    }
  },
  temp:{
    name:'Temperatura', objetivo:'Valorar el equilibrio entre la producción y la pérdida de calor corporal como indicador de procesos infecciosos, inflamatorios o metabólicos.',
    fundamento:'La temperatura corporal refleja la actividad del centro termorregulador hipotalámico. Sus alteraciones (fiebre, hipotermia) son signos clínicos tempranos de múltiples procesos patológicos.',
    materiales:['Termómetro digital','Guantes (si corresponde)','Funda o cubierta desechable','Hoja de registro'],
    prep:['Identificar al paciente.','Explicar el procedimiento.','Higiene de manos.','Seleccionar la vía adecuada según edad y condición (axilar, oral, timpánica).','Verificar que la zona esté seca y sin actividad física reciente.'],
    pasos:[
      {t:'Preparar el termómetro', b:'Verificar el funcionamiento y colocar la funda protectora desechable si corresponde a la vía elegida.'},
      {t:'Posicionar según la vía', b:'Colocar el termómetro en la zona seleccionada (axila, boca u oído) asegurando contacto correcto con la piel o mucosa.'},
      {t:'Esperar el tiempo indicado', b:'Mantener la posición durante el tiempo necesario según el tipo de termómetro hasta obtener la lectura.'},
      {t:'Retirar y registrar', b:'Leer el valor, retirar el termómetro, desechar la funda y registrar temperatura junto con la vía utilizada.'},
    ],
    errores:['Medir inmediatamente después de actividad física o ingesta de líquidos.','Vía inadecuada para la edad o condición del paciente.','No esperar el tiempo completo indicado por el dispositivo.','No registrar la vía utilizada en la medición.'],
    caso:{
      texto:'Lactante de 8 meses con temperatura axilar registrada de 38.6 °C, madre refiere irritabilidad de 6 horas de evolución.',
      vitals:[['Temp','38.6','°C'],['FC','128','lpm'],['FR','32','rpm'],['SpO₂','98','%']],
      pregunta:'¿Qué hallazgo describe mejor este resultado?',
      opciones:['Temperatura normal para la edad.','Fiebre, que junto con la irritabilidad amerita valoración clínica adicional.','Hipotermia leve.','El resultado no puede interpretarse sin más datos.'],
      correcta:1,
      explicacion:'Una temperatura axilar de 38.6 °C se considera fiebre en pediatría. Junto con la irritabilidad reportada, constituye un hallazgo que amerita valoración clínica adicional, no solo registro aislado.'
    }
  },
  fc:{
    name:'Frecuencia cardíaca', objetivo:'Determinar el número de latidos cardíacos por minuto como indicador de la función cardiovascular.',
    fundamento:'La frecuencia cardíaca refleja la respuesta del sistema cardiovascular a las demandas metabólicas, hemodinámicas y autonómicas del organismo.',
    materiales:['Reloj con segundero','Fonendoscopio (opcional)','Guantes (si corresponde)','Hoja de registro'],
    prep:['Identificar al paciente.','Explicar el procedimiento.','Higiene de manos.','Garantizar reposo de al menos 5 minutos.','Posicionar el brazo cómodamente apoyado.'],
    pasos:[
      {t:'Seleccionar el punto de palpación', b:'Elegir una arteria accesible (radial, carotídea, braquial) según la condición del paciente.'},
      {t:'Palpar con los dedos', b:'Utilizar los dedos índice y medio (no el pulgar) ejerciendo presión suave sobre la arteria.'},
      {t:'Contar durante 60 segundos', b:'Contar los latidos durante un minuto completo, especialmente si el ritmo es irregular.'},
      {t:'Registrar características', b:'Anotar frecuencia, ritmo (regular/irregular) y amplitud del pulso.'},
    ],
    errores:['Utilizar el pulgar, que tiene pulso propio y altera el conteo.','Contar menos de 60 segundos en pulsos irregulares.','No registrar ritmo ni amplitud, solo la cifra numérica.','Ejercer presión excesiva que oblitera el pulso.'],
    caso:{
      texto:'Paciente adulto mayor con frecuencia cardíaca de 128 lpm, ritmo irregular, refiere palpitaciones desde hace 30 minutos.',
      vitals:[['FC','128','lpm'],['PA','132/86','mmHg'],['FR','20','rpm'],['SpO₂','95','%']],
      pregunta:'¿Cuál es la interpretación educativa más apropiada?',
      opciones:['Hallazgo normal para la edad, no requiere acción.','Taquicardia con ritmo irregular; amerita valoración médica prioritaria.','Bradicardia que requiere estimulación del paciente.','El pulso irregular siempre indica un error de técnica.'],
      correcta:1,
      explicacion:'Una frecuencia de 128 lpm con ritmo irregular y síntomas asociados constituye un hallazgo de taquicardia con arritmia que amerita valoración médica prioritaria, no una simple anotación de rutina.'
    }
  },
  fr:{
    name:'Frecuencia respiratoria', objetivo:'Valorar el número de respiraciones por minuto como reflejo de la función respiratoria y el estado ácido-base.',
    fundamento:'La frecuencia respiratoria es sensible a cambios tempranos en el estado clínico del paciente, siendo frecuentemente uno de los primeros signos en alterarse ante deterioro.',
    materiales:['Reloj con segundero','Observación directa','Hoja de registro'],
    prep:['Identificar al paciente.','Evitar informar el momento exacto del conteo para no alterar el patrón respiratorio voluntariamente.','Higiene de manos.','Posicionar cómodamente al paciente.'],
    pasos:[
      {t:'Observar el tórax o abdomen', b:'Mantener la vista sobre el movimiento torácico o abdominal sin que el paciente perciba que está siendo contado.'},
      {t:'Contar un ciclo completo', b:'Un ciclo respiratorio incluye una inspiración y una espiración completas.'},
      {t:'Contar durante 60 segundos', b:'Contar el número de ciclos completos durante un minuto, observando también profundidad y ritmo.'},
      {t:'Registrar hallazgos', b:'Anotar frecuencia, ritmo, profundidad y presencia de signos de dificultad respiratoria.'},
    ],
    errores:['Informar al paciente que se está contando la respiración, alterando el patrón.','Contar menos de 60 segundos.','No observar signos de dificultad respiratoria asociados.','Confundir un ciclo (inspiración + espiración) con una sola fase.'],
    caso:{
      texto:'Paciente con frecuencia respiratoria de 28 rpm, uso de músculos accesorios y SpO₂ de 91%.',
      vitals:[['FR','28','rpm'],['SpO₂','91','%'],['FC','110','lpm'],['PA','118/76','mmHg']],
      pregunta:'¿Qué conjunto de hallazgos describe mejor esta situación?',
      opciones:['Patrón respiratorio normal con saturación adecuada.','Signos de dificultad respiratoria que ameritan valoración inmediata.','Hiperventilación voluntaria sin relevancia clínica.','Los datos son insuficientes para cualquier interpretación.'],
      correcta:1,
      explicacion:'La combinación de taquipnea, uso de músculos accesorios y saturación por debajo de 92% son signos de dificultad respiratoria que requieren valoración clínica inmediata, no una simple anotación.'
    }
  },
  spo2:{
    name:'Saturación de oxígeno', objetivo:'Medir de forma no invasiva el porcentaje de hemoglobina saturada con oxígeno en sangre arterial.',
    fundamento:'La pulsioximetría permite detectar hipoxemia de forma temprana, siendo un complemento esencial a la valoración respiratoria clínica.',
    materiales:['Pulsioxímetro','Alcohol para limpieza del sensor','Hoja de registro'],
    prep:['Identificar al paciente.','Higiene de manos.','Verificar que el dedo esté limpio, sin esmalte ni uñas postizas.','Verificar buena perfusión periférica.'],
    pasos:[
      {t:'Seleccionar el dedo', b:'Preferir el dedo índice o medio, evitando extremidades con mala perfusión o edema.'},
      {t:'Colocar el sensor', b:'Ajustar el pulsioxímetro asegurando que la luz emisora coincida con el lecho ungueal.'},
      {t:'Esperar estabilización', b:'Permitir que la lectura se estabilice, generalmente unos segundos, observando también la frecuencia de pulso mostrada.'},
      {t:'Registrar el valor', b:'Anotar el porcentaje de saturación junto con si el paciente recibe oxígeno suplementario.'},
    ],
    errores:['No retirar esmalte de uñas, lo que puede alterar la lectura.','Colocar el sensor en una extremidad con mala perfusión.','No registrar si el paciente usa oxígeno suplementario.','Interpretar una sola lectura aislada sin considerar la tendencia clínica.'],
    caso:{
      texto:'Paciente con EPOC conocido, SpO₂ de 89% en aire ambiente, consciente y orientado, sin dificultad respiratoria evidente.',
      vitals:[['SpO₂','89','%'],['FR','18','rpm'],['FC','92','lpm'],['PA','126/80','mmHg']],
      pregunta:'¿Qué acción educativa corresponde ante este hallazgo?',
      opciones:['Ignorar el valor por tratarse de un paciente con EPOC.','Registrar el hallazgo e informar oportunamente al equipo de salud para valoración.','Suspender inmediatamente cualquier tratamiento en curso.','Repetir la medición en otro dedo sin informar a nadie.'],
      correcta:1,
      explicacion:'Aunque algunos pacientes con EPOC tienen saturaciones basales más bajas, un valor de 89% debe registrarse e informarse al equipo de salud para su correcta interpretación en el contexto clínico del paciente.'
    }
  },
  dolor:{
    name:'Dolor (5º signo vital)', objetivo:'Valorar la intensidad, localización y características del dolor referido por el paciente.',
    fundamento:'El dolor es reconocido como el quinto signo vital porque constituye una experiencia sensorial y emocional que impacta directamente el bienestar y la recuperación del paciente.',
    materiales:['Escala visual análoga o numérica','Hoja de registro','Comunicación verbal con el paciente'],
    prep:['Identificar al paciente.','Explicar el uso de la escala de valoración.','Garantizar un ambiente que permita al paciente expresarse con confianza.'],
    pasos:[
      {t:'Seleccionar la escala', b:'Elegir una escala apropiada a la edad y condición cognitiva del paciente (numérica, visual análoga, facial).'},
      {t:'Preguntar intensidad y localización', b:'Solicitar al paciente que indique la intensidad del dolor y señale la zona afectada.'},
      {t:'Explorar características', b:'Indagar tipo de dolor, factores que lo agravan o alivian, y tiempo de evolución.'},
      {t:'Registrar y reevaluar', b:'Documentar el resultado y planificar una reevaluación posterior, especialmente tras una intervención.'},
    ],
    errores:['Asumir la intensidad del dolor sin preguntar directamente al paciente.','No reevaluar después de una intervención analgésica.','Utilizar una escala inadecuada para la edad o condición cognitiva.','Registrar solo un número sin localización ni características.'],
    caso:{
      texto:'Paciente postoperatorio refiere dolor 8/10 en escala numérica, localizado en sitio quirúrgico, dos horas después de la cirugía.',
      vitals:[['Dolor','8','/10'],['FC','104','lpm'],['PA','138/88','mmHg'],['FR','20','rpm']],
      pregunta:'¿Cuál es la conducta educativa apropiada?',
      opciones:['No registrar el dolor por tratarse de un postoperatorio esperado.','Registrar el hallazgo e informar para valoración de manejo analgésico, con reevaluación posterior.','Indicar al paciente que espere sin informar al equipo.','Asumir que el valor está exagerado y no actuar.'],
      correcta:1,
      explicacion:'Un dolor de 8/10 requiere registro, comunicación al equipo de salud para valorar manejo analgésico, y una reevaluación posterior para verificar la efectividad de la intervención.'
    }
  }
};

/* ---- IV catheterization data ---- */
const IV_VEINS = [
  {id:'cefalica', name:'Vena cefálica', cx:638, cy:272, info:'Ubicada en la cara lateral del antebrazo y brazo. De calibre adecuado y fácil acceso, aunque más móvil que otras venas del pliegue.'},
  {id:'basilica', name:'Vena basílica', cx:448, cy:266, info:'Discurre por la cara medial del antebrazo. De buen calibre, pero más próxima a estructuras nerviosas, por lo que requiere especial cuidado.'},
  {id:'mediana', name:'Vena mediana cubital', cx:540, cy:487, info:'Ubicada en el pliegue del codo, conecta la vena cefálica con la basílica. Frecuentemente utilizada por su accesibilidad y calibre, aunque cercana a la articulación.'},
  {id:'dorsal', name:'Red venosa dorsal', cx:451, cy:1153, info:'Red venosa visible en el dorso de la mano. Útil en canalizaciones distales, aunque de menor calibre y más sensible al dolor.'},
];

const IV_MATERIALS = ['Catéter IV','Torniquete','Guantes','Antiséptico','Gasas','Apósito','Equipo de extensión','Solución IV','Contenedor cortopunzantes'];

const IV_PREP = ['Higiene de manos.','Identificación del paciente por dos datos.','Explicación del procedimiento.','Verificación de la indicación médica.','Preparación previa del material en la bandeja.','Posicionamiento cómodo del brazo del paciente.'];

const IV_STEPS = [
  'Seleccionar el material necesario',
  'Realizar higiene de manos',
  'Preparar al paciente e identificarlo',
  'Seleccionar el sitio de punción',
  'Aplicar antisepsia de la piel',
  'Realizar la inserción del catéter',
  'Comprobar el retorno venoso',
  'Fijar el catéter con apósito',
  'Eliminar el material cortopunzante de forma segura',
  'Registrar el procedimiento'
];

const IV_ERRORS_SCENARIOS = [
  {text:'El estudiante inserta el catéter inmediatamente después de calzarse los guantes, sin haber realizado higiene de manos previa.', error:'Falta de higiene de manos antes del procedimiento.'},
  {text:'Tras la punción, el estudiante desecha la aguja directamente en la caneca de basura común del cuarto.', error:'Eliminación incorrecta del material cortopunzante.'},
  {text:'El estudiante aplica el antiséptico y punciona de inmediato, sin esperar el tiempo de acción del producto.', error:'Antisepsia insuficiente por no respetar el tiempo de acción.'},
  {text:'El catéter queda fijado con un trozo de cinta colocado de forma irregular, dejando el sitio de inserción parcialmente descubierto.', error:'Fijación inadecuada del catéter.'}
];

/* ---- Injections data ---- */
const INJ = {
  im:{
    name:'Intramuscular (IM)',
    def:'Administración de un medicamento directamente en el tejido muscular, permitiendo una absorción relativamente rápida gracias a la buena vascularización muscular.',
    objetivo:'Lograr una absorción sistémica eficaz para medicamentos que no pueden administrarse por otras vías o que requieren este tipo de liberación.',
    indicaciones:'Vacunas, antibióticos y otros medicamentos indicados por protocolo institucional para esta vía.',
    precauciones:'Evitar en tejido con lesiones cutáneas, trastornos de la coagulación no valorados o masa muscular insuficiente en el sitio elegido.',
    sitios:['Región deltoidea','Región ventroglútea','Región del vasto lateral'],
    materiales:['Jeringa con aguja IM','Guantes','Antiséptico','Gasa o algodón','Contenedor cortopunzantes'],
    tecnica:'Se selecciona el sitio anatómico según edad y masa muscular, se realiza antisepsia, y se inserta la aguja en un ángulo aproximado de 90°, aspirando según protocolo institucional antes de administrar el medicamento.',
    errores:['No rotar los sitios de punción en tratamientos repetidos.','Seleccionar un sitio con masa muscular insuficiente.','No verificar antecedentes de alergias antes de administrar.']
  },
  sc:{
    name:'Subcutánea (SC)',
    def:'Administración de un medicamento en el tejido subcutáneo, entre la dermis y el músculo, permitiendo una absorción más lenta y sostenida.',
    objetivo:'Lograr una liberación gradual del medicamento, apropiada para fármacos como la insulina o algunos anticoagulantes.',
    indicaciones:'Insulina, heparina y otros medicamentos indicados por protocolo para esta vía.',
    precauciones:'Rotar sitios de aplicación para evitar lipodistrofia; evitar zonas con hematomas o cicatrices recientes.',
    sitios:['Cara externa del brazo','Abdomen (evitando el área periumbilical)','Cara anterior del muslo'],
    materiales:['Jeringa de insulina o SC','Guantes','Antiséptico','Gasa o algodón','Contenedor cortopunzantes'],
    tecnica:'Se forma un pliegue cutáneo, se inserta la aguja generalmente entre 45° y 90° según el tipo de aguja y el grosor del tejido, y se administra el medicamento lentamente.',
    errores:['No rotar sitios de aplicación en tratamientos crónicos.','Masajear la zona cuando el protocolo del medicamento lo contraindica.','Formar un pliegue insuficiente en pacientes con poco tejido subcutáneo.']
  },
  id:{
    name:'Intradérmica (ID)',
    def:'Administración de una pequeña cantidad de sustancia entre la epidermis y la dermis, con absorción muy lenta.',
    objetivo:'Utilizada principalmente con fines diagnósticos, como pruebas de sensibilidad o de tuberculina.',
    indicaciones:'Pruebas de sensibilidad cutánea y otras pruebas diagnósticas según protocolo institucional.',
    precauciones:'Evitar zonas con lesiones cutáneas visibles; registrar y verificar el sitio para lectura posterior.',
    sitios:['Cara anterior del antebrazo (zona habitualmente utilizada para pruebas)'],
    materiales:['Jeringa de tuberculina','Guantes','Antiséptico','Gasa','Contenedor cortopunzantes'],
    tecnica:'Se inserta la aguja con el bisel hacia arriba en un ángulo muy superficial (aproximadamente 5-15°), formando una pápula visible al administrar la sustancia.',
    errores:['No lograr la formación de la pápula, indicando administración incorrecta.','No marcar el sitio para facilitar la lectura posterior.','Frotar el sitio tras la aplicación, alterando el resultado de la prueba.']
  },
  iv:{
    name:'Intravenosa (IV)',
    def:'Administración directa de un medicamento en el torrente sanguíneo a través de una vena, logrando el inicio de acción más rápido de todas las vías parenterales.',
    objetivo:'Obtener un efecto terapéutico inmediato o administrar grandes volúmenes de forma controlada.',
    indicaciones:'Medicamentos de urgencia, fluidoterapia y tratamientos que requieren acción rápida, según indicación médica.',
    precauciones:'Vigilar signos de extravasación, verificar compatibilidad de medicamentos y respetar la velocidad de infusión indicada.',
    sitios:['A través de un catéter venoso periférico previamente instalado'],
    materiales:['Jeringa o equipo de infusión','Guantes','Antiséptico','Gasa','Contenedor cortopunzantes'],
    tecnica:'Se verifica la permeabilidad del catéter, se realiza antisepsia del punto de conexión y se administra el medicamento a la velocidad indicada, vigilando la respuesta del paciente.',
    errores:['No verificar la permeabilidad del catéter antes de administrar.','Administrar a una velocidad distinta a la indicada.','No vigilar signos de extravasación durante la infusión.']
  }
};

const ANAT_SITES = [
  {id:'deltoides', name:'Deltoides', via:'IM', pts:[[688,330]], info:'Sitio de uso frecuente para volúmenes pequeños, en adultos con masa muscular adecuada.'},
  {id:'ventrogluteo', name:'Región ventroglútea', via:'IM', pts:[[646,689]], info:'Considerada una zona segura por su distancia de estructuras nerviosas y vasculares importantes.'},
  {id:'vastolateral', name:'Vasto lateral', via:'IM', pts:[[645,856],[377,856]], info:'Zona recomendada en lactantes y niños pequeños por su desarrollo muscular temprano.'},
  {id:'brazo', name:'Cara externa del brazo', via:'SC', pts:[[700,424]], info:'Zona habitual para inyección subcutánea de pequeños volúmenes.'},
  {id:'abdomen', name:'Abdomen', via:'SC', pts:[[575,609]], info:'Zona de absorción más constante, evitando siempre el área periumbilical.'},
  {id:'antebrazo', name:'Cara anterior del antebrazo', via:'ID', pts:[[265,631]], info:'Zona habitual para pruebas intradérmicas por su fácil visualización y lectura.'},
];

/* ---- Safety scenarios ---- */
const SAFETY_ITEMS = [
  {t:'Identificación correcta', d:'Verificar al paciente con al menos dos datos antes de cualquier procedimiento.'},
  {t:'Higiene de manos', d:'Momento clave antes y después de cada contacto con el paciente o su entorno.'},
  {t:'Bioseguridad', d:'Uso adecuado de elementos de protección personal según el procedimiento.'},
  {t:'Prevención de infecciones', d:'Aplicación de técnica aséptica en procedimientos invasivos.'},
  {t:'Manejo de cortopunzantes', d:'Eliminación segura e inmediata tras su uso, sin reencapuchar agujas.'},
  {t:'Administración segura', d:'Verificación de los correctos de administración de medicamentos.'},
  {t:'Comunicación con el paciente', d:'Explicar cada procedimiento y mantener una relación de confianza.'},
  {t:'Registro', d:'Documentar oportuna y correctamente cada procedimiento realizado.'},
  {t:'Eliminación de residuos', d:'Clasificación adecuada de residuos biológicos y comunes.'},
];

/* ---- Evaluation questions ---- */
const EVAL_QUESTIONS = [
  {type:'Selección múltiple', q:'Durante la toma de presión arterial, el estudiante coloca el brazalete de manera incorrecta. ¿Qué problema podría generar?',
   opts:['No genera ningún efecto en la lectura','Puede producir una lectura falsamente elevada o disminuida','Solo afecta la comodidad del paciente, no la medición','Únicamente afecta la frecuencia cardíaca'], correcta:1,
   exp:'Un brazalete mal colocado (tamaño o posición incorrectos) puede alterar significativamente el resultado de la presión arterial, produciendo lecturas falsamente elevadas o disminuidas.'},
  {type:'Verdadero/Falso', q:'La higiene de manos debe realizarse únicamente después de tener contacto con el paciente.',
   opts:['Verdadero','Falso'], correcta:1,
   exp:'Falso. La higiene de manos debe realizarse en varios momentos clave: antes y después del contacto con el paciente, antes de procedimientos asépticos y después del contacto con el entorno.'},
  {type:'Identificación anatómica', q:'¿Cuál de las siguientes venas se localiza en el pliegue del codo y conecta la vena cefálica con la basílica?',
   opts:['Red venosa dorsal','Vena mediana cubital','Vena cefálica distal','Vena basílica proximal'], correcta:1,
   exp:'La vena mediana cubital se ubica en el pliegue del codo y conecta la cefálica con la basílica, siendo frecuentemente utilizada por su accesibilidad.'},
  {type:'Identificación de materiales', q:'Para una canalización venosa periférica, ¿cuál de los siguientes elementos NO es indispensable?',
   opts:['Torniquete','Antiséptico','Termómetro','Contenedor de cortopunzantes'], correcta:2,
   exp:'El termómetro corresponde al procedimiento de toma de temperatura, no es un material indispensable para la canalización venosa periférica.'},
  {type:'Detección de errores', q:'El estudiante punciona la piel inmediatamente después de aplicar el antiséptico, sin esperar su tiempo de acción. ¿Qué principio de seguridad se está omitiendo?',
   opts:['Identificación del paciente','Tiempo de acción del antiséptico para una antisepsia efectiva','Registro del procedimiento','Comunicación con el paciente'], correcta:1,
   exp:'El antiséptico requiere un tiempo de acción determinado para ser efectivo; puncionar antes de ese tiempo compromete la técnica aséptica.'},
  {type:'Caso clínico', q:'Paciente con SpO₂ de 89% en aire ambiente y signos de dificultad respiratoria. ¿Cuál es la conducta educativa correcta?',
   opts:['Registrar el valor sin informar a nadie','Registrar el hallazgo e informar oportunamente al equipo de salud','Repetir la medición hasta obtener un valor normal','Retirar el sensor y no volver a medir'], correcta:1,
   exp:'Ante un hallazgo anormal con signos clínicos asociados, corresponde registrar e informar oportunamente al equipo de salud para su valoración.'},
  {type:'Ordenamiento de pasos', q:'En la administración intramuscular, ¿cuál es el orden correcto de estas acciones?\nA) Insertar la aguja  B) Higiene de manos  C) Antisepsia del sitio  D) Administrar el medicamento',
   opts:['A-B-C-D','B-C-A-D','C-B-A-D','D-A-B-C'], correcta:1,
   exp:'El orden correcto es: higiene de manos, antisepsia del sitio, inserción de la aguja y finalmente administración del medicamento.'},
  {type:'Verdadero/Falso', q:'Las agujas usadas deben reencapucharse antes de desecharse para mayor seguridad.',
   opts:['Verdadero','Falso'], correcta:1,
   exp:'Falso. Reencapuchar agujas incrementa el riesgo de pinchazo accidental; deben desecharse directamente en el contenedor de cortopunzantes.'},
];

/* ================= STATE ================= */
const DEFAULT_STATE = {
  progress:{signos:0, inyecciones:0, canalizacion:0, anatomia:0, seguridad:0, simulacion:0},
  scores:[], errorsCount:0, practiceMinutes:0, theme:'auto'
};
let STATE = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem('vrnl_state');
    if(raw) return Object.assign({}, DEFAULT_STATE, JSON.parse(raw));
  }catch(e){}
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function saveState(){
  try{ localStorage.setItem('vrnl_state', JSON.stringify(STATE)); }catch(e){}
}
function setModuleProgress(id, pct){
  STATE.progress[id] = Math.max(STATE.progress[id]||0, pct);
  saveState(); renderProgressUI();
}
function addScore(pct){ STATE.scores.push(pct); saveState(); renderProgressUI(); }
function addError(){ STATE.errorsCount++; saveState(); renderProgressUI(); }
function addPracticeMinutes(n){ STATE.practiceMinutes += n; saveState(); renderProgressUI(); }
function resetProgress(){
  if(confirm('¿Reiniciar todo el progreso guardado en este dispositivo?')){
    STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState(); renderProgressUI(); renderHome(); renderDashboard();
  }
}

function overallProgressPct(){
  const vals = Object.values(STATE.progress);
  const sum = vals.reduce((a,b)=>a+b,0);
  return Math.round(sum/vals.length);
}
function avgScore(){
  if(!STATE.scores.length) return null;
  return Math.round(STATE.scores.reduce((a,b)=>a+b,0)/STATE.scores.length);
}

/* ================= RENDER: NAV ================= */
function buildNav(){
  const wrap = document.getElementById('navList');
  wrap.innerHTML = NAV.map(g=>`
 <div class="nav-group-label">${g.group}</div>
    ${g.items.map(it=>`<button class="nav-item" data-nav="${it.id}" onclick="go('${it.id}')">${it.label}</button>`).join('')}
  `).join('');
}

function go(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const target = document.querySelector(`.view[data-view="${view}"]`);
  if(target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.nav===view));
  const titles = {home:'INICIO', dashboard:'MI ENTRENAMIENTO', modulos:'MÓDULOS', signos:'SIGNOS VITALES', inyecciones:'INYECCIONES', canalizacion:'CANALIZACIÓN VENOSA', anatomia:'ANATOMÍA', seguridad:'SEGURIDAD DEL PACIENTE', vr:'SIMULACIÓN VR', simulacion:'CASOS CLÍNICOS', evaluacion:'EVALUACIÓN', progreso:'MI PROGRESO', docente:'PANEL DOCENTE', config:'CONFIGURACIÓN'};
  document.getElementById('topbarTitle').textContent = titles[view]||view.toUpperCase();
  window.scrollTo({top:0, behavior:'auto'});
  toggleSidebar(false);
  if(view==='dashboard') renderDashboard();
  if(view==='progreso') renderProgressPage();
}

function toggleSidebar(force){
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');
  const open = force!==undefined ? force : !sb.classList.contains('open');
  sb.classList.toggle('open', open);
  ov.classList.toggle('show', open);
}

/* ================= THEME ================= */
function setTheme(t){
  STATE.theme = t; saveState();
  if(t==='auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  document.getElementById('themeBtn').textContent = t==='dark' ? ' Claro' : ' Oscuro';
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur==='dark' ? 'light' : 'dark');
}

/* ================= HOME / DASHBOARD ================= */
function moduleCardHTML(m, forDash){
  const pct = STATE.progress[m.id]||0;
  const tag = pct===0 ? `<span class="mc-tag tag-new">NUEVO</span>` : pct>=100 ? `<span class="mc-tag tag-done">COMPLETADO</span>` : `<span class="mc-tag tag-progress">EN PROGRESO ${pct}%</span>`;
  return `<div class="card mod-card" onclick="go('${m.view}')">
 <div class="mc-icon">${m.title.charAt(0)}</div>
 <h3>${m.title}</h3>
 <p>${m.desc}</p>
 <div class="mc-progress"><div class="pbar"><span style="width:${pct}%"></span></div></div>
    ${tag}
 </div>`;
}
function renderHome(){
  document.getElementById('homeModuleGrid').innerHTML = MODULES.map(m=>moduleCardHTML(m)).join('');
}
function renderDashboard(){
  document.getElementById('dashModuleGrid').innerHTML = MODULES.map(m=>moduleCardHTML(m)).join('');
  const done = Object.values(STATE.progress).filter(v=>v>=100).length;
  document.getElementById('statCompleted').textContent = `${done}/${Object.keys(STATE.progress).length}`;
  const sc = avgScore();
  document.getElementById('statScore').textContent = sc===null ? '—' : sc+'%';
  document.getElementById('statErrors').textContent = STATE.errorsCount;
  document.getElementById('statTime').textContent = STATE.practiceMinutes+' min';
  const pct = overallProgressPct();
  document.getElementById('dashProgressBar').style.width = pct+'%';
  document.getElementById('dashProgressLabel').textContent = `${pct}% completado`;
  document.getElementById('levelTrack').innerHTML = levelTrackHTML(pct);
}
function levelTrackHTML(pct){
  const idx = Math.min(LEVELS.length-1, Math.floor(pct/(100/LEVELS.length)));
  return LEVELS.map((lv,i)=>{
    const cls = i<idx ? 'done' : i===idx ? 'now' : '';
    return `<div class="level-chip ${cls}"><div class="lc-num">NIVEL ${i+1}</div><div class="lc-name">${lv}</div></div>`;
  }).join('');
}
function renderProgressUI(){
  const pct = overallProgressPct();
  document.getElementById('sideProgressPct').textContent = pct+'%';
  document.getElementById('sideProgressBar').style.width = pct+'%';
}
function renderProgressPage(){
  const rows = MODULES.map(m=>{
    const pct = STATE.progress[m.id]||0;
    return `<div style="margin-bottom:14px;">
 <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;"><span>${m.ic} ${m.title}</span><span style="font-family:var(--font-mono);color:var(--ink-soft);">${pct}%</span></div>
 <div class="pbar"><span style="width:${pct}%"></span></div>
 </div>`;
  }).join('');
  document.getElementById('progressBars').innerHTML = rows;
  document.getElementById('levelTrack2').innerHTML = levelTrackHTML(overallProgressPct());
}

/* ================= MODULOS INDEX ================= */
function renderModulosIndex(){
  document.getElementById('modulosGrid').innerHTML = MODULES.map(m=>moduleCardHTML(m)).join('');
}

/* ================= VITAL SIGNS ================= */
let vsCurrent = 'pa';
let vsStepIndex = 0;
function renderVitalSignsPills(){
  const keys = Object.keys(VITAL_SIGNS);
  document.getElementById('vsPills').innerHTML = keys.map(k=>`<button class="pill ${k===vsCurrent?'active':''}" onclick="selectVitalSign('${k}')">${VITAL_SIGNS[k].name}</button>`).join('');
}
function selectVitalSign(k){
  vsCurrent = k; vsStepIndex = 0;
  renderVitalSignsPills();
  renderVitalSignContent();
}
function renderVitalSignContent(){
  const d = VITAL_SIGNS[vsCurrent];
  const html = `
 <div class="block">
 <div class="subhead">OBJETIVO</div>
 <p class="txt">${d.objetivo}</p>
 </div>
 <div class="block">
 <div class="subhead">FUNDAMENTO FISIOLÓGICO</div>
 <p class="txt">${d.fundamento}</p>
 </div>
 <div class="block">
 <div class="subhead">MATERIALES</div>
 <div class="mat-grid">${d.materiales.map(m=>`<div class="mat-item"><div class="mi-name">${m}</div></div>`).join('')}</div>
 </div>
 <div class="block">
 <div class="subhead">PREPARACIÓN DEL PACIENTE</div>
 <div class="err-grid">${d.prep.map(p=>`<div class="err-item" style="background:var(--cyan-soft);border-color:rgba(111,203,146,.3);"><span class="ic" style="color:var(--blue);">✓</span>${p}</div>`).join('')}</div>
 </div>
 <div class="block">
 <div class="subhead">PROCEDIMIENTO PASO A PASO</div>
 <div class="step-flow" id="vsStepFlow"></div>
 <div class="step-card" id="vsStepCard"></div>
 </div>
 <div class="block">
 <div class="subhead">ERRORES FRECUENTES</div>
 <div class="err-grid">${d.errores.map(e=>`<div class="err-item">${e}</div>`).join('')}</div>
 </div>
 <div class="block">
 <div class="subhead">CASO CLÍNICO</div>
 <div class="case-box">
 <div class="case-lbl">PACIENTE VIRTUAL</div>
 <p class="txt">${d.caso.texto}</p>
 <div class="vitals-readout">${d.caso.vitals.map(v=>`<div class="vr-tile"><div class="vt-val">${v[1]}<span style="font-size:10px;color:var(--ink-soft);"> ${v[2]}</span></div><div class="vt-lbl">${v[0]}</div></div>`).join('')}</div>
 <p style="font-size:14px;font-weight:600;margin-top:10px;">${d.caso.pregunta}</p>
 <div class="choice-list" id="vsCaseChoices"></div>
 <div class="feedback" id="vsCaseFeedback"></div>
 </div>
 </div>
 <div class="disclaimer"><b>Nota académica.</b> ${DISCLAIMER}</div>
  `;
  document.getElementById('vsContent').innerHTML = html;
  renderVsStep();
  renderCaseChoices('vsCaseChoices','vsCaseFeedback', d.caso, ()=>{
    setModuleProgress('signos', Math.min(100, (STATE.progress.signos||0)+20));
    addPracticeMinutes(3);
  });
}
function renderVsStep(){
  const d = VITAL_SIGNS[vsCurrent];
  document.getElementById('vsStepFlow').innerHTML = d.pasos.map((s,i)=>`<div class="step-dot ${i===vsStepIndex?'on':i<vsStepIndex?'done':''}">${i+1}</div>`).join('');
  const s = d.pasos[vsStepIndex];
  document.getElementById('vsStepCard').innerHTML = `
 <div class="sc-title">Paso ${vsStepIndex+1} · ${s.t}</div>
 <div class="sc-body">${s.b}</div>
 <div class="step-nav">
 <button class="btn btn-outline btn-sm" onclick="vsStep(-1)" ${vsStepIndex===0?'disabled style="opacity:.4"':''}>← Anterior</button>
 <button class="btn btn-solid btn-sm" onclick="vsStep(1)">${vsStepIndex===d.pasos.length-1?'Finalizar':'Ver siguiente paso →'}</button>
 </div>`;
}
function vsStep(dir){
  const d = VITAL_SIGNS[vsCurrent];
  if(dir>0 && vsStepIndex===d.pasos.length-1){
    setModuleProgress('signos', Math.min(100,(STATE.progress.signos||0)+15));
    addPracticeMinutes(2);
    renderVsStep();
    return;
  }
  vsStepIndex = Math.max(0, Math.min(d.pasos.length-1, vsStepIndex+dir));
  renderVsStep();
}
function renderCaseChoices(listId, fbId, caso, onCorrect){
  const list = document.getElementById(listId);
  const letters = ['A','B','C','D'];
  list.innerHTML = caso.opciones.map((o,i)=>`<button class="choice" data-i="${i}" onclick="answerCase(this,${i},${caso.correcta},'${fbId}',${JSON.stringify(caso.explicacion).slice(1,-1) ? '' : ''})">${''}</button>`).join('');
  // build without inline JSON to avoid escaping issues
  list.innerHTML = caso.opciones.map((o,i)=>`<button class="choice" data-i="${i}"><span class="cletter">${letters[i]}</span>${o}</button>`).join('');
  Array.from(list.children).forEach((btn,i)=>{
    btn.addEventListener('click', ()=>{
      if(list.dataset.answered) return;
      list.dataset.answered = '1';
      Array.from(list.children).forEach((b,j)=>{
        if(j===caso.correcta) b.classList.add('correct');
        else if(j===i) b.classList.add('wrong');
      });
      const fb = document.getElementById(fbId);
      fb.classList.add('show');
      if(i===caso.correcta){
        fb.classList.add('ok'); fb.classList.remove('bad');
        fb.textContent = 'Correcto. '+caso.explicacion;
        if(onCorrect) onCorrect();
        addScore(100);
      } else {
        fb.classList.add('bad'); fb.classList.remove('ok');
        fb.textContent = 'Para revisar. '+caso.explicacion;
        addError();
        addScore(40);
      }
    });
  });
}

/* ================= IV CATHETERIZATION ================= */
let ivSelectedVein = null;
function renderIvAnatomy(){
  const svgPoints = IV_VEINS.map(v=>`<circle class="anat-point" data-id="${v.id}" cx="${v.cx}" cy="${v.cy}" r="40"><title>${v.name}</title></circle>`).join('');
  document.getElementById('ivAnatomyWrap').innerHTML = `
 <div class="anatomy-svg-box">
 <svg viewBox="0 0 1024 1536" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración del miembro superior con el sistema venoso superficial">
 <image href="assets/img/anatomia-venas-brazo.png" x="0" y="0" width="1024" height="1536"/>
        ${svgPoints}
 </svg>
 </div>
 <div class="anat-info" id="ivAnatInfo">
 <h4>Selecciona una estructura venosa</h4>
 <p>Toca un punto en la ilustración o elige una opción de la lista para ver su información clínica.</p>
 <div class="anat-list">${IV_VEINS.map(v=>`<button data-id="${v.id}">${v.name}</button>`).join('')}</div>
 </div>
  `;
  const setVein = (id)=>{
    ivSelectedVein = id;
    document.querySelectorAll('#ivAnatomyWrap .anat-point').forEach(p=>p.classList.toggle('sel', p.dataset.id===id));
    document.querySelectorAll('#ivAnatomyWrap .anat-list button').forEach(b=>b.classList.toggle('sel', b.dataset.id===id));
    const v = IV_VEINS.find(x=>x.id===id);
    document.getElementById('ivAnatInfo').innerHTML = `<h4>${v.name}</h4><p>${v.info}</p><div class="anat-list">${IV_VEINS.map(x=>`<button data-id="${x.id}" class="${x.id===id?'sel':''}">${x.name}</button>`).join('')}</div>`;
    document.querySelectorAll('#ivAnatomyWrap .anat-list button').forEach(b=>b.addEventListener('click', ()=>setVein(b.dataset.id)));
    setModuleProgress('canalizacion', Math.min(100,(STATE.progress.canalizacion||0)+8));
  };
  document.querySelectorAll('#ivAnatomyWrap .anat-point').forEach(p=>p.addEventListener('click', ()=>setVein(p.dataset.id)));
  document.querySelectorAll('#ivAnatomyWrap .anat-list button').forEach(b=>b.addEventListener('click', ()=>setVein(b.dataset.id)));
}
function renderIvMaterials(){
  document.getElementById('ivMaterials').innerHTML = IV_MATERIALS.map(m=>`<div class="mat-item"><div class="mi-name">${m}</div></div>`).join('');
}
function renderIvPrep(){
  document.getElementById('ivPrep').innerHTML = IV_PREP.map(p=>`<div class="err-item" style="background:var(--cyan-soft);border-color:rgba(111,203,146,.3);"><span class="ic" style="color:var(--blue);">✓</span>${p}</div>`).join('');
}
let ivOrderSelected = [];
let ivOrderPool = [];
function renderIvOrderChallenge(){
  ivOrderSelected = [];
  ivOrderPool = IV_STEPS.map((s,i)=>({s, orig:i})).sort(()=>Math.random()-0.5);
  paintIvOrder();
}
function paintIvOrder(){
  const wrap = document.getElementById('ivOrderChallenge');
  const remaining = ivOrderPool.filter(p=>!ivOrderSelected.includes(p.orig));
  wrap.innerHTML = `
 <div class="order-answer" id="ivAnswerSlots">
      ${IV_STEPS.map((_,i)=>{
        const filledOrig = ivOrderSelected[i];
        if(filledOrig!==undefined){
          return `<div class="oa-slot filled"><span class="order-chip" style="border:none;padding:0;background:none;"><span class="num">${i+1}</span>${IV_STEPS[filledOrig]}</span></div>`;
        }
        return `<div class="oa-slot">Posición ${i+1}</div>`;
      }).join('')}
 </div>
 <div class="order-pool">
      ${remaining.map(p=>`<button class="order-chip" data-orig="${p.orig}"><span class="num">?</span>${p.s}</button>`).join('')}
 </div>
 <div class="feedback" id="ivOrderFeedback"></div>
 <div style="margin-top:12px;display:flex;gap:10px;">
 <button class="btn btn-outline btn-sm" onclick="renderIvOrderChallenge()">↺ Reiniciar</button>
 </div>
  `;
  wrap.querySelectorAll('.order-pool .order-chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      ivOrderSelected.push(parseInt(btn.dataset.orig));
      paintIvOrder();
      if(ivOrderSelected.length===IV_STEPS.length){
        checkIvOrder();
      }
    });
  });
}
function checkIvOrder(){
  const fb = document.getElementById('ivOrderFeedback');
  const correct = ivOrderSelected.every((v,i)=>v===i);
  fb.classList.add('show');
  if(correct){
    fb.classList.add('ok'); fb.classList.remove('bad');
    fb.textContent = 'Secuencia correcta. Registraste el orden adecuado para una canalización venosa segura.';
    setModuleProgress('canalizacion', Math.min(100,(STATE.progress.canalizacion||0)+25));
    addScore(100); addPracticeMinutes(4);
  } else {
    fb.classList.add('bad'); fb.classList.remove('ok');
    fb.textContent = 'El orden no es correcto todavía. Revisa la secuencia e inténtalo de nuevo.';
    addError(); addScore(50);
  }
}
function renderIvErrorChallenge(){
  const wrap = document.getElementById('ivErrorChallenge');
  wrap.innerHTML = IV_ERRORS_SCENARIOS.map((sc,i)=>`
 <div class="case-box" style="margin-top:12px;">
 <div class="case-lbl">ESCENA ${i+1}</div>
 <p class="txt">${sc.text}</p>
 <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="revealIvError(${i})">Identificar el error</button>
 <div class="feedback" id="ivErrFb${i}" style="margin-top:10px;"></div>
 </div>
  `).join('');
}
function revealIvError(i){
  const fb = document.getElementById('ivErrFb'+i);
  fb.classList.add('show','bad');
  fb.innerHTML = `<b>Error identificado:</b> ${IV_ERRORS_SCENARIOS[i].error}`;
  setModuleProgress('canalizacion', Math.min(100,(STATE.progress.canalizacion||0)+6));
}

/* ================= INJECTIONS ================= */
let injCurrent = 'im';
function renderInjPills(){
  document.getElementById('injPills').innerHTML = Object.keys(INJ).map(k=>`<button class="pill ${k===injCurrent?'active':''}" onclick="selectInj('${k}')">${INJ[k].name}</button>`).join('');
}
function selectInj(k){ injCurrent=k; renderInjPills(); renderInjContent(); }
function renderInjContent(){
  const d = INJ[injCurrent];
  document.getElementById('injContent').innerHTML = `
 <div class="block"><div class="subhead">DEFINICIÓN</div><p class="txt">${d.def}</p></div>
 <div class="block"><div class="subhead">OBJETIVO</div><p class="txt">${d.objetivo}</p></div>
 <div class="grid grid-2" style="margin-top:20px;">
 <div class="card"><h3 style="font-size:14px;margin-bottom:8px;">Indicaciones generales</h3><p class="txt">${d.indicaciones}</p></div>
 <div class="card"><h3 style="font-size:14px;margin-bottom:8px;">Precauciones</h3><p class="txt">${d.precauciones}</p></div>
 </div>
 <div class="block"><div class="subhead">SITIOS ANATÓMICOS</div><div class="err-grid">${d.sitios.map(s=>`<div class="err-item" style="background:var(--cyan-soft);border-color:rgba(111,203,146,.3);">${s}</div>`).join('')}</div></div>
 <div class="block"><div class="subhead">MATERIALES</div><div class="mat-grid">${d.materiales.map(m=>`<div class="mat-item"><div class="mi-name">${m}</div></div>`).join('')}</div></div>
 <div class="block"><div class="subhead">TÉCNICA GENERAL</div><p class="txt">${d.tecnica}</p></div>
 <div class="block"><div class="subhead">ERRORES FRECUENTES</div><div class="err-grid">${d.errores.map(e=>`<div class="err-item">${e}</div>`).join('')}</div></div>
  `;
  setModuleProgress('inyecciones', Math.min(100,(STATE.progress.inyecciones||0)+8));
}
const INJ_SIM_STEPS = [
  {t:'Identificar al paciente', opts:['Verificar nombre completo y otro dato de identificación','Preguntar solo el nombre de pila','Omitir este paso si el paciente es conocido'], correct:0, msg:'La identificación con dos datos es indispensable antes de cualquier procedimiento.'},
  {t:'Higiene de manos', opts:['Realizar higiene de manos antes de preparar el material','Calzar guantes directamente sin higiene previa','Realizarla solo al finalizar el procedimiento'], correct:0, msg:'La higiene de manos debe realizarse antes de manipular el material y al paciente.'},
  {t:'Verificar los correctos de administración', opts:['Verificar paciente, medicamento, dosis, vía, hora y registro correctos','Verificar únicamente el nombre del medicamento','Confiar en la indicación sin verificar nuevamente'], correct:0, msg:'Verificar los correctos de administración es un pilar de la seguridad del paciente.'},
  {t:'Seleccionar el sitio anatómico', opts:['Elegir el sitio según la vía, edad y condición del paciente','Elegir siempre el mismo sitio sin valorar al paciente','Omitir la valoración del sitio'], correct:0, msg:'El sitio anatómico debe seleccionarse considerando la vía, la edad y la condición clínica.'},
  {t:'Realizar antisepsia', opts:['Aplicar antiséptico y esperar su tiempo de acción','Puncionar inmediatamente tras aplicar el antiséptico','Omitir la antisepsia si el paciente tiene prisa'], correct:0, msg:'Esperar el tiempo de acción del antiséptico garantiza una técnica aséptica efectiva.'},
  {t:'Eliminar el material cortopunzante', opts:['Desechar directamente en el contenedor de cortopunzantes, sin reencapuchar','Reencapuchar la aguja antes de desechar','Dejar el material sobre la bandeja para desecharlo después'], correct:0, msg:'El material cortopunzante debe eliminarse de inmediato y sin reencapuchar, para prevenir accidentes.'},
  {t:'Registrar el procedimiento', opts:['Registrar medicamento, dosis, vía, hora y respuesta del paciente','Registrar solo que "se administró el medicamento"','Registrar al final del turno, de memoria'], correct:0, msg:'Un registro completo y oportuno es parte esencial de la administración segura de medicamentos.'},
];
let injSimIdx = 0;
let injSimResults = [];
function renderInjSimulator(){
  injSimIdx = 0; injSimResults = [];
  paintInjSim();
}
function paintInjSim(){
  const wrap = document.getElementById('injSimulator');
  if(injSimIdx>=INJ_SIM_STEPS.length){
    const correctCount = injSimResults.filter(r=>r).length;
    const pct = Math.round(correctCount/INJ_SIM_STEPS.length*100);
    setModuleProgress('inyecciones', Math.min(100,(STATE.progress.inyecciones||0)+30));
    addScore(pct); addPracticeMinutes(5);
    wrap.innerHTML = `<div class="case-box"><div class="case-lbl">SIMULACIÓN FINALIZADA</div>
 <p class="txt">Completaste la secuencia con <b>${correctCount}/${INJ_SIM_STEPS.length}</b> decisiones correctas (${pct}%).</p>
 <button class="btn btn-solid btn-sm" style="margin-top:14px;" onclick="renderInjSimulator()">↺ Repetir simulación</button>
 </div>`;
    return;
  }
  const step = INJ_SIM_STEPS[injSimIdx];
  const letters = ['A','B','C'];
  wrap.innerHTML = `
 <div class="case-box">
 <div class="case-lbl">PASO ${injSimIdx+1} DE ${INJ_SIM_STEPS.length} · ${step.t.toUpperCase()}</div>
 <div class="choice-list" id="injSimChoices">
        ${step.opts.map((o,i)=>`<button class="choice" data-i="${i}"><span class="cletter">${letters[i]}</span>${o}</button>`).join('')}
 </div>
 <div class="feedback" id="injSimFb"></div>
 </div>`;
  const list = document.getElementById('injSimChoices');
  Array.from(list.children).forEach((btn,i)=>{
    btn.addEventListener('click', ()=>{
      if(list.dataset.answered) return;
      list.dataset.answered='1';
      const ok = i===step.correct;
      injSimResults.push(ok);
      Array.from(list.children).forEach((b,j)=>{
        if(j===step.correct) b.classList.add('correct');
        else if(j===i) b.classList.add('wrong');
      });
      const fb = document.getElementById('injSimFb');
      fb.classList.add('show', ok?'ok':'bad');
      fb.textContent = (ok?'Correcto. ':'Revisar decisión. ') + step.msg;
      if(!ok) addError();
      setTimeout(()=>{ injSimIdx++; paintInjSim(); }, 1400);
    });
  });
}

/* ================= ANATOMY EXPLORER ================= */
function renderAnatExplorer(targetId, filterVia){
  const sites = filterVia ? ANAT_SITES.filter(s=>s.via===filterVia) : ANAT_SITES;
  const svgPoints = sites.map(s=>s.pts.map(pt=>`<circle class="anat-point" data-id="${s.id}" cx="${pt[0]}" cy="${pt[1]}" r="38"><title>${s.name}</title></circle>`).join('')).join('');
  document.getElementById(targetId).innerHTML = `
 <div class="anatomy-svg-box">
 <svg viewBox="0 0 1024 1536" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración anatómica del sistema muscular con los sitios de administración de medicamentos">
 <image href="assets/img/anatomia-musculos.png" x="0" y="0" width="1024" height="1536"/>
        ${svgPoints}
 </svg>
 </div>
 <div class="anat-info" id="${targetId}Info">
 <h4>Explora los sitios anatómicos</h4>
 <p>Selecciona un punto para ver su descripción y la vía a la que corresponde.</p>
 <div class="anat-list">${sites.map(s=>`<button data-id="${s.id}">${s.name} <span style="color:var(--ink-soft);font-family:var(--font-mono);font-size:10.5px;">· ${s.via}</span></button>`).join('')}</div>
 </div>
  `;
  const setSite = (id)=>{
    document.querySelectorAll(`#${targetId} .anat-point`).forEach(p=>p.classList.toggle('sel', p.dataset.id===id));
    const s = sites.find(x=>x.id===id);
    document.getElementById(targetId+'Info').innerHTML = `<h4>${s.name} <span style="color:var(--ink-soft);font-family:var(--font-mono);font-size:11px;">· ${s.via}</span></h4><p>${s.info}</p><div class="anat-list">${sites.map(x=>`<button data-id="${x.id}" class="${x.id===id?'sel':''}">${x.name} <span style="color:var(--ink-soft);font-family:var(--font-mono);font-size:10.5px;">· ${x.via}</span></button>`).join('')}</div>`;
    document.querySelectorAll(`#${targetId} .anat-list button`).forEach(b=>b.addEventListener('click', ()=>setSite(b.dataset.id)));
    setModuleProgress('anatomia', Math.min(100,(STATE.progress.anatomia||0)+10));
  };
  document.querySelectorAll(`#${targetId} .anat-point`).forEach(p=>p.addEventListener('click', ()=>setSite(p.dataset.id)));
  document.querySelectorAll(`#${targetId} .anat-list button`).forEach(b=>b.addEventListener('click', ()=>setSite(b.dataset.id)));
}

/* ================= PATIENT SAFETY ================= */
function renderSafety(){
  document.getElementById('safetyGrid').innerHTML = SAFETY_ITEMS.map(s=>`<div class="card"><div class="mc-icon">${s.t.charAt(0)}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('');
  const scenario = {
    text:'Un estudiante se dirige a canalizar una vena. Antes de iniciar, se coloca los guantes directamente al llegar a la habitación, sin lavarse las manos previamente, y procede a preparar el material sobre la mesa del paciente.',
    opts:['Higiene de manos previa a la colocación de guantes','Verificación de la indicación médica','Explicación del procedimiento al paciente','Registro del procedimiento'],
    correcta:0,
    exp:'El riesgo principal es la omisión de la higiene de manos antes de calzar los guantes, un paso esencial de bioseguridad previo a cualquier procedimiento.'
  };
  document.getElementById('safetyScenario').innerHTML = `
 <div class="case-box">
 <div class="case-lbl">ESCENARIO</div>
 <p class="txt">${scenario.text}</p>
 <p style="font-weight:600;margin-top:10px;font-size:14px;">¿Qué principio de seguridad del paciente se omitió?</p>
 <div class="choice-list" id="safetyChoices"></div>
 <div class="feedback" id="safetyFb"></div>
 </div>`;
  renderCaseChoices('safetyChoices','safetyFb', {opciones:scenario.opts, correcta:scenario.correcta, explicacion:scenario.exp}, ()=>{
    setModuleProgress('seguridad', 100); addPracticeMinutes(2);
  });
}

/* ================= VR SIMULATION ================= */
const VR_SCENARIOS = [
  {t:'Sala de procedimientos', d:'Ambiente controlado para practicar canalización venosa e inyecciones con supervisión simulada.'},
  {t:'Habitación del paciente', d:'Escenario para toma de signos vitales y comunicación con el paciente en contexto de hospitalización.'},
  {t:'Servicio de urgencias', d:'Escenario de mayor exigencia con toma de decisiones bajo presión de tiempo.'},
  {t:'Área de hospitalización', d:'Práctica de rondas de valoración y administración de medicamentos programados.'},
];
function startVRTransition(){
  document.getElementById('vrEntry').style.display='none';
  document.getElementById('vrLoading').style.display='block';
  document.getElementById('vrScenarios').style.display='none';
  setTimeout(()=>{
    document.getElementById('vrLoading').style.display='none';
    document.getElementById('vrScenarios').style.display='block';
    document.getElementById('vrScenarioGrid').innerHTML = VR_SCENARIOS.map(s=>`
 <div class="vr-scenario" onclick="pickVRScenario('${s.t}')">
 <div class="vs-ic">${s.t.charAt(0)}</div>
 <h3 style="font-size:15px;margin-bottom:6px;">${s.t}</h3>
 <p style="font-size:12.8px;color:var(--ink-soft);line-height:1.5;">${s.d}</p>
 </div>`).join('');
  }, 1600);
}
/* pickVRScenario(name) está definida en assets/js/vr-bridge.js */

/* ================= CLINICAL SIMULATION ================= */
const SIM_CASE = {
  title:'Caso: canalización venosa periférica para tratamiento intravenoso',
  intro:'Paciente adulto ingresa al servicio y requiere canalización venosa periférica para inicio de tratamiento intravenoso indicado por el equipo médico.',
  decisions:[
    {t:'¿Cuál es tu primera acción?', opts:['Identificar al paciente y explicar el procedimiento','Preparar el material sin hablar con el paciente','Buscar directamente una vena visible'], correct:0, fb:'Identificar al paciente y explicar el procedimiento es siempre el primer paso, antes de cualquier manipulación de material.'},
    {t:'Antes de tocar al paciente, ¿qué realizas?', opts:['Higiene de manos','Colocarte los guantes directamente','Aplicar el antiséptico en tu propia mano'], correct:0, fb:'La higiene de manos debe preceder a la colocación de guantes y a cualquier contacto con el paciente.'},
    {t:'¿Qué vena seleccionas como primera opción según buen calibre y accesibilidad?', opts:['Vena mediana cubital','Una vena visible pero de muy pequeño calibre en el dorso de la mano sin valorar otras opciones','Cualquier vena sin valorar previamente'], correct:0, fb:'La vena mediana cubital ofrece buen calibre y accesibilidad, siendo frecuentemente una primera opción adecuada quirúrgicamente valorada.'},
    {t:'Tras la punción y confirmación del retorno venoso, ¿qué haces con el material cortopunzante?', opts:['Desecharlo de inmediato en el contenedor de cortopunzantes','Dejarlo sobre la bandeja para desecharlo después','Reencapuchar la aguja antes de guardarla'], correct:0, fb:'El material cortopunzante debe eliminarse de inmediato en su contenedor correspondiente, sin demoras ni reencapuchado.'},
  ]
};
let simState = null;
function renderSim(){
  simState = {idx:0, correct:0, errors:[], startedAt:Date.now()};
  paintSim();
}
function paintSim(){
  const root = document.getElementById('simRoot');
  if(simState.idx>=SIM_CASE.decisions.length){
    const elapsed = Math.max(1, Math.round((Date.now()-simState.startedAt)/1000));
    const pct = Math.round(simState.correct/SIM_CASE.decisions.length*100);
    setModuleProgress('simulacion', 100);
    addScore(pct); addPracticeMinutes(Math.max(1, Math.round(elapsed/30)));
    root.innerHTML = `
 <div class="case-box">
 <div class="case-lbl">REPORTE DE SIMULACIÓN</div>
 <h3 style="margin:6px 0 16px;">Procedimiento completado</h3>
 <div class="report-grid">
 <div class="stat"><div class="stat-num">${elapsed}s</div><div class="stat-label">TIEMPO EMPLEADO</div></div>
 <div class="stat"><div class="stat-num">${simState.correct}/${SIM_CASE.decisions.length}</div><div class="stat-label">ACCIONES CORRECTAS</div></div>
 <div class="stat"><div class="stat-num">${simState.errors.length}</div><div class="stat-label">ERRORES</div></div>
 <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-label">NIVEL ALCANZADO</div></div>
 </div>
        ${simState.errors.length ? `<div class="block"><h3 style="font-size:14px;">Recomendaciones de mejora</h3><div class="err-grid">${simState.errors.map(e=>`<div class="err-item">${e}</div>`).join('')}</div></div>` : `<p class="txt" style="margin-top:10px;">Excelente desempeño: todas las decisiones siguieron la secuencia de seguridad esperada.</p>`}
 <p class="txt" style="margin-top:14px;font-size:11.5px;">Puntuación educativa de entrenamiento, no equivale a una calificación clínica real.</p>
 <button class="btn btn-solid btn-sm" style="margin-top:14px;" onclick="renderSim()">↺ Repetir caso</button>
 </div>`;
    return;
  }
  const d = SIM_CASE.decisions[simState.idx];
  const letters=['A','B','C'];
  root.innerHTML = `
    ${simState.idx===0 ? `<div class="case-box"><div class="case-lbl">${SIM_CASE.title}</div><p class="txt">${SIM_CASE.intro}</p></div>` : ''}
 <div class="case-box" style="margin-top:14px;">
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
 <div class="case-lbl">DECISIÓN ${simState.idx+1} DE ${SIM_CASE.decisions.length}</div>
 <span class="timer-badge">En curso</span>
 </div>
 <p style="font-weight:600;font-size:14.5px;">${d.t}</p>
 <div class="choice-list" id="simChoices">${d.opts.map((o,i)=>`<button class="choice" data-i="${i}"><span class="cletter">${letters[i]}</span>${o}</button>`).join('')}</div>
 <div class="feedback" id="simFb"></div>
 </div>`;
  const list = document.getElementById('simChoices');
  Array.from(list.children).forEach((btn,i)=>{
    btn.addEventListener('click', ()=>{
      if(list.dataset.answered) return;
      list.dataset.answered='1';
      const ok = i===d.correct;
      if(ok) simState.correct++; else { simState.errors.push(d.opts[i]); addError(); }
      Array.from(list.children).forEach((b,j)=>{ if(j===d.correct) b.classList.add('correct'); else if(j===i) b.classList.add('wrong'); });
      const fb = document.getElementById('simFb');
      fb.classList.add('show', ok?'ok':'bad');
      fb.textContent = (ok?'Correcto. ':'Revisar decisión. ')+d.fb;
      setTimeout(()=>{ simState.idx++; paintSim(); }, 1500);
    });
  });
}

/* ================= EVALUATION ================= */
let evalIdx=0, evalCorrect=0;
function renderEval(){
  evalIdx=0; evalCorrect=0;
  paintEval();
}
function paintEval(){
  const root = document.getElementById('evalRoot');
  if(evalIdx>=EVAL_QUESTIONS.length){
    const pct = Math.round(evalCorrect/EVAL_QUESTIONS.length*100);
    addScore(pct); addPracticeMinutes(4);
    root.innerHTML = `
 <div class="case-box">
 <div class="case-lbl">RESULTADO</div>
 <h3 style="margin:8px 0;">Evaluación completada</h3>
 <div class="pbar" style="margin:12px 0;"><span style="width:${pct}%"></span></div>
 <p class="txt">${evalCorrect} de ${EVAL_QUESTIONS.length} respuestas correctas (${pct}%).</p>
 <button class="btn btn-solid btn-sm" style="margin-top:14px;" onclick="renderEval()">↺ Repetir evaluación</button>
 </div>`;
    return;
  }
  const q = EVAL_QUESTIONS[evalIdx];
  const letters = ['A','B','C','D'];
  root.innerHTML = `
 <div class="crumb">Pregunta ${evalIdx+1} de ${EVAL_QUESTIONS.length} · <span style="color:var(--blue);">${q.type}</span></div>
 <div class="case-box">
 <p style="font-weight:600;font-size:14.5px;white-space:pre-line;">${q.q}</p>
 <div class="choice-list" id="evalChoices">${q.opts.map((o,i)=>`<button class="choice" data-i="${i}"><span class="cletter">${letters[i]}</span>${o}</button>`).join('')}</div>
 <div class="feedback" id="evalFb"></div>
 <div style="margin-top:14px;display:none;" id="evalNextWrap"><button class="btn btn-solid btn-sm" onclick="evalNext()">Continuar →</button></div>
 </div>`;
  const list = document.getElementById('evalChoices');
  Array.from(list.children).forEach((btn,i)=>{
    btn.addEventListener('click', ()=>{
      if(list.dataset.answered) return;
      list.dataset.answered='1';
      const ok = i===q.correcta;
      if(ok) evalCorrect++; else addError();
      Array.from(list.children).forEach((b,j)=>{ if(j===q.correcta) b.classList.add('correct'); else if(j===i) b.classList.add('wrong'); });
      const fb = document.getElementById('evalFb');
      fb.classList.add('show', ok?'ok':'bad');
      fb.textContent = (ok?'Correcto. ':'Incorrecto. ')+q.exp;
      document.getElementById('evalNextWrap').style.display='block';
    });
  });
}
function evalNext(){ evalIdx++; paintEval(); }

/* ================= TEACHER PANEL ================= */
const TEACHER_BARS = [['Signos vitales',82],['Canalización',61],['IM',74],['SC',88],['ID',55],['IV',49]];
const ROSTER = [
  ['María F.','5/6','Fijación del catéter','8.4','3.2h'],
  ['Juan P.','4/6','Higiene de manos previa','7.1','2.5h'],
  ['Laura G.','6/6','—','9.2','4.0h'],
  ['Andrés R.','3/6','Antisepsia insuficiente','6.8','1.9h'],
  ['Camila S.','5/6','Tamaño de manguito','8.0','3.4h'],
];
function renderTeacher(){
  document.getElementById('teacherBars').innerHTML = TEACHER_BARS.map(b=>`
 <div class="bar-row"><div class="br-label">${b[0]}</div><div class="br-track"><div class="br-fill" style="width:${b[1]}%"></div></div><div class="br-val">${b[1]}%</div></div>
  `).join('');
  document.getElementById('rosterBody').innerHTML = ROSTER.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('');
}

/* ================= INIT ================= */
function initAll(){
  buildNav();
  go('home');
  renderHome();
  renderDashboard();
  renderModulosIndex();
  renderVitalSignsPills();
  renderVitalSignContent();
  renderIvAnatomy();
  renderIvMaterials();
  renderIvPrep();
  renderIvOrderChallenge();
  renderIvErrorChallenge();
  renderInjPills();
  renderInjContent();
  renderInjSimulator();
  renderAnatExplorer('anatExplorerWrap', null);
  renderSafety();
  renderSim();
  renderEval();
  renderTeacher();
  renderProgressUI();
  renderProgressPage();
  if(STATE.theme && STATE.theme!=='auto') setTheme(STATE.theme);
}
initAll();