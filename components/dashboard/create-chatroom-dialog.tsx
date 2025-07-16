"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, MessageCircle } from "lucide-react"

const chatroomSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters").trim(),
})

type ChatroomFormData = z.infer<typeof chatroomSchema>

interface CreateChatroomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateChatroom: (title: string) => void
}

export default function CreateChatroomDialog({ open, onOpenChange, onCreateChatroom }: CreateChatroomDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChatroomFormData>({
    resolver: zodResolver(chatroomSchema),
    mode: "onChange",
  })

  const onSubmit = (data: ChatroomFormData) => {
    onCreateChatroom(data.title)
    reset()
  }

  const handleClose = () => {
    onOpenChange(false)
    reset()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-primary-foreground/5 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <CardTitle>New Conversation</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Give your new conversation a descriptive title</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Conversation Title</label>
              <Input {...register("title")} placeholder="e.g., Help with React project" autoFocus />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid}>
                Create Chat
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
