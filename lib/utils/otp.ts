export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function simulateOTPSend(phone: string, countryCode: string): Promise<string> {
  return new Promise((resolve) => {
    const otp = generateOTP()
    console.log(`OTP sent to ${countryCode}${phone}: ${otp}`)

    setTimeout(() => {
      resolve(otp)
    }, 2000) // Simulate network delay
  })
}

export function simulateOTPVerification(inputOTP: string, actualOTP: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inputOTP === actualOTP)
    }, 1500) // Simulate verification delay
  })
}
