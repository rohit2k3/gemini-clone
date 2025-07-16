"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Search,
  MessageCircle,
  Moon,
  Sun,
  Menu,
  Edit3,
} from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "next-themes";
import { useChatStore } from "@/lib/stores/chat-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import ChatOptionsMenu from "../chat/chat-options-menu";
import { useTheme } from "next-themes";
import CreateChatroomDialog from "./create-chatroom-dialog";

const Sidebar = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = React.use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { user, logout } = useAuthStore();
  const {
    chatrooms,
    createChatroom,
    deleteChatroom,
    setSearchQuery: setChatSearchQuery,
    getFilteredChatrooms,
    initializeData,
  } = useChatStore();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    setChatSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setChatSearchQuery]);

  const filteredChatrooms = getFilteredChatrooms();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleCreateChatroom = (title: string) => {
    const chatroomId = createChatroom(title);
    setIsCreateDialogOpen(false);

    toast({
      title: "Chat created",
      description: `"${title}" is ready to use.`,
    });

    router.push(`dashboard/chat/${chatroomId}`);
  };

  const handleDeleteChatroom = (id: string, title: string) => {
    deleteChatroom(id);
    toast({
      title: "Chat deleted",
      description: `"${title}" has been removed.`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You've been signed out of Gemini.",
    });
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-80 flex-shrink-0 border-r border-border/50 bg-card/30 backdrop-blur-sm ${sidebarOpen ? "block" : "hidden"} lg:block`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="gemini-logo"></div>
              <span className="text-title-large font-medium">Gemini</span>
            </div>

            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="w-full gemini-button gemini-button-secondary justify-start gap-3 h-12 bg-muted/50 hover:bg-muted"
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
                className="gemini-input pl-12 bg-muted/30 border-0"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredChatrooms.length === 0 ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-body-medium text-muted-foreground">
                  {searchQuery ? "No chats found" : "No chats yet"}
                </p>
              </div>
            ) : (
              <div className="p-2">
                {filteredChatrooms.map((chatroom) => (
                  <div
                    key={chatroom.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all group relative ${
                      chatroom.id === unwrappedParams.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/30"
                    }`}
                    onClick={() => router.push(`dashboard/chat/${chatroom.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body-large font-medium truncate mb-1">{chatroom.title}</h3>
                        {chatroom.lastMessage && (
                          <p className="text-body-medium text-muted-foreground truncate">{chatroom.lastMessage}</p>
                        )}
                      </div>
                      <ChatOptionsMenu
                        chatroom={chatroom}
                        onRename={(id, newTitle) => {
                          // We'll implement this in the store
                          const updatedChatrooms = chatrooms.map((room) =>
                            room.id === id ? { ...room, title: newTitle } : room,
                          )
                          // Update the store - we'll add this method
                        }}
                        onDelete={(id, title) => handleDeleteChatroom(id, title)}
                      />
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {user?.phone.slice(-2)}
                </div>
                <span className="text-body-medium text-muted-foreground">
                  {user?.countryCode}
                  {user?.phone}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-8 h-8 hover:bg-muted/50"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                <Button variant="ghost" size="icon" onClick={handleLogout} className="w-8 h-8 hover:bg-muted/50">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateChatroomDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateChatroom={handleCreateChatroom}
      />
    </>
  );
};
export default Sidebar;
