"use client";

import { useEffect, useRef, useState } from "react";
import type Vapi from "@vapi-ai/web";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { VAPI_ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@/lib/vapiConfig";

type CallState = "idle" | "connecting" | "active" | "ended" | "error";

const STATUS_TEXT: Record<CallState, string> = {
  idle: "Нажмите кнопку и разрешите доступ к микрофону",
  connecting: "Соединяем…",
  active: "Идёт разговор",
  ended: "Разговор завершён. Спасибо!",
  error: "Не получилось соединиться",
};

export function CallWidget() {
  const vapiRef = useRef<Vapi | null>(null);
  const [state, setState] = useState<CallState>("idle");
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [seconds, setSeconds] = useState(0);

  const ready = VAPI_ASSISTANT_ID.length > 0;

  useEffect(() => {
    if (state !== "active") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [state]);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  async function startCall() {
    setErrorText("");
    setSeconds(0);
    setMuted(false);
    setState("connecting");

    try {
      if (!vapiRef.current) {
        const { default: VapiClient } = await import("@vapi-ai/web");
        const vapi = new VapiClient(VAPI_PUBLIC_KEY);
        vapi.on("call-start", () => setState("active"));
        vapi.on("call-end", () => {
          setAssistantSpeaking(false);
          setState("ended");
        });
        vapi.on("speech-start", () => setAssistantSpeaking(true));
        vapi.on("speech-end", () => setAssistantSpeaking(false));
        vapi.on("error", (err: unknown) => {
          console.error("Vapi error", err);
          setAssistantSpeaking(false);
          setErrorText(
            "Проверьте интернет и разрешение на микрофон, затем попробуйте ещё раз.",
          );
          setState("error");
        });
        vapiRef.current = vapi;
      }
      await vapiRef.current.start(VAPI_ASSISTANT_ID);
    } catch (err) {
      console.error("Vapi start failed", err);
      setErrorText(
        "Проверьте интернет и разрешение на микрофон, затем попробуйте ещё раз.",
      );
      setState("error");
    }
  }

  function endCall() {
    vapiRef.current?.stop();
  }

  function toggleMute() {
    const vapi = vapiRef.current;
    if (!vapi) return;
    const next = !muted;
    vapi.setMuted(next);
    setMuted(next);
  }

  const inCall = state === "connecting" || state === "active";
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-ais-bg-dark/80 p-8 text-center shadow-2xl backdrop-blur">
      <h1 className="font-heading text-2xl font-semibold text-ais-text">
        Голосовой помощник
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ais-muted">
        С вами поговорит ИИ-помощник. Он ответит на вопросы и передаст всё
        команде. Разговор записывается, чтобы ничего не потерять.
      </p>

      <div className="relative mx-auto mt-10 flex size-36 items-center justify-center">
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-ais-primary/20 transition-transform duration-300",
            state === "active" && "animate-pulse",
            assistantSpeaking ? "scale-110" : "scale-90",
          )}
        />
        {inCall ? (
          <button
            type="button"
            onClick={endCall}
            aria-label="Завершить звонок"
            className="relative flex size-24 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition active:scale-95"
          >
            <PhoneOff className="size-10" />
          </button>
        ) : (
          <button
            type="button"
            onClick={startCall}
            disabled={!ready}
            aria-label="Позвонить"
            className="relative flex size-24 items-center justify-center rounded-full bg-ais-primary text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Phone className="size-10" />
          </button>
        )}
      </div>

      <p className="mt-8 text-base font-medium text-ais-text">
        {ready ? STATUS_TEXT[state] : "Помощник скоро будет готов"}
      </p>
      {state === "active" && (
        <p className="mt-1 font-mono text-sm text-ais-dim">
          {assistantSpeaking ? "Говорит помощник" : "Слушаю вас"} · {minutes}:
          {secs}
        </p>
      )}
      {errorText && <p className="mt-2 text-sm text-ais-orange">{errorText}</p>}

      {state === "active" && (
        <button
          type="button"
          onClick={toggleMute}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-ais-muted transition hover:bg-white/5"
        >
          {muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
          {muted ? "Включить микрофон" : "Выключить микрофон"}
        </button>
      )}

      {(state === "ended" || state === "error") && (
        <button
          type="button"
          onClick={startCall}
          className="mx-auto mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-ais-muted transition hover:bg-white/5"
        >
          Позвонить ещё раз
        </button>
      )}
    </div>
  );
}
