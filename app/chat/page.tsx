"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ChatMessages from "@/components/chat-messages"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  return (
    <div className="container px-4 py-6 pb-20 flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex items-center gap-2 mb-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Assistant Pao</h1>
      </header>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="p-0 flex-1 flex flex-col overflow-y-auto">
          <ChatMessages />
        </CardContent>
      </Card>
    </div>
  )
}
