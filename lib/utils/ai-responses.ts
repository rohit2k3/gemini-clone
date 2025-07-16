const AI_RESPONSES = [
  "That's an interesting question! Let me think about that for a moment.",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Great question! I'd be happy to help you with that.",
  "That's a thoughtful inquiry. Let me provide you with some insights.",
  "I appreciate you asking about this. Here's what I can tell you.",
  "That's something I can definitely help you with. Let me explain.",
  "Interesting point! I have some thoughts on that subject.",
  "I'm glad you brought that up. Here's my take on it.",
  "That's a complex topic, but I'll do my best to explain it clearly.",
  "Good question! I think you'll find this information helpful.",
]

const FOLLOW_UP_RESPONSES = [
  "Is there anything specific about this topic you'd like me to elaborate on?",
  "Would you like me to provide more details on any particular aspect?",
  "Do you have any follow-up questions about what I've shared?",
  "Is there another angle of this topic you'd like to explore?",
  "Would you like me to explain this differently or provide examples?",
]

export function generateAIResponse(userMessage: string): Promise<string> {
  return new Promise((resolve) => {
    // Simulate AI thinking time (1-3 seconds)
    const thinkingTime = Math.random() * 2000 + 1000

    setTimeout(() => {
      const baseResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
      const followUp =
        Math.random() > 0.7 ? ` ${FOLLOW_UP_RESPONSES[Math.floor(Math.random() * FOLLOW_UP_RESPONSES.length)]}` : ""

      // Add some context based on user message
      let contextualResponse = baseResponse

      if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        contextualResponse = "Hello! It's great to meet you. How can I assist you today?"
      } else if (userMessage.toLowerCase().includes("help")) {
        contextualResponse = "I'm here to help! What specific topic or question can I assist you with?"
      } else if (userMessage.toLowerCase().includes("thank")) {
        contextualResponse = "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?"
      }

      resolve(contextualResponse + followUp)
    }, thinkingTime)
  })
}

export function simulateTypingDelay(): Promise<void> {
  return new Promise((resolve) => {
    // Random typing delay between 500ms and 2000ms
    const delay = Math.random() * 1500 + 500
    setTimeout(resolve, delay)
  })
}
