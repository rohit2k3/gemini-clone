"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import ChatInterface from "@/components/chat/chat-interface"
// import { useAuthStore } from "@/lib/stores/auth-store"
// import ChatInterface from "@/components/chat/chat-interface"

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  
  const router = useRouter()
  const { isAuthenticated, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Will redirect to home
  }

  return <ChatInterface chatId={unwrappedParams.id} />
}
