export interface Country {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
  cca2: string;
}

export interface CountryOption {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export async function fetchCountries(): Promise<CountryOption[]> {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,idd,flag,cca2"
    );
    const countries: Country[] = await response.json();

    const options: CountryOption[] = countries
      .filter(
        (country) =>
          country.idd?.root &&
          Array.isArray(country.idd.suffixes) &&
          country.idd.suffixes.length === 1 // Only include countries with one suffix
      )
      .map((country) => {
        const dialCode = country.idd.root + country.idd.suffixes[0];
        return {
          name: country.name.common,
          code: country.cca2,
          dialCode,
          flag: country.flag,
        };
      })
      .filter((option) => option.dialCode && option.dialCode.length > 1)
      .sort((a, b) => a.name.localeCompare(b.name));

    // Remove duplicates by dialCode
    const uniqueOptions = options.filter(
      (country, index, self) =>
        index === self.findIndex((c) => c.dialCode === country.dialCode)
    );

    return uniqueOptions;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [
      { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
      { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
      { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
      { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
      { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
    ];
  }
}
