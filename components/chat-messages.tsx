"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Pill, AlertTriangle, Info, Bot } from "lucide-react"
import { PandaMascot } from "@/components/ui/panda-mascot"
import { useChat } from '@ai-sdk/react';

type Message = {
  id: number
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "general" | "medication" | "warning" | "info"
}

export default function ChatMessages() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: "assistant",
        content: "Bonjour ! Je suis votre assistant Pao.\n\nComment puis-je vous aider aujourd'hui ?",
        createdAt: new Date(Date.now() - 1000 * 60 * 5),
      },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  // : message. === "medication"
                  //   ? "bg-primary/10 text-foreground"
                  //   : message.type === "warning"
                  //     ? "bg-destructive/10 text-foreground"
                  //     : message.type === "info"
                  //       ? "bg-secondary/10 text-foreground"
                        : "bg-muted text-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === "assistant" && (
                  <div>
                      <PandaMascot />
                  </div>
                )}
                <div>
                  <pre className="text-sm whitespace-pre-wrap break-words">{message.content}</pre>
                  <p className="text-xs opacity-70 mt-1 text-right">{formatTime(message.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start overflow-y-auto">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground">
              <div className="flex items-center gap-2">
                <PandaMascot />
                <div className="typing-indicator">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t sticky bottom-0 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question sur vos médicaments..."
            className="flex-1"
          />
          <Button onClick={handleSubmit} size="icon" disabled={input.trim() === ""}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Cet assistant ne remplace pas un avis médical professionnel.
        </p>
      </div>
    </>
  )
}
