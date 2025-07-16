"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Phone } from "lucide-react"
import { fetchCountries, type CountryOption } from "@/lib/api/countries"
import { simulateOTPSend } from "@/lib/utils/otp"
import { useToast } from "@/hooks/use-toast"


const loginSchema = z.object({
  countryCode: z.string().min(1, "Please select a country"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess: (phone: string, countryCode: string, otp: string) => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const selectedCountryCode = watch("countryCode")

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryData = await fetchCountries()
        setCountries(countryData)
        const defaultCountry = countryData.find((c) => c.code === "IN") || countryData[0]
        if (defaultCountry) {
          setValue("countryCode", defaultCountry.dialCode)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load countries. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingCountries(false)
      }
    }

    loadCountries()
  }, [setValue, toast])

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)

    try {
      toast({
        title: "Sending OTP",
        description: "Please wait while we send the verification code...",
      })

      const otp = await simulateOTPSend(data.phone, data.countryCode)

      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${data.countryCode}${data.phone} currently set to ${otp}.`,
      })

      onSuccess(data.phone, data.countryCode, otp)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCountry = countries.find((c) => c.dialCode === selectedCountryCode)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Country Code Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Select
          value={selectedCountryCode}
          key={selectedCountryCode}
          onValueChange={(value) => setValue("countryCode", value, { shouldValidate: true })}
          disabled={isLoadingCountries}
        >
          <SelectTrigger className="w-full ">
            <SelectValue key={selectedCountryCode} placeholder={isLoadingCountries ? "Loading countries..." : "Select country"}>
              {selectedCountry && (
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                  <span className="text-muted-foreground">({selectedCountry.dialCode})</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-primary-foreground">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.dialCode}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-muted-foreground">({country.dialCode})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.countryCode && <p className="text-sm text-destructive">{errors.countryCode.message}</p>}
      </div>

      {/* Phone Number Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            {...register("phone")}
            type="tel"
            placeholder="Enter your phone number"
            className="pl-10"
            disabled={isSubmitting}
          />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={!isValid || isSubmitting || isLoadingCountries}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending OTP...
          </>
        ) : (
          "Send OTP"
        )}
      </Button>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground text-center">
        We'll send you a verification code to confirm your phone number
      </p>
    </form>
  )
}
