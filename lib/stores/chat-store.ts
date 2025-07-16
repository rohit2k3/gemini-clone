import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  image?: string
}

export interface Chatroom {
  id: string
  title: string
  createdAt: string
  lastMessage?: string
  lastMessageTime?: string
}

interface ChatState {
  chatrooms: Chatroom[]
  messages: Record<string, Message[]>
  isTyping: boolean
  searchQuery: string
  createChatroom: (title: string) => string
  deleteChatroom: (id: string) => void
  renameChatroom: (id: string, newTitle: string) => void
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void
  setTyping: (typing: boolean) => void
  setSearchQuery: (query: string) => void
  getFilteredChatrooms: () => Chatroom[]
  getChatMessages: (chatId: string, page?: number, limit?: number) => Message[]
  initializeData: () => void
}

const generateDummyMessages = (chatId: string): Message[] => {
  const dummyConversations = [
    [
      { content: "Hello! Can you help me understand quantum computing?", sender: "user" },
      {
        content:
          "I'd be happy to help you understand quantum computing! Quantum computing is a revolutionary approach to computation that harnesses the principles of quantum mechanics to process information in fundamentally different ways than classical computers.\n\nHere are the key concepts:\n\n**Quantum Bits (Qubits)**\n- Classical computers use bits that are either 0 or 1\n- Quantum computers use qubits that can be in a superposition of both 0 and 1 simultaneously\n- This allows quantum computers to process multiple possibilities at once\n\n**Key Principles:**\n1. **Superposition** - Qubits can exist in multiple states simultaneously\n2. **Entanglement** - Qubits can be correlated in ways that classical particles cannot\n3. **Interference** - Quantum states can amplify correct answers and cancel out wrong ones\n\n**Potential Applications:**\n- Cryptography and security\n- Drug discovery and molecular modeling\n- Financial modeling\n- Artificial intelligence and machine learning\n- Weather prediction\n\nWould you like me to dive deeper into any of these concepts?",
        sender: "ai",
      },
      { content: "That's fascinating! Can you explain superposition in more detail?", sender: "user" },
      {
        content:
          "Superposition is one of the most mind-bending concepts in quantum mechanics.\n\n**Classical vs Quantum States:**\n- A classical bit is like a coin that's either heads (1) or tails (0)\n- A qubit in superposition is like a spinning coin - it's both heads AND tails until you observe it\n\n**Schrödinger's Cat Analogy:**\nYou might have heard of Schrödinger's famous thought experiment where a cat in a box is both alive and dead until observed. Similarly, a qubit can be in all possible states simultaneously until measured.\n\n**Mathematical Representation:**\nA qubit in superposition can be written as: |ψ⟩ = α|0⟩ + β|1⟩\n- α and β are probability amplitudes\n- |α|² gives the probability of measuring 0\n- |β|² gives the probability of measuring 1\n\n**Practical Example:**\nImagine you're trying to find your way through a maze:\n- Classical computer: tries one path at a time\n- Quantum computer: explores ALL possible paths simultaneously through superposition\n\n**The Power:**\nWith n qubits, you can represent 2ⁿ states simultaneously:\n- 3 qubits = 8 states\n- 10 qubits = 1,024 states\n- 300 qubits = more states than atoms in the universe!\n\nThis exponential scaling is what gives quantum computers their potential power for certain problems.",
        sender: "ai",
      },
    ],
    [
      { content: "I'm planning a trip to Japan. Can you help me create an itinerary?", sender: "user" },
      {
        content:
          "I'd love to help you plan your Japan trip! Japan is an incredible destination with so much to offer. To create the perfect itinerary for you, I'd like to know a few details:\n\n**Questions to help customize your trip:**\n1. How long will you be visiting? (1 week, 2 weeks, etc.)\n2. What time of year are you planning to go?\n3. What are your main interests? (culture, food, nature, technology, anime/manga, history)\n4. What's your budget range?\n5. Do you prefer a fast-paced trip or a more relaxed pace?\n6. Any specific cities you definitely want to visit?\n\n**Popular destinations to consider:**\n🏯 **Tokyo** - Modern metropolis, technology, pop culture\n🎋 **Kyoto** - Traditional culture, temples, geishas\n🦌 **Nara** - Historic temples, friendly deer\n🗾 **Osaka** - Food capital, vibrant nightlife\n🗻 **Mount Fuji area** - Iconic mountain, hot springs\n🏰 **Hiroshima** - Peace Memorial, Miyajima Island\n\n**Best times to visit:**\n- 🌸 Spring (March-May): Cherry blossoms, mild weather\n- 🌞 Summer (June-August): Festivals, but hot and humid\n- 🍁 Fall (September-November): Beautiful autumn colors\n- ❄️ Winter (December-February): Snow, winter illuminations\n\nOnce you share your preferences, I can create a detailed day-by-day itinerary for you!",
        sender: "ai",
      },
      { content: "I have 10 days in April, interested in culture and food, moderate budget", sender: "user" },
      {
        content:
          "Perfect timing for cherry blossoms! Here's a fantastic 10-day cultural and culinary journey through Japan:\n\n## 🌸 **10-Day Japan Cultural & Food Itinerary (April)**\n\n### **Days 1-4: Tokyo**\n**Day 1: Arrival & Shibuya/Harajuku**\n- Land at Narita/Haneda, get JR Pass\n- Explore Shibuya Crossing & Hachiko statue\n- Dinner: Authentic ramen in Shibuya\n\n**Day 2: Traditional Tokyo**\n- Morning: Senso-ji Temple (Asakusa)\n- Lunch: Tempura at Daikokuya (since 1887)\n- Afternoon: Imperial Palace East Gardens\n- Evening: Izakaya dinner in Shinjuku\n\n**Day 3: Tsukiji & Ginza**\n- Early morning: Tsukiji Outer Market food tour\n- Sushi breakfast at Joyato\n- Afternoon: Ginza shopping & department store food floors\n- Evening: Kaiseki dinner experience\n\n**Day 4: Modern Culture**\n- Morning: Meiji Shrine\n- Afternoon: TeamLab Borderless (book ahead!)\n- Evening: Robot Restaurant show + dinner\n\n### **Days 5-7: Kyoto**\n**Day 5: Travel & Eastern Kyoto**\n- Morning: Shinkansen to Kyoto\n- Afternoon: Kiyomizu-dera Temple\n- Evening: Gion district (geisha spotting)\n- Dinner: Traditional kaiseki in Gion\n\n**Day 6: Golden Pavilion & Arashiyama**\n- Morning: Kinkaku-ji (Golden Pavilion)\n- Lunch: Buddhist vegetarian cuisine (shojin ryori)\n- Afternoon: Arashiyama Bamboo Grove\n- Evening: Pontocho Alley dining\n\n**Day 7: Cultural Immersion**\n- Morning: Tea ceremony experience\n- Afternoon: Fushimi Inari Shrine\n- Evening: Nishiki Market food tour\n\n### **Days 8-9: Osaka**\n**Day 8: Osaka Castle & Dotonbori**\n- Morning: Travel to Osaka, visit Osaka Castle\n- Afternoon: Kuromon Ichiba Market\n- Evening: Dotonbori street food crawl (takoyaki, okonomiyaki)\n\n**Day 9: Day trip to Nara**\n- Morning: Nara Park & Todai-ji Temple\n- Lunch: Traditional Nara cuisine\n- Afternoon: Kasuga Taisha Shrine\n- Evening: Return to Osaka, farewell dinner\n\n**Day 10: Departure**\n- Last-minute shopping in Osaka\n- Depart from Kansai Airport\n\n## 🍜 **Must-Try Foods:**\n- Sushi & sashimi\n- Ramen (different styles in each city)\n- Tempura\n- Kaiseki (multi-course haute cuisine)\n- Street food (takoyaki, taiyaki, imagawayaki)\n- Wagyu beef\n- Matcha and traditional sweets\n\n## 💰 **Budget Tips:**\n- JR Pass for unlimited train travel\n- Convenience store meals are cheap and good\n- Department store restaurant floors (great value)\n- Happy hour at izakayas\n- Free temple visits\n\nWould you like me to elaborate on any part of this itinerary?",
        sender: "ai",
      },
    ],
    [
      { content: "Write a creative story about a magic backpack", sender: "user" },
      {
        content:
          "# The Backpack of Infinite Possibilities\n\nMaya had always been the practical one among her friends. While they dreamed of adventures and magic, she focused on homework and college applications. So when she found the peculiar leather backpack at the thrift store, she bought it simply because it was sturdy and cheap.\n\nThe backpack looked ordinary enough—worn brown leather with brass buckles that had turned green with age. But that night, as Maya packed it for school, something extraordinary happened.\n\nShe reached inside for her calculator and instead pulled out a compass that glowed with soft blue light. The needle didn't point north; it pointed toward her bedroom window, quivering with urgency.\n\n\"What the...?\" Maya whispered, turning the compass in her hands. As she did, words appeared on its face: *\"Adventure awaits those who dare to follow.\"*\n\nCuriosity overcoming caution, Maya grabbed a flashlight and climbed out her window. The compass led her through the sleeping neighborhood, past the park, and into the woods she'd known since childhood. But tonight, the familiar path seemed different—older somehow, as if the trees remembered stories from long ago.\n\nThe compass brought her to a clearing she'd never seen before, where moonlight illuminated a circle of standing stones. As Maya stepped forward, the backpack grew warm against her shoulders.\n\nShe reached inside again and this time pulled out a small glass vial filled with starlight—actual, liquid starlight that swirled and danced in the container. A note was tied around its neck: *\"For lighting the way when all seems dark.\"*\n\nOver the following weeks, Maya discovered the backpack's true nature. It didn't just carry things—it carried possibilities. When her little brother scraped his knee, she found healing salve that worked like magic. When her grandmother felt lonely, Maya pulled out a music box that played her grandfather's favorite song, though he'd been gone for years.\n\nThe backpack seemed to know what was needed before Maya did. During a thunderstorm that knocked out power across town, she found lanterns that never dimmed. When her best friend's cat went missing, she discovered a ball of yarn that unrolled to lead them straight to the frightened kitten.\n\nBut the most amazing discovery came during finals week. Stressed and exhausted, Maya reached into the backpack hoping for coffee or energy bars. Instead, she found a small hourglass filled with golden sand.\n\nThe moment she touched it, time slowed around her. She had all the time she needed to study, to think, to breathe. The world moved like honey while Maya moved normally, finally able to catch up with everything that had been rushing past her.\n\nAs graduation approached, Maya worried the backpack might disappear as mysteriously as it had arrived. But when she reached inside on graduation morning, she found a letter in her own handwriting—though she'd never written it:\n\n*\"Dear Maya,\nMagic isn't about the extraordinary things you find. It's about recognizing that you had the power to help others all along. The backpack was never magic—you were. It just helped you believe in yourself.\nKeep exploring. Keep helping. Keep believing.\nLove, Your Future Self\n\nP.S. - Check the front pocket.\"*\n\nIn the front pocket, Maya found a small brass key and another note: *\"For the next person who needs to believe in magic.\"*\n\nMaya smiled, understanding at last. She would use the backpack through college, helping classmates and strangers alike. And someday, when the time was right, she would leave it in a thrift store for another practical person who needed to discover that the most powerful magic of all was the willingness to help others.\n\nThe backpack of infinite possibilities would continue its journey, carrying not just magical items, but the infinite potential that lives within every kind heart.",
        sender: "ai",
      },
    ],
  ]

  const randomConversation = dummyConversations[Math.floor(Math.random() * dummyConversations.length)]

  return randomConversation.map((msg, index) => ({
    id: `${chatId}-${index}`,
    content: msg.content,
    sender: msg.sender as "user" | "ai",
    timestamp: new Date(Date.now() - (randomConversation.length - index) * 300000).toISOString(), // 5 minutes apart
  }))
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: {},
      isTyping: false,
      searchQuery: "",

      createChatroom: (title: string) => {
        const id = Date.now().toString()
        const newChatroom: Chatroom = {
          id,
          title,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
          messages: { ...state.messages, [id]: [] },
        }))

        return id
      },

      deleteChatroom: (id: string) => {
        set((state) => {
          const newMessages = { ...state.messages }
          delete newMessages[id]

          return {
            chatrooms: state.chatrooms.filter((room) => room.id !== id),
            messages: newMessages,
          }
        })
      },

      renameChatroom: (id: string, newTitle: string) => {
        set((state) => ({
          chatrooms: state.chatrooms.map((room) => (room.id === id ? { ...room, title: newTitle } : room)),
        }))
      },

      addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }

        set((state) => {
          const updatedMessages = {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), newMessage],
          }

          const updatedChatrooms = state.chatrooms.map((room) =>
            room.id === chatId
              ? {
                  ...room,
                  lastMessage: message.content.substring(0, 50) + (message.content.length > 50 ? "..." : ""),
                  lastMessageTime: newMessage.timestamp,
                }
              : room,
          )

          return {
            messages: updatedMessages,
            chatrooms: updatedChatrooms,
          }
        })
      },

      setTyping: (typing: boolean) => set({ isTyping: typing }),

      setSearchQuery: (query: string) => set({ searchQuery: query }),

      getFilteredChatrooms: () => {
        const { chatrooms, searchQuery } = get()
        if (!searchQuery) return chatrooms

        return chatrooms.filter((room) => room.title.toLowerCase().includes(searchQuery.toLowerCase()))
      },

      getChatMessages: (chatId: string, page = 1, limit = 20) => {
        const { messages } = get()
        const chatMessages = messages[chatId] || []
        const startIndex = Math.max(0, chatMessages.length - page * limit)
        const endIndex = chatMessages.length - (page - 1) * limit

        return chatMessages.slice(startIndex, endIndex)
      },

      initializeData: () => {
        // Initialize with sample data if no chatrooms exist
        const { chatrooms } = get()
        if (chatrooms.length === 0) {
          // Create sample chatrooms with dummy messages
          const sampleChatrooms = [
            "Understanding Quantum Computing",
            "Japan Travel Planning",
            "Creative Writing: Magic Backpack",
            "Healthy Meal Prep Ideas",
            "Learning Spanish Basics",
          ]

          sampleChatrooms.forEach((title) => {
            const id = get().createChatroom(title)
            const dummyMessages = generateDummyMessages(id)

            // Add messages to the store
            set((state) => ({
              messages: {
                ...state.messages,
                [id]: dummyMessages,
              },
              chatrooms: state.chatrooms.map((room) =>
                room.id === id
                  ? {
                      ...room,
                      lastMessage: dummyMessages[dummyMessages.length - 1]?.content.substring(0, 50) + "...",
                      lastMessageTime: dummyMessages[dummyMessages.length - 1]?.timestamp,
                    }
                  : room,
              ),
            }))
          })
        }
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        chatrooms: state.chatrooms,
        messages: state.messages,
      }),
    },
  ),
)
