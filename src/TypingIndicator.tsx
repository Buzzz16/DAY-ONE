export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {}
      <div className="shrink-0">
        <div className="w-9 h-9 rounded-2xl grid place-items-center 
                        bg-gradient-to-br from-sky-400 via-fuchsia-500 to-pink-500 shadow">
          {}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path
              d="M12 3L2 8l10 5 8-4v6h2V8L12 3zm-6 9v4l6 3 6-3v-4l-6 3-6-3z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {}
      <div
        className="max-w-[80%] sm:max-w-[70%] md:max-w-[60%]
                   rounded-2xl px-4 py-3 
                   bg-white/80 border border-black/10 text-black"
      >
        {}
        <div className="typing-dots gap-1 flex items-center">
          <span className="bg-black/70" />
          <span className="bg-black/70" />
          <span className="bg-black/70" />
          <span className="sr-only">Counto sedang mengetik…</span>
        </div>

        {}
        <div className="mt-3 space-y-2">
          <div className="h-3 w-40 sm:w-56 rounded skeleton-line bg-black/10" />
          <div className="h-3 w-24 sm:w-36 rounded skeleton-line bg-black/10" />
        </div>
      </div>
    </div>
  );
}
