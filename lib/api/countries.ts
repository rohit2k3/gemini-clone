export interface Country {
  name: {
    common: string
  }
  idd: {
    root: string
    suffixes: string[]
  }
  flag: string
  cca2: string
}

export interface CountryOption {
  name: string
  code: string
  dialCode: string
  flag: string
}

export async function fetchCountries(): Promise<CountryOption[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flag,cca2")
    const countries: Country[] = await response.json()

    return countries
      .filter((country) => country.idd?.root && country.idd?.suffixes)
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
        dialCode: country.idd.root + (country.idd.suffixes[0] || ""),
        flag: country.flag,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Failed to fetch countries:", error)
    // Fallback data
    return [
      { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
      { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
      { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
      { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
      { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
    ]
  }
}
