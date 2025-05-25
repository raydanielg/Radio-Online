import { useQuery } from "@tanstack/react-query"
import type { RadioStation } from "@/types/radio"

const COUNTRIES = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "Burundi",
  "South Africa",
  "Nigeria",
  "Ghana",
  "Egypt",
  "Morocco",
  "Ethiopia",
  "Zimbabwe",
  "Botswana",
  "Zambia",
  "Malawi",
  "Mozambique",
  "Madagascar",
  "Mauritius",
]

const fetchRadioStations = async (country = "Tanzania"): Promise<RadioStation[]> => {
  try {
    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${country}`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AfricanRadioPlayer/2.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch radio stations: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching radio stations:", error)
    throw error
  }
}

export const useRadioStations = (country = "Tanzania") => {
  return useQuery({
    queryKey: ["radio-stations", country],
    queryFn: () => fetchRadioStations(country),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  })
}

export const useMultipleCountries = () => {
  return useQuery({
    queryKey: ["radio-stations-multiple"],
    queryFn: async () => {
      const promises = COUNTRIES.map((country) => fetchRadioStations(country))
      const results = await Promise.allSettled(promises)
      return results
        .filter((result): result is PromiseFulfilledResult<RadioStation[]> => result.status === "fulfilled")
        .flatMap((result) => result.value)
    },
    retry: 2,
    staleTime: 10 * 60 * 1000,
  })
}
