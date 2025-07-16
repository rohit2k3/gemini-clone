"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreVertical, Edit3, Trash2, Check, X } from "lucide-react"
import type { Chatroom } from "@/lib/stores/chat-store"
import { useChatStore } from "@/lib/stores/chat-store"

interface ChatOptionsMenuProps {
  chatroom: Chatroom
  onDelete: (id: string, title: string) => void
}

export default function ChatOptionsMenu({ chatroom, onDelete }: ChatOptionsMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTitle, setNewTitle] = useState(chatroom.title)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { renameChatroom } = useChatStore()

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRenaming(true)
    setIsMenuOpen(false)
  }

  const handleRenameSubmit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (newTitle.trim() && newTitle.trim() !== chatroom.title) {
      renameChatroom(chatroom.id, newTitle.trim())
    }
    setIsRenaming(false)
    setNewTitle(chatroom.title)
  }

  const handleRenameCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRenaming(false)
    setNewTitle(chatroom.title)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (showDeleteConfirm) {
      onDelete(chatroom.id, chatroom.title)
    } else {
      setShowDeleteConfirm(true)
      setIsMenuOpen(false)
      // Reset confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.stopPropagation()
      handleRenameSubmit(e as any)
    } else if (e.key === "Escape") {
      e.stopPropagation()
      handleRenameCancel(e as any)
    }
  }

  // If currently renaming, show input field
  if (isRenaming) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleInputKeyPress}
          className="h-8 text-sm"
          autoFocus
          onFocus={(e) => e.target.select()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 hover:bg-green-100 hover:text-green-600"
          onClick={handleRenameSubmit}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 hover:bg-red-100 hover:text-red-600"
          onClick={handleRenameCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Three dots button */}
      <Button
        variant="ghost"
        size="icon"
        className={`w-8 h-8 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } hover:bg-muted/50`}
        onClick={handleMenuClick}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

          {/* Menu */}
          <div className="absolute right-0 top-8 z-20 bg-background border border-border/50 rounded-lg shadow-lg py-1 min-w-[140px]">
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 flex items-center gap-2 transition-colors"
              onClick={handleRenameClick}
            >
              <Edit3 className="h-4 w-4" />
              Rename
            </button>
            <button
              className={`w-full px-3 py-2 text-left text-sm hover:bg-destructive/10 hover:text-destructive flex items-center gap-2 transition-colors ${
                showDeleteConfirm ? "bg-destructive/10 text-destructive" : ""
              }`}
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
              {showDeleteConfirm ? "Confirm Delete" : "Delete"}
            </button>
          </div>
        </>
      )}

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-destructive/10 backdrop-blur-sm rounded-xl flex items-center justify-center z-30">
          <div className="text-center">
            <p className="text-sm font-medium text-destructive mb-1">Delete chat?</p>
            <p className="text-xs text-muted-foreground">Click delete again to confirm</p>
          </div>
        </div>
      )}
    </div>
  )
}
