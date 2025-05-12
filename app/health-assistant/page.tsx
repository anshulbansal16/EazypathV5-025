"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Loader2, MessageSquare } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function HealthAssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI health assistant. How can I help you with your health questions today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // Sample responses based on common health questions
      let response = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("headache")) {
        response =
          "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you experience severe or persistent headaches, it's advisable to consult with a healthcare professional."
      } else if (userInput.includes("cold") || userInput.includes("flu")) {
        response =
          "Common cold symptoms include runny nose, sore throat, and mild fatigue, while flu typically involves more severe symptoms like high fever, body aches, and extreme fatigue. Rest, hydration, and over-the-counter medications can help manage symptoms. If symptoms are severe or persistent, consider consulting a healthcare provider."
      } else if (userInput.includes("diet") || userInput.includes("nutrition")) {
        response =
          "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. It's important to limit processed foods, added sugars, and excessive salt. Remember that individual nutritional needs can vary based on factors like age, activity level, and health conditions."
      } else if (userInput.includes("exercise") || userInput.includes("workout")) {
        response =
          "Regular physical activity is important for overall health. Adults should aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities on 2 or more days per week. Always start gradually and consider consulting with a healthcare provider before beginning a new exercise program."
      } else if (userInput.includes("sleep")) {
        response =
          "Most adults need 7-9 hours of quality sleep per night. To improve sleep, maintain a consistent sleep schedule, create a restful environment, limit exposure to screens before bedtime, avoid caffeine and large meals before sleeping, and engage in regular physical activity. If you have persistent sleep problems, consider consulting a healthcare provider."
      } else {
        response =
          "Thank you for your question. While I can provide general health information, it's important to consult with a qualified healthcare professional for personalized advice. Is there a specific aspect of this topic you'd like to know more about?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
        AI Health Assistant
      </h1>

      <Card className="max-w-3xl mx-auto border border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-t-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Chat with Your Health Assistant</CardTitle>
              <CardDescription>Ask any health-related questions and get AI-powered answers</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-background to-muted/30">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-3 text-sm shadow-md ${
                      message.role === "user" ? "bg-gradient-to-r from-primary to-blue-600 text-white" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-md">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-md">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg px-4 py-3 text-sm bg-muted shadow-md">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t border-primary/10">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              placeholder="Type your health question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-primary/20 focus-visible:ring-primary shadow-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500/90 text-white shadow-md"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="max-w-3xl mx-auto mt-8 p-6 bg-muted/50 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary">Popular Health Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setInput("What causes headaches and how can I prevent them?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Headaches
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("How can I improve my sleep quality?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Sleep Quality
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("What's a balanced diet for weight management?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Nutrition
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("How much exercise do I need each week?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Exercise
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("How can I manage stress and anxiety?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Stress Management
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("What are the symptoms of common cold vs flu?")
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }}
            className="border-primary/20 hover:bg-primary/10 shadow-sm hover:shadow transition-all justify-start"
          >
            Cold & Flu
          </Button>
        </div>
      </div>
    </div>
  )
}
