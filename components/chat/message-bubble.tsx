"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react"
import type { Message } from "@/lib/stores/chat-store"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)

      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard.",
        variant: "destructive",
      })
    }
  }

  const isUser = message.sender === "user"

  return (
    <div className={`flex gap-4 message-container group ${isUser ? "justify-end" : "justify-start"} message-enter`}>
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="gemini-logo w-8 h-8"></div>
        </div>
      )}

      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Message Content */}
        <div
          className={`relative px-5 py-4 ${isUser ? "user-message ml-auto bg-primary text-primary-foreground" : "ai-message bg-muted/50 border border-border/30"}`}
        >
          {/* Copy Button - Only show for AI messages */}
          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              className={`copy-button absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-border/50 shadow-sm ${
                copied ? "copy-success" : ""
              }`}
              onClick={handleCopy}
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
            </Button>
          )}

          {/* Image */}
          {message.image && (
            <img src={message.image || "/placeholder.svg"} alt="Uploaded" className="max-w-full rounded-xl mb-3" />
          )}

          {/* Text Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap break-words m-0 text-body-large leading-relaxed">{message.content}</p>
          </div>
        </div>

        {/* Message Actions - Only for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Timestamp */}
        <div className={`mt-1 text-body-medium text-muted-foreground ${isUser ? "text-right" : "text-left"}`}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      )}
    </div>
  )
}
