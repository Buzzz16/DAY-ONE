import { PropsWithChildren } from "react";

export default function ChatMessage({
  role,
  children,
}: PropsWithChildren<{ role: "assistant" | "user" }>) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {}
      {!isUser && (
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-2xl grid place-items-center bg-gradient-to-br from-sky-400 via-fuchsia-500 to-pink-500">
            {}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
              <path
                d="M12 3L2 8l10 5 8-4v6h2V8L12 3zm-6 9v4l6 3 6-3v-4l-6 3-6-3z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}

      {}
      <div
  className={[
    "max-w-[80%] sm:max-w-[70%] md:max-w-[60%] rounded-2xl px-4 py-3 bubble",
    isUser
      ? "bg-teal-100 border border-black/10 text-black"
      : "bg-white border border-black/10 text-black"
  ].join(" ")}
>

        <div className="prose prose-invert prose-sm sm:prose-base">
          {children}
        </div>
      </div>

      {}
      {isUser && (
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-2xl grid place-items-center bg-teal-500">
            {}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
              <path
                d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
