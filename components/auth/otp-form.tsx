"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react"
import { simulateOTPVerification, simulateOTPSend } from "@/lib/utils/otp"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useToast } from "@/hooks/use-toast"

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only digits"),
})

type OTPFormData = z.infer<typeof otpSchema>

interface OTPFormProps {
  phoneData: { phone: string; countryCode: string; otp: string }
  onBack: () => void
}

export default function OTPForm({ phoneData, onBack }: OTPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [currentOTP, setCurrentOTP] = useState(phoneData.otp)
  const { login } = useAuthStore()
  const { toast } = useToast()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  })

  const otpValue = watch("otp") || ""

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Handle OTP input changes
  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6)
      setValue("otp", pastedValue, { shouldValidate: true })

      // Focus the last filled input or the next empty one
      const nextIndex = Math.min(pastedValue.length - 1, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    // Handle single character input
    const newOTP = otpValue.split("")
    newOTP[index] = value
    const updatedOTP = newOTP.join("").slice(0, 6)

    setValue("otp", updatedOTP, { shouldValidate: true })

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit = async (data: OTPFormData) => {
    setIsSubmitting(true)

    try {
      const isValid = await simulateOTPVerification(data.otp, currentOTP)

      if (isValid) {
        const user = {
          id: Date.now().toString(),
          phone: phoneData.phone,
          countryCode: phoneData.countryCode,
          createdAt: new Date().toISOString(),
        }

        login(user)

        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        })
      } else {
        toast({
          title: "Invalid OTP",
          description: "The verification code you entered is incorrect. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)

    try {
      const newOTP = await simulateOTPSend(phoneData.phone, phoneData.countryCode)
      setCurrentOTP(newOTP)
      setCountdown(30)
      setValue("otp", "", { shouldValidate: true })
      inputRefs.current[0]?.focus()

      toast({
        title: "OTP Resent!",
        description: `New verification code sent to ${phoneData.countryCode}${phoneData.phone}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to phone number
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter 6-digit code</label>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpValue[index] || ""}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isSubmitting}
              />
            ))}
          </div>
          {errors.otp && <p className="text-sm text-destructive text-center">{errors.otp.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>

      {/* Resend OTP */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">Resend code in {countdown}s</p>
        ) : (
          <Button type="button" variant="ghost" onClick={handleResendOTP} disabled={isResending} className="text-sm">
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend OTP"
            )}
          </Button>
        )}
      </div>

      {/* Development Helper */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">
            Development: Current OTP is <strong>{currentOTP}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
