# 🌟 Gemini Frontend Clone

<div align="center">
  <img src="public/placeholder-logo.svg" alt="Gemini Clone Logo" width="120" height="120">
  
  <h3>A modern, responsive AI chat application inspired by Google Gemini</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
  [![Zustand](https://img.shields.io/badge/Zustand-State%20Management-FF6B6B?style=flat)](https://github.com/pmndrs/zustand)
</div>

---

## ✨ Features

### 🔐 **Authentication System**
- **Phone-based authentication** with OTP verification
- **Multi-country support** with country code selection
- **Persistent login sessions** using local storage
- **Secure logout** with data cleanup

### 💬 **Chat Interface**
- **Real-time messaging** with AI responses
- **Image upload support** for multimodal conversations
- **Typing indicators** for enhanced user experience
- **Message history** with pagination
- **Auto-scroll** to latest messages

### 🎨 **Modern UI/UX**
- **Responsive design** that works on all devices
- **Dark/Light theme** toggle with system preference detection
- **Smooth animations** and transitions
- **Loading states** with skeleton components
- **Mobile-first approach** with optimized touch interactions

### 📱 **Dashboard & Navigation**
- **Sidebar navigation** with chat history
- **Chat creation** and management
- **Search functionality** across all conversations
- **Chat options** (rename, delete) with confirmation dialogs
- **Mobile-responsive sidebar** with overlay

### 🛠️ **Technical Features**
- **TypeScript** for type safety
- **Zustand** for state management with persistence
- **React Hook Form** with Zod validation
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **Custom hooks** for reusable logic

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohit2k3/gemini-clone.git
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
gemini-frontend-clone/
├── 📁 app/                    # Next.js app directory
│   ├── 📁 dashboard/         # Dashboard pages
│   │   ├── 📁 chat/         # Chat pages
│   │   └── layout.tsx       # Dashboard layout
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── 📁 components/            # React components
│   ├── 📁 auth/             # Authentication components
│   ├── 📁 chat/             # Chat-related components
│   ├── 📁 dashboard/        # Dashboard components
│   └── 📁 ui/               # Reusable UI components
├── 📁 hooks/                # Custom React hooks
├── 📁 lib/                  # Utility libraries
│   ├── 📁 api/              # API utilities
│   ├── 📁 config/           # Configuration files
│   ├── 📁 stores/           # Zustand stores
│   └── 📁 utils/            # Helper functions
├── 📁 public/               # Static assets
└── 📁 styles/               # Additional stylesheets
```

---

## 🎯 Key Components

### 🔑 Authentication Flow
```typescript
// Phone-based authentication with OTP
const loginSchema = z.object({
  countryCode: z.string().min(1, "Please select a country"),
  phone: z.string().min(10, "Phone number must be at least 10 digits")
});
```

### 💬 Chat Management
```typescript
// Real-time chat with AI responses
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  image?: string;
}
```

### 🎨 Theme System
```typescript
// Dynamic theme switching
const { theme, setTheme } = useTheme();
<Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  Toggle Theme
</Button>
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Custom blue gradient inspired by Gemini
- **Secondary**: Subtle grays for UI elements
- **Accent**: Purple highlights for interactive elements
- **Muted**: Soft backgrounds and borders

### Typography
- **Display**: Large headings and hero text
- **Headlines**: Section headers and important text
- **Body**: Regular content and descriptions
- **Labels**: Form labels and small text

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, ghost)
- **Forms**: Consistent styling with validation states
- **Navigation**: Responsive sidebar and mobile menu

---

## 📦 Tech Stack

### **Frontend Framework**
- **Next.js 15.2.4** - React framework with App Router
- **React 18.3.1** - UI library with hooks
- **TypeScript 5.0** - Type safety and better DX

### **Styling & UI**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management

### **State Management**
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

---

## 🔧 Configuration

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update `app/layout.tsx` for different font families
- **Themes**: Customize `components/theme-provider.tsx`

---

## 📱 Mobile Responsiveness

- **Breakpoints**: Mobile-first approach with responsive design
- **Touch Interactions**: Optimized for mobile gestures
- **Sidebar**: Collapsible on mobile with overlay
- **Forms**: Touch-friendly input fields
- **Navigation**: Mobile-optimized menu system

---

## 🔒 Security Features

- **Input Validation**: Zod schemas for all user inputs
- **XSS Protection**: Sanitized content rendering
- **CSRF Protection**: Built-in Next.js protections
- **Data Persistence**: Secure local storage handling

---

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized imports
- **Caching**: Persistent state management
- **Lazy Loading**: Components loaded on demand

---



## 🙏 Acknowledgments

- **Google Gemini** - Design inspiration
- **Vercel** - Hosting and deployment
- **Radix UI** - Accessible components
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/rohit2k3">Rohit</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
