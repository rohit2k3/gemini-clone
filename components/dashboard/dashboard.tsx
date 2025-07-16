"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useChatStore } from "@/lib/stores/chat-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CreateChatroomDialog from "./create-chatroom-dialog";

export default function Dashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { user } = useAuthStore();
  const {
    createChatroom,
    initializeData,
  } = useChatStore();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleCreateChatroom = (title: string) => {
    const chatroomId = createChatroom(title);
    setIsCreateDialogOpen(false);

    toast({
      title: "Chat created",
      description: `"${title}" is ready to use.`,
    });

    router.push(`dashboard/chat/${chatroomId}`);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Welcome Screen */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <div
              className="gemini-logo mx-auto mb-8"
              style={{ width: "64px", height: "64px" }}
            ></div>

            <h1 className="text-display-medium gemini-text-gradient mb-6">
              Hello, {user?.phone.slice(-4)}
            </h1>

            <p className="text-headline-medium text-muted-foreground mb-12">
              How can I help you today?
            </p>

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
                    const chatroomId = createChatroom(suggestion);
                    router.push(`dashboard/chat/${chatroomId}`);
                  }}
                >
                  <div>
                    <p className="text-body-large font-medium mb-1">
                      {suggestion}
                    </p>
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
  );
}
