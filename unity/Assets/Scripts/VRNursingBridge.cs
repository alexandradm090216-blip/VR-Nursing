using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.Networking;

/// <summary>
/// Conecta la app de Unity (Meta Quest) con la web VR Nursing Lab.
/// Flujo: la web crea una sesión con un código de 6 caracteres; esta clase
/// la lee con ese código, avisa que el visor está conectado y, al terminar
/// la práctica, escribe el resultado para que la web lo muestre.
/// Usa la API REST de Firebase Realtime Database: no requiere instalar el SDK.
/// </summary>
public class VRNursingBridge : MonoBehaviour
{
    [Header("Misma URL que en assets/js/vr-bridge.js (sin barra final)")]
    [SerializeField] private string databaseUrl = "https://TU-PROYECTO-default-rtdb.firebaseio.com";

    [Serializable]
    public class SessionData
    {
        public string scenario;   // "Sala de procedimientos", "Servicio de urgencias", ...
        public string caseId;     // "canalizacion_iv_01", ...
        public int level;         // progreso general del estudiante (0-100)
        public string status;     // waiting | connected | completed
        public long expiresAt;    // milisegundos Unix
    }

    [Serializable]
    public class ResultData
    {
        public int correct;
        public int total;
        public int errors;
        public int seconds;
    }

    [Serializable]
    private class CompletedPatch
    {
        public string status = "completed";
        public ResultData result;
    }

    [Serializable]
    private class StatusPatch
    {
        public string status = "connected";
    }

    [Header("Eventos")]
    public UnityEvent<SessionData> OnSessionLoaded;   // cargar aquí la escena según scenario/caseId
    public UnityEvent<string> OnError;

    private string currentCode;

    /// <summary>Llamar desde el botón "Conectar" con el código que escribe el estudiante.</summary>
    public void Connect(string code)
    {
        currentCode = (code ?? "").Trim().ToUpperInvariant();
        if (currentCode.Length != 6)
        {
            OnError?.Invoke("El código debe tener 6 caracteres.");
            return;
        }
        StartCoroutine(ConnectRoutine());
    }

    /// <summary>Llamar al terminar la práctica con el resultado.</summary>
    public void SendResult(int correct, int total, int errors, int seconds)
    {
        if (string.IsNullOrEmpty(currentCode)) return;
        var body = JsonUtility.ToJson(new CompletedPatch
        {
            result = new ResultData { correct = correct, total = total, errors = errors, seconds = seconds }
        });
        StartCoroutine(Patch(body, null));
    }

    private string SessionUrl() => databaseUrl.TrimEnd('/') + "/sessions/" + currentCode + ".json";

    private IEnumerator ConnectRoutine()
    {
        using (var req = UnityWebRequest.Get(SessionUrl()))
        {
            yield return req.SendWebRequest();
            if (req.result != UnityWebRequest.Result.Success)
            {
                OnError?.Invoke("No se pudo contactar el servidor: " + req.error);
                yield break;
            }

            var text = req.downloadHandler.text;
            if (string.IsNullOrEmpty(text) || text == "null")
            {
                OnError?.Invoke("Código no encontrado o caducado.");
                yield break;
            }

            var session = JsonUtility.FromJson<SessionData>(text);
            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            if (session.expiresAt > 0 && now > session.expiresAt)
            {
                OnError?.Invoke("El código ya caducó. Crea una sesión nueva en la web.");
                yield break;
            }

            // Avisa a la web que el visor ya se conectó
            yield return Patch(JsonUtility.ToJson(new StatusPatch()), null);
            OnSessionLoaded?.Invoke(session);
        }
    }

    private IEnumerator Patch(string json, Action done)
    {
        using (var req = new UnityWebRequest(SessionUrl(), "PATCH"))
        {
            req.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(json));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            yield return req.SendWebRequest();
            if (req.result != UnityWebRequest.Result.Success)
                OnError?.Invoke("No se pudo enviar al servidor: " + req.error);
            done?.Invoke();
        }
    }
}
