"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Play,
  Pause,
  Radio,
  Volume2,
  Heart,
  Loader2,
  MapPin,
  Star,
  Moon,
  Sun,
  SkipBack,
  SkipForward,
  Share2,
  Waves,
  Clock,
  Users,
  Music,
  Mic,
  Signal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRadioStations } from "@/hooks/use-radio-stations"
import type { RadioStation, ProcessedStation, RecentlyPlayed } from "@/types/radio"
import { AudioVisualizer } from "@/components/audio-visualizer"

export default function TanzaniaRadioHub() {
  // Core State
  const [searchTerm, setSearchTerm] = useState("")
  const [currentStation, setCurrentStation] = useState<ProcessedStation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Data fetching - Tanzania only
  const { data: rawStations, isLoading, error } = useRadioStations("Tanzania")

  // Categories for Tanzania stations
  const categories = [
    { id: "all", name: "Zote", icon: Radio, color: "from-blue-500 to-purple-500" },
    { id: "music", name: "Muziki", icon: Music, color: "from-pink-500 to-rose-500" },
    { id: "news", name: "Habari", icon: Mic, color: "from-orange-500 to-red-500" },
    { id: "talk", name: "Mazungumzo", icon: Users, color: "from-green-500 to-emerald-500" },
    { id: "local", name: "Mitaa", icon: MapPin, color: "from-teal-500 to-cyan-500" },
  ]

  // Load saved data
  useEffect(() => {
    const savedFavorites = localStorage.getItem("tz-radio-favorites")
    const savedRecent = localStorage.getItem("tz-radio-recent")
    const savedPreferences = localStorage.getItem("tz-radio-preferences")

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedRecent) setRecentlyPlayed(JSON.parse(savedRecent))
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences)
      setVolume([prefs.volume || 75])
      setIsDarkMode(prefs.theme !== "light")
    }
  }, [])

  // Save data
  useEffect(() => {
    localStorage.setItem("tz-radio-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("tz-radio-recent", JSON.stringify(recentlyPlayed))
  }, [recentlyPlayed])

  // Process Tanzania stations
  const stations: ProcessedStation[] = rawStations
    ? rawStations
        .filter((station: RadioStation) => {
          return (
            (station.url_resolved || station.url) &&
            (station.country?.toLowerCase().includes("tanzania") ||
              station.name?.toLowerCase().includes("tanzania") ||
              station.name?.toLowerCase().includes("dar") ||
              station.name?.toLowerCase().includes("dodoma") ||
              station.name?.toLowerCase().includes("mwanza") ||
              station.name?.toLowerCase().includes("arusha"))
          )
        })
        .map((station: RadioStation) => ({
          id: station.stationuuid,
          name: station.name || "Unknown Station",
          url: station.url_resolved || station.url || "",
          genre: station.tags || "General",
          location: station.state || "Tanzania",
          country: "Tanzania",
          language: station.language || "Swahili",
          bitrate: station.bitrate || 0,
          codec: station.codec || "Unknown",
          votes: station.votes || 0,
          favicon: station.favicon || "",
          isLive: station.lastcheckok === 1,
          lastChecked: station.lastcheckoktime || "",
          homepage: station.homepage || "",
          tags: station.tags ? station.tags.split(",").map((tag) => tag.trim()) : [],
          clickcount: station.clickcount || 0,
          geo_lat: station.geo_lat || 0,
          geo_long: station.geo_long || 0,
        }))
        .slice(0, 50)
    : []

  // Filter stations
  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.genre.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === "all" ||
      station.genre.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "talk" &&
        (station.genre.toLowerCase().includes("talk") || station.genre.toLowerCase().includes("news"))) ||
      (activeCategory === "local" && station.location.toLowerCase() !== "tanzania")

    return matchesSearch && matchesCategory
  })

  // Audio functions
  const handlePlay = async (station: ProcessedStation) => {
    try {
      setIsBuffering(true)

      if (currentStation?.id === station.id && isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
        }
        setIsPlaying(false)
        setIsBuffering(false)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      const audio = new Audio()
      audioRef.current = audio

      audio.addEventListener("canplay", () => {
        setIsBuffering(false)
        setIsPlaying(true)
      })
      audio.addEventListener("playing", () => {
        setIsBuffering(false)
        setIsPlaying(true)
      })
      audio.addEventListener("pause", () => setIsPlaying(false))
      audio.addEventListener("error", () => {
        setIsBuffering(false)
        setIsPlaying(false)
        toast({
          title: "Hitilafu ya Redio",
          description: "Imeshindwa kucheza redio hii. Jaribu nyingine.",
          variant: "destructive",
        })
      })

      audio.volume = volume[0] / 100
      audio.crossOrigin = "anonymous"
      audio.src = station.url
      setCurrentStation(station)

      await audio.play()

      // Add to recently played
      const newRecent: RecentlyPlayed = {
        station,
        playedAt: Date.now(),
        duration: 0,
      }
      setRecentlyPlayed((prev) => [newRecent, ...prev.filter((r) => r.station.id !== station.id)].slice(0, 10))

      toast({
        title: "Sasa Unacheza",
        description: `${station.name}`,
      })
    } catch (error) {
      setIsBuffering(false)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const toggleFavorite = (stationId: string) => {
    setFavorites((prev) => (prev.includes(stationId) ? prev.filter((id) => id !== stationId) : [...prev, stationId]))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">Kupakia Redio za Tanzania...</h2>
          <p className="text-purple-200">Tunapata redio zilizo bora zaidi</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"}`}
    >
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1
                  className={`text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}
                >
                  Tanzania Radio
                </h1>
                <p className={`${isDarkMode ? "text-purple-200" : "text-purple-700"} text-lg`}>
                  Redio Bora za Kitanzania
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </Button>

              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <Signal className="w-4 h-4 text-green-400" />
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {filteredStations.length} Stations
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tafuta redio yako..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-14 pr-6 py-4 text-lg ${isDarkMode ? "bg-white/10 border-white/20 text-white placeholder-purple-200" : "bg-white/80 border-purple-200 text-gray-900 placeholder-purple-600"} rounded-2xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : `${isDarkMode ? "bg-white/10 hover:bg-white/20 text-purple-200" : "bg-white/60 hover:bg-white/80 text-purple-700"} backdrop-blur-sm border border-white/20`
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Current Playing Station */}
      {currentStation && (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-purple-900/90 to-pink-900/90 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    {currentStation.favicon ? (
                      <img
                        src={currentStation.favicon || "/placeholder.svg"}
                        alt={currentStation.name}
                        className="w-12 h-12 rounded-lg"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                    ) : (
                      <Radio className="w-8 h-8 text-white" />
                    )}
                  </div>
                  {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{currentStation.name}</h3>
                  <p className="text-purple-200">{currentStation.genre}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-3 h-3 text-purple-300" />
                    <span className="text-sm text-purple-300">{currentStation.location}</span>
                    {currentStation.isLive && <Badge className="bg-red-500 text-white text-xs px-2 py-1">LIVE</Badge>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Volume Control */}
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-white" />
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-24" />
                </div>

                {/* Player Controls */}
                <div className="flex items-center space-x-2">
                  <Button className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => handlePlay(currentStation)}
                    disabled={isBuffering}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                  >
                    {isBuffering ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>

                  <Button className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Additional Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowVisualizer(!showVisualizer)}
                    className={`p-2 rounded-lg ${showVisualizer ? "bg-purple-500" : "bg-white/10 hover:bg-white/20"}`}
                  >
                    <Waves className="w-4 h-4" />
                  </Button>

                  <Button className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Visualizer */}
      {showVisualizer && currentStation && (
        <div className="container mx-auto px-6 py-6">
          <AudioVisualizer audioElement={audioRef.current} isPlaying={isPlaying} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {filteredStations.length}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>Redio Zilizopo</p>
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {favorites.length}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>Redio Unazopenda</p>
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {recentlyPlayed.length}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>
                  Zilizochezwa Hivi Karibuni
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>12.5K</p>
                <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>Wasikilizaji Wa Leo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Station Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station, index) => (
            <div
              key={station.id}
              className={`group ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-white/60 hover:bg-white/80"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
              onClick={() => handlePlay(station)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      {station.favicon ? (
                        <img
                          src={station.favicon || "/placeholder.svg"}
                          alt={station.name}
                          className="w-12 h-12 rounded-lg"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                        />
                      ) : (
                        <Radio className="w-8 h-8 text-white" />
                      )}
                    </div>
                    {station.isLive && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} group-hover:text-purple-400 transition-colors`}
                    >
                      {station.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>{station.genre}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span className={`text-xs ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}>
                        {station.location}
                      </span>
                      {station.votes > 0 && (
                        <>
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400">{station.votes}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(station.id)
                  }}
                  className={`p-2 rounded-lg transition-all ${
                    favorites.includes(station.id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : `${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-purple-100 hover:bg-purple-200"} text-purple-400`
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {station.bitrate > 0 && (
                    <Badge className="bg-purple-500/20 text-purple-300 text-xs">{station.bitrate}kbps</Badge>
                  )}
                  <Badge className="bg-green-500/20 text-green-300 text-xs">{station.codec}</Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlay(station)
                    }}
                    disabled={isBuffering && currentStation?.id === station.id}
                    className={`p-3 rounded-xl transition-all ${
                      currentStation?.id === station.id && isPlaying
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    } text-white shadow-lg`}
                  >
                    {currentStation?.id === station.id && isBuffering ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : currentStation?.id === station.id && isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No stations found */}
        {filteredStations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Radio className="w-12 h-12 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
              Hakuna Redio Zilizopatikana
            </h3>
            <p className={`${isDarkMode ? "text-purple-200" : "text-purple-700"}`}>
              Jaribu kutafuta kwa maneno mengine
            </p>
          </div>
        )}
      </div>

      {/* Recently Played Section */}
      {recentlyPlayed.length > 0 && (
        <div className="container mx-auto px-6 py-8">
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>
            Zilizochezwa Hivi Karibuni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyPlayed.slice(0, 4).map((recent) => (
              <div
                key={recent.station.id}
                className={`${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-white/60 hover:bg-white/80"} backdrop-blur-sm rounded-xl p-4 border ${isDarkMode ? "border-white/10" : "border-white/20"} transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => handlePlay(recent.station)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} truncate`}>
                      {recent.station.name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"} truncate`}>
                      {recent.station.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
