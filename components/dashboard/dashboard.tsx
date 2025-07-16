"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Search, MessageCircle, Moon, Sun, Menu, Edit3 } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useChatStore } from "@/lib/stores/chat-store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import CreateChatroomDialog from "./create-chatroom-dialog"
import ChatOptionsMenu from "../chat/chat-options-menu"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const { user, logout } = useAuthStore()
  const {
    chatrooms,
    createChatroom,
    deleteChatroom,
    setSearchQuery: setChatSearchQuery,
    getFilteredChatrooms,
    initializeData,
  } = useChatStore()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    initializeData()
  }, [initializeData])

  useEffect(() => {
    setChatSearchQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, setChatSearchQuery])

  const filteredChatrooms = getFilteredChatrooms()

  const handleCreateChatroom = (title: string) => {
    const chatroomId = createChatroom(title)
    setIsCreateDialogOpen(false)

    toast({
      title: "Chat created",
      description: `"${title}" is ready to use.`,
    })

    router.push(`/chat/${chatroomId}`)
  }

  const handleDeleteChatroom = (id: string, title: string) => {
    deleteChatroom(id)
    toast({
      title: "Chat deleted",
      description: `"${title}" has been removed.`,
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Signed out",
      description: "You've been signed out of Gemini.",
    })
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`gemini-sidebar w-80 flex-shrink-0 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="gemini-logo"></div>
              <span className="text-title-large">Gemini</span>
            </div>

            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="w-full gemini-button gemini-button-secondary justify-start gap-3 h-12"
            >
              <Edit3 className="h-5 w-5" />
              New chat
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search chats"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gemini-input pl-12"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredChatrooms.length === 0 ? (
              <div className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-body-medium text-muted-foreground">
                  {searchQuery ? "No chats found" : "No chats yet"}
                </p>
              </div>
            ) : (
              <div className="p-2">
                {filteredChatrooms.map((chatroom) => (
                  <div
                    key={chatroom.id}
                    className="p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group relative"
                    onClick={() => router.push(`/chat/${chatroom.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body-large font-medium truncate mb-1">{chatroom.title}</h3>
                        {chatroom.lastMessage && (
                          <p className="text-body-medium text-muted-foreground truncate">{chatroom.lastMessage}</p>
                        )}
                      </div>
                      <ChatOptionsMenu chatroom={chatroom} onDelete={handleDeleteChatroom} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user?.phone.slice(-2)}
                </div>
                <span className="text-body-medium">
                  {user?.countryCode}
                  {user?.phone}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-8 h-8"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                <Button variant="ghost" size="icon" onClick={handleLogout} className="w-8 h-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="gemini-logo"></div>
              <span className="text-title-large">Gemini</span>
            </div>

            <div className="w-10" />
          </div>
        </div>

        {/* Welcome Screen */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <div className="gemini-logo mx-auto mb-8" style={{ width: "64px", height: "64px" }}></div>

            <h1 className="text-display-medium gemini-text-gradient mb-6">Hello, {user?.phone.slice(-4)}</h1>

            <p className="text-headline-medium text-muted-foreground mb-12">How can I help you today?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Write a story about a magic backpack",
                "Help me plan a trip to Japan",
                "Explain quantum computing simply",
                "Create a workout routine for beginners",
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="p-6 h-auto text-left justify-start hover:shadow-md transition-all bg-card/50 hover:bg-card border-border/30 hover:border-border/50"
                  onClick={() => {
                    const chatroomId = createChatroom(suggestion)
                    router.push(`/chat/${chatroomId}`)
                  }}
                >
                  <div>
                    <p className="text-body-large font-medium mb-1">{suggestion}</p>
                  </div>
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="gemini-button gemini-button-primary px-8 py-3 text-body-large"
            >
              Start new chat
            </Button>
          </div>
        </div>
      </div>

      <CreateChatroomDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateChatroom={handleCreateChatroom}
      />
    </div>
  )
}
