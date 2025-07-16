"use client"

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 justify-start message-enter">
      <div className="flex-shrink-0 mt-1">
        <div className="gemini-logo w-8 h-8"></div>
      </div>

      <div className="flex flex-col items-start">
        <div className="ai-message px-5 py-4">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
