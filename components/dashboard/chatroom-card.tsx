"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Trash2 } from "lucide-react"
import type { Chatroom } from "@/lib/stores/chat-store"
import { formatDistanceToNow } from "date-fns"

interface ChatroomCardProps {
  chatroom: Chatroom
  onDelete: (id: string, title: string) => void
  onClick: () => void
}

export default function ChatroomCard({ chatroom, onDelete, onClick }: ChatroomCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (showDeleteConfirm) {
      onDelete(chatroom.id, chatroom.title)
    } else {
      setShowDeleteConfirm(true)
      // Reset confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }

  const handleCardClick = () => {
    if (!showDeleteConfirm) {
      onClick()
    }
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 group relative"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <CardTitle className="text-base truncate">{chatroom.title}</CardTitle>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
          >
            <Trash2 className={`h-4 w-4 ${showDeleteConfirm ? "text-destructive" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          {chatroom.lastMessage && <CardDescription className="line-clamp-2">{chatroom.lastMessage}</CardDescription>}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {chatroom.lastMessageTime
                ? formatDistanceToNow(new Date(chatroom.lastMessageTime), { addSuffix: true })
                : formatDistanceToNow(new Date(chatroom.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-destructive/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-destructive mb-2">Delete this chat?</p>
              <p className="text-xs text-muted-foreground">Click delete again to confirm</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
