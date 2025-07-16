"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import LoginForm from "./login-form"
import OTPForm from "./otp-form"

export default function AuthPage() {
  const [step, setStep] = useState<"login" | "otp">("login")
  const [phoneData, setPhoneData] = useState<{ phone: string; countryCode: string; otp: string }>({
    phone: "",
    countryCode: "",
    otp: "",
  })
  const { theme, setTheme } = useTheme()

  const handleLoginSuccess = (phone: string, countryCode: string, otp: string) => {
    setPhoneData({ phone, countryCode, otp })
    setStep("otp")
  }

  const handleBackToLogin = () => {
    setStep("login")
    setPhoneData({ phone: "", countryCode: "", otp: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="gemini-logo"></div>
          </div>
          <h1 className="text-display-small gemini-text-gradient mb-2">Gemini</h1>
          <p className="text-body-large text-muted-foreground">A helpful AI assistant</p>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-10 h-10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Auth Card */}
        <Card className="gemini-card border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-headline-large">{step === "login" ? "Sign in" : "Verify your phone"}</CardTitle>
            <CardDescription className="text-body-medium">
              {step === "login"
                ? "Enter your phone number to continue to Gemini"
                : `Enter the 6-digit code sent to ${phoneData.countryCode}${phoneData.phone}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {step === "login" ? (
              <LoginForm onSuccess={handleLoginSuccess} />
            ) : (
              <OTPForm phoneData={phoneData} onBack={handleBackToLogin} />
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-body-medium text-muted-foreground">Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </div>
  )
}
