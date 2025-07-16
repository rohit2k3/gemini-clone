"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreVertical, Paperclip, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { useChatStore } from "@/lib/stores/chat-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { generateAIResponse, simulateTypingDelay } from "@/lib/utils/ai-responses"
import { useToast } from "@/hooks/use-toast"
import MessageBubble from "./message-bubble"
import TypingIndicator from "./typing-indicator"
import MessageSkeleton from "./message-skeleton"

interface ChatInterfaceProps {
  chatId: string
}

export default function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMoreMessages, setHasMoreMessages] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuthStore()

  const {
    chatrooms,
    messages,
    isTyping,
    addMessage,
    setTyping,
    getChatMessages,
    initializeData,
  } = useChatStore()

  const currentChatroom = chatrooms.find((room) => room.id === chatId)
  const chatMessages = getChatMessages(chatId, page)

  useEffect(() => {
    initializeData()
  }, [initializeData])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      const allMessages = messages[chatId] || []
      setHasMoreMessages(allMessages.length > page * 20)
    }, 800)

    return () => clearTimeout(timer)
  }, [chatId, messages, page])

  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages.length, isTyping, isLoading])

  // Handle infinite scroll
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMoreMessages && !isLoading) {
        const prevScrollHeight = container.scrollHeight
        setPage((prev) => prev + 1)

        // Maintain scroll position after loading more messages
        setTimeout(() => {
          const newScrollHeight = container.scrollHeight
          container.scrollTop = newScrollHeight - prevScrollHeight
        }, 100)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [hasMoreMessages, isLoading])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [message])

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return

    const userMessage = {
      content: message.trim(),
      sender: "user" as const,
      image: selectedImage || undefined,
    }

    addMessage(chatId, userMessage)
    setMessage("")
    setSelectedImage(null)
    setTyping(true)

    try {
      await simulateTypingDelay()
      const aiResponse = await generateAIResponse(userMessage.content)
      addMessage(chatId, {
        content: aiResponse,
        sender: "ai",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (!currentChatroom) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="gemini-logo mx-auto mb-4"></div>
          <h2 className="text-headline-large mb-2">Chat not found</h2>
          <p className="text-body-large text-muted-foreground mb-6">
            The conversation you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/dashboard")} className="gemini-button gemini-button-primary">
            Back to chats
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="gemini-logo w-8 h-8"></div>
                  <div>
                    <h1 className="text-body-large font-medium">{currentChatroom.title}</h1>
                    {isTyping && <p className="text-body-medium text-muted-foreground">Gemini is typing...</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-muted/50">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {isLoading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <MessageSkeleton key={i} isUser={i % 2 === 0} />
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="space-y-6">
                {hasMoreMessages && (
                  <div className="text-center py-4">
                    <Button
                      variant="outline"
                      onClick={() => setPage((prev) => prev + 1)}
                      className="gemini-button bg-muted/30 hover:bg-muted/50 border-border/50"
                    >
                      Load earlier messages
                    </Button>
                  </div>
                )}

                {chatMessages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {isTyping && <TypingIndicator />}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mb-4">
                <div className="inline-block relative">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected"
                    className="max-w-xs max-h-32 rounded-xl object-cover border border-border/50"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border/50 hover:bg-muted"
                    onClick={() => setSelectedImage(null)}
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* Input Container */}
            <div className="relative bg-muted/30 rounded-3xl border border-border/50 focus-within:border-primary/50 focus-within:bg-background/50 transition-all">
              <div className="flex items-end gap-2 p-2">
                {/* Attachment Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isTyping}
                  className="w-10 h-10 rounded-full flex-shrink-0 hover:bg-muted/50"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                {/* Text Input */}
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a prompt here"
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-0 outline-none resize-none py-3 px-2 text-body-large placeholder:text-muted-foreground min-h-[24px] max-h-[120px]"
                  rows={1}
                />

                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={(!message.trim() && !selectedImage) || isTyping}
                  size="icon"
                  className="w-10 h-10 rounded-full flex-shrink-0 gemini-button-primary disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-body-medium text-muted-foreground mt-3">
              Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
