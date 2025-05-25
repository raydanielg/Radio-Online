"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Play,
  Pause,
  Radio,
  Mic,
  MicOff,
  Volume2,
  Heart,
  Loader2,
  MapPin,
  Star,
  Moon,
  Sun,
  Globe,
  List,
  Grid,
  Info,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRadioStations, useMultipleCountries } from "@/hooks/use-radio-stations"
import type { RadioStation, ProcessedStation, StationCategory, RecentlyPlayed, Playlist } from "@/types/radio"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ListenerStats } from "@/components/listener-stats"
import { AboutPage } from "@/components/about-page"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { TermsOfService } from "@/components/terms-of-service"

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

const CATEGORIES: StationCategory[] = [
  { id: "all", name: "All Stations", icon: "Radio", count: 0, color: "from-emerald-500 to-teal-500" },
  { id: "news", name: "News & Talk", icon: "Mic", count: 0, color: "from-blue-500 to-indigo-500" },
  { id: "music", name: "Music", icon: "Music", count: 0, color: "from-purple-500 to-pink-500" },
  { id: "sports", name: "Sports", icon: "Target", count: 0, color: "from-orange-500 to-red-500" },
  { id: "religious", name: "Religious", icon: "Heart", count: 0, color: "from-yellow-500 to-orange-500" },
  { id: "educational", name: "Educational", icon: "Book", count: 0, color: "from-green-500 to-emerald-500" },
  { id: "entertainment", name: "Entertainment", icon: "Star", count: 0, color: "from-pink-500 to-rose-500" },
  { id: "local", name: "Local", icon: "MapPin", count: 0, color: "from-teal-500 to-cyan-500" },
]

export default function RadioHub() {
  // Core State
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("Tanzania")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentStation, setCurrentStation] = useState<ProcessedStation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState([75])
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[]>([])
  const [offlineStations, setOfflineStations] = useState<ProcessedStation[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  // UI State
  const [isSearching, setIsSearching] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isBuffering, setIsBuffering] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState<"name" | "votes" | "bitrate" | "recent">("votes")
  const [filterBy, setFilterBy] = useState<"all" | "live" | "favorites">("all")
  const [showDetails, setShowDetails] = useState(false)
  const [selectedStation, setSelectedStation] = useState<ProcessedStation | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showEqualizer, setShowEqualizer] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const [showVisualization, setShowVisualization] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [crossfade, setCrossfade] = useState(false)
  const [sleepTimer, setSleepTimer] = useState(0)
  const [notifications, setNotifications] = useState(true)
  const [showStats, setShowStats] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(true)
  const [showTrending, setShowTrending] = useState(true)
  const [showNearby, setShowNearby] = useState(false)
  const [showOffline, setShowOffline] = useState(false)
  const [showPlaylists, setShowPlaylists] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showBackup, setShowBackup] = useState(false)
  const [showRestore, setShowRestore] = useState(false)
  const [showSync, setShowSync] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showPerformance, setShowPerformance] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showLicense, setShowLicense] = useState(false)
  const [showCredits, setShowCredits] = useState(false)
  const [showChangelog, setShowChangelog] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showBeta, setShowBeta] = useState(false)
  const [showExperimental, setShowExperimental] = useState(false)
  const [showDeveloper, setShowDeveloper] = useState(false)
  const [showAPI, setShowAPI] = useState(false)
  const [showSDK, setShowSDK] = useState(false)
  const [showDocs, setShowDocs] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [showNews, setShowNews] = useState(false)
  const [showUpdates, setShowUpdates] = useState(false)
  const [showMaintenance, setShowMaintenance] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [showHealth, setShowHealth] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showMonitoring, setShowMonitoring] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showForum, setShowForum] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showSocial, setShowSocial] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [showSubscription, setShowSubscription] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [showDowngrade, setShowDowngrade] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [showRefund, setShowRefund] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showBank, setShowBank] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [showCrypto, setShowCrypto] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showPromo, setShowPromo] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)
  const [showOffer, setShowOffer] = useState(false)
  const [showDeal, setShowDeal] = useState(false)
  const [showSale, setShowSale] = useState(false)
  const [showSpecial, setShowSpecial] = useState(false)
  const [showLimited, setShowLimited] = useState(false)
  const [showExclusive, setShowExclusive] = useState(false)
  const [showVIP, setShowVIP] = useState(false)
  const [showMember, setShowMember] = useState(false)
  const [showPublic, setShowPublic] = useState(false)
  const [showPrivate, setShowPrivate] = useState(false)
  const [showHidden, setShowHidden] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [showTrash, setShowTrash] = useState(false)
  const [showRecycle, setShowRecycle] = useState(false)
  const [showRecover, setShowRecover] = useState(false)
  const [showPurge, setShowPurge] = useState(false)
  const [showClean, setShowClean] = useState(false)
  const [showOptimize, setShowOptimize] = useState(false)
  const [showCompress, setShowCompress] = useState(false)
  const [showDecompress, setShowDecompress] = useState(false)
  const [showEncrypt, setShowEncrypt] = useState(false)
  const [showDecrypt, setShowDecrypt] = useState(false)
  const [showHash, setShowHash] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [showSign, setShowSign] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [showSession, setShowSession] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showActivation, setShowActivation] = useState(false)
  const [showDeactivation, setShowDeactivation] = useState(false)
  const [showSuspension, setShowSuspension] = useState(false)
  const [showBan, setShowBan] = useState(false)
  const [showUnban, setShowUnban] = useState(false)
  const [showMute, setShowMute] = useState(false)
  const [showUnmute, setShowUnmute] = useState(false)
  const [showBlock, setShowBlock] = useState(false)
  const [showUnblock, setShowUnblock] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showFlag, setShowFlag] = useState(false)
  const [showModerate, setShowModerate] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showModerator, setShowModerator] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showGuest, setShowGuest] = useState(false)

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { toast } = useToast()

  // Data fetching
  const { data: rawStations, isLoading, error } = useRadioStations(selectedCountry)
  const { data: allCountriesStations } = useMultipleCountries()

  const [activeTab, setActiveTab] = useState("stations")
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentListeners, setCurrentListeners] = useState(15847)

  // Load data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("radio-favorites")
    const savedRecent = localStorage.getItem("radio-recent")
    const savedOffline = localStorage.getItem("radio-offline")
    const savedPlaylists = localStorage.getItem("radio-playlists")
    const savedPreferences = localStorage.getItem("radio-preferences")

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedRecent) setRecentlyPlayed(JSON.parse(savedRecent))
    if (savedOffline) setOfflineStations(JSON.parse(savedOffline))
    if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists))
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences)
      setVolume([prefs.volume || 75])
      setIsDarkMode(prefs.theme !== "light")
      setAutoPlay(prefs.autoPlay || false)
      setNotifications(prefs.notifications !== false)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("radio-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("radio-recent", JSON.stringify(recentlyPlayed))
  }, [recentlyPlayed])

  useEffect(() => {
    localStorage.setItem("radio-offline", JSON.stringify(offlineStations))
  }, [offlineStations])

  useEffect(() => {
    localStorage.setItem("radio-playlists", JSON.stringify(playlists))
  }, [playlists])

  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Simulate listener count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentListeners((prev) => prev + Math.floor(Math.random() * 20) - 10)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Process stations data
  const stations: ProcessedStation[] = rawStations
    ? rawStations
        .filter((station: RadioStation) => station.lastcheckok === 1 && station.url_resolved)
        .map((station: RadioStation) => ({
          id: station.stationuuid,
          name: station.name || "Unknown Station",
          url: station.url_resolved || station.url,
          genre: station.tags || "General",
          location: `${station.state || "Tanzania"}`,
          country: station.country || "Tanzania",
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
        .slice(0, 100)
    : []

  // Filter and sort stations
  const filteredStations = stations
    .filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || station.genre.toLowerCase().includes(selectedCategory.toLowerCase())

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "live" && station.isLive) ||
        (filterBy === "favorites" && favorites.includes(station.id))

      return matchesSearch && matchesCategory && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "votes":
          return b.votes - a.votes
        case "bitrate":
          return b.bitrate - a.bitrate
        case "recent":
          const aRecent = recentlyPlayed.find((r) => r.station.id === a.id)?.playedAt || 0
          const bRecent = recentlyPlayed.find((r) => r.station.id === b.id)?.playedAt || 0
          return bRecent - aRecent
        default:
          return 0
      }
    })

  // Audio functions
  const handlePlay = async (station: ProcessedStation) => {
    try {
      setAudioError(null)
      setIsBuffering(true)

      if (currentStation?.id === station.id && isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
        }
        setIsPlaying(false)
        setCurrentStation(null)
        setIsBuffering(false)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      const audio = new Audio()
      audioRef.current = audio

      audio.addEventListener("loadstart", () => setIsBuffering(true))
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
        setAudioError("Imeshindwa kucheza redio hii. Jaribu nyingine.")
        setIsPlaying(false)
        setIsBuffering(false)
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

      try {
        await audio.play()

        // Add to recently played
        const newRecent: RecentlyPlayed = {
          station,
          playedAt: Date.now(),
          duration: 0,
        }
        setRecentlyPlayed((prev) => [newRecent, ...prev.filter((r) => r.station.id !== station.id)].slice(0, 50))

        toast({
          title: "Redio Imechezwa",
          description: `Sasa unacheza ${station.name}`,
        })
      } catch (playError) {
        setAudioError("Imeshindwa kucheza redio hii.")
        setIsPlaying(false)
        setIsBuffering(false)
      }
    } catch (error) {
      setAudioError("Hitilafu imetokea wakati wa kucheza redio.")
      setIsPlaying(false)
      setIsBuffering(false)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const toggleRecording = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        const chunks: BlobPart[] = []
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data)
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `radio-recording-${Date.now()}.wav`
          a.click()
          URL.revokeObjectURL(url)
        }

        mediaRecorder.start()
        setIsRecording(true)
        toast({
          title: "Kurekodi Kumeanza",
          description: "Redio inarekodi sasa...",
        })
      } else {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop()
          mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
        }
        setIsRecording(false)
        toast({
          title: "Kurekodi Kumekwisha",
          description: "Rekodi imehifadhiwa kwenye kompyuta yako.",
        })
      }
    } catch (error) {
      toast({
        title: "Hitilafu ya Kurekodi",
        description: "Imeshindwa kurekodi. Hakikisha umeidhinisha microphone.",
        variant: "destructive",
      })
    }
  }

  const toggleFavorite = (stationId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(stationId) ? prev.filter((id) => id !== stationId) : [...prev, stationId]

      // Add to offline if favorited
      if (!prev.includes(stationId)) {
        const station = stations.find((s) => s.id === stationId)
        if (station) {
          setOfflineStations((prevOffline) => [...prevOffline, station])
        }
      }

      return newFavorites
    })
  }

  const handleVoiceSearch = async () => {
    try {
      setIsSearching(true)
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.lang = "sw-TZ"
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setSearchTerm(transcript)
          setIsSearching(false)
        }

        recognition.onerror = () => {
          setIsSearching(false)
          toast({
            title: "Hitilafu ya Sauti",
            description: "Imeshindwa kusikia sauti yako. Jaribu tena.",
            variant: "destructive",
          })
        }

        recognition.start()
      } else {
        setIsSearching(false)
        toast({
          title: "Kutambua Sauti Hakutumiki",
          description: "Kivinjari chako hakitumii kutambua sauti.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setIsSearching(false)
    }
  }

  const showStationDetails = (station: ProcessedStation) => {
    setSelectedStation(station)
    setShowDetails(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Kupakia Redio za {selectedCountry}...</h2>
          <p className="text-emerald-200">Tunapata redio zilizo karibu nawe</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hitilafu ya Mtandao</h2>
          <p className="text-red-200">Imeshindwa kupata redio. Jaribu tena baadaye.</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"}`}
    >
      {/* Header */}
      <div
        className={`${isDarkMode ? "bg-white/5" : "bg-black/5"} backdrop-blur-md border-b ${isDarkMode ? "border-white/10" : "border-black/10"} sticky top-0 z-20`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Radio Hub Africa
                </h1>
                <p className={`${isDarkMode ? "text-emerald-200" : "text-emerald-700"}`}>
                  Redio za Afrika zilizo karibu nawe
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <div
                className={`flex items-center space-x-2 ${isDarkMode ? "text-white bg-white/10" : "text-gray-900 bg-black/10"} px-4 py-2 rounded-full`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="border-none bg-transparent text-sm font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-emerald-300" : "text-emerald-600"} w-5 h-5`}
              />
              <Input
                type="text"
                placeholder="Tafuta redio kwa jina au genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 pr-16 py-3 ${isDarkMode ? "bg-white/10 border-white/20 text-white placeholder-emerald-200" : "bg-black/10 border-black/20 text-gray-900 placeholder-emerald-600"} rounded-2xl backdrop-blur-sm focus:${isDarkMode ? "bg-white/15" : "bg-black/15"}`}
              />
              <Button
                onClick={handleVoiceSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger
                  className={`w-40 ${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-black/10 border-black/20 text-gray-900"}`}
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="votes">Most Popular</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="bitrate">Quality</SelectItem>
                  <SelectItem value="recent">Recently Played</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
                <SelectTrigger
                  className={`w-40 ${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-black/10 border-black/20 text-gray-900"}`}
                >
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stations</SelectItem>
                  <SelectItem value="live">Live Only</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "default" : "outline"}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className={`grid w-full grid-cols-4 lg:grid-cols-8 ${isDarkMode ? "bg-white/10" : "bg-black/10"}`}>
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Current Playing Station */}
      {currentStation && (
        <div
          className={`${isDarkMode ? "bg-gradient-to-r from-emerald-800/80 to-teal-800/80" : "bg-gradient-to-r from-emerald-200/80 to-teal-200/80"} backdrop-blur-md border-b ${isDarkMode ? "border-white/10" : "border-black/10"} sticky top-[140px] z-10`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                  {currentStation.favicon ? (
                    <img
                      src={currentStation.favicon || "/placeholder.svg"}
                      alt={currentStation.name}
                      className="w-8 h-8 rounded-lg"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  ) : (
                    <Radio className="w-6 h-6 text-white" />
                  )}
                  {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className={`${isDarkMode ? "text-white" : "text-gray-900"} font-semibold`}>
                    {currentStation.name}
                  </h3>
                  <p className={`${isDarkMode ? "text-emerald-200" : "text-emerald-700"} text-sm`}>
                    {currentStation.genre}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Volume2 className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-gray-900"}`} />
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
                </div>
                <Button
                  onClick={toggleRecording}
                  disabled={!isPlaying}
                  className={`p-2 rounded-xl ${
                    isRecording
                      ? "bg-red-500 animate-pulse"
                      : `${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}`
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => showStationDetails(currentStation)}
                  className={`p-2 rounded-xl ${isDarkMode ? "bg-white/20 hover:bg-white/30" : "bg-black/20 hover:bg-black/30"}`}
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handlePlay(currentStation)}
                  disabled={isBuffering}
                  className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl"
                >
                  {isBuffering ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pb-24">
        {activeTab === "stations" && (
          <Tabs defaultValue="stations" className="space-y-6">
            <TabsList className={`${isDarkMode ? "bg-white/10" : "bg-black/10"}`}>
              <TabsTrigger value="stations">Stations ({filteredStations.length})</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New Stations</TabsTrigger>
            </TabsList>

            <TabsContent value="stations">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                  Redio za {selectedCountry}
                </h2>
                <p className={`${isDarkMode ? "text-emerald-200" : "text-emerald-700"}`}>
                  Zimeonekana redio {filteredStations.length}
                </p>
              </div>

              {/* Audio Visualizer */}
              {showVisualizer && currentStation && (
                <div className="mb-6">
                  <AudioVisualizer audioElement={audioRef.current} isPlaying={isPlaying} isDarkMode={isDarkMode} />
                </div>
              )}

              {/* Station List/Grid - keeping existing implementation */}
              {viewMode === "list" ? (
                <div className="space-y-4">
                  {filteredStations.map((station, index) => (
                    <div
                      key={station.id}
                      className={`group ${isDarkMode ? "bg-white/5" : "bg-black/5"} backdrop-blur-sm border ${isDarkMode ? "border-white/10" : "border-black/10"} rounded-2xl p-4 hover:${isDarkMode ? "bg-white/10" : "bg-black/10"} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                    >
                      {/* Keep existing station card content */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="relative w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                            {station.favicon ? (
                              <img
                                src={station.favicon || "/placeholder.svg"}
                                alt={station.name}
                                className="w-10 h-10 rounded-lg"
                                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                              />
                            ) : (
                              <Radio className="w-8 h-8 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} truncate`}
                            >
                              {station.name}
                            </h3>
                            <div
                              className={`flex items-center space-x-4 text-sm ${isDarkMode ? "text-emerald-200" : "text-emerald-700"}`}
                            >
                              <span>{station.genre}</span>
                              {station.bitrate > 0 && <span>{station.bitrate}kbps</span>}
                              <span>{station.language}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-3 h-3 text-emerald-400" />
                              <span className={`text-xs ${isDarkMode ? "text-emerald-300" : "text-emerald-600"}`}>
                                {station.location}
                              </span>
                              {station.votes > 0 && (
                                <>
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span className="text-xs text-yellow-300">{station.votes}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {station.isLive && (
                            <div className="flex items-center space-x-1 bg-red-500/20 px-2 py-1 rounded-full">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-red-300 font-medium">LIVE</span>
                            </div>
                          )}
                          <Button
                            onClick={() => showStationDetails(station)}
                            className={`p-2 rounded-xl ${isDarkMode ? "bg-white/10 text-emerald-300 hover:bg-white/20" : "bg-black/10 text-emerald-600 hover:bg-black/20"}`}
                          >
                            <Info className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => toggleFavorite(station.id)}
                            className={`p-2 rounded-xl transition-colors ${
                              favorites.includes(station.id)
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : `${isDarkMode ? "bg-white/10 text-emerald-300 hover:bg-white/20" : "bg-black/10 text-emerald-600 hover:bg-black/20"}`
                            }`}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handlePlay(station)}
                            disabled={isBuffering && currentStation?.id === station.id}
                            className={`px-6 py-2 rounded-xl font-medium transition-all ${
                              currentStation?.id === station.id && isPlaying
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-105"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {currentStation?.id === station.id && isBuffering ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : currentStation?.id === station.id && isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                              <span className="hidden sm:inline">
                                {currentStation?.id === station.id && isBuffering
                                  ? "Kupakia..."
                                  : currentStation?.id === station.id && isPlaying
                                    ? "Simamisha"
                                    : "Cheza"}
                              </span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Keep existing grid view implementation */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Grid items implementation stays the same */}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {activeTab === "search" && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Search Stations</h2>
            {/* Search results would go here */}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Your Favorites</h2>
            {/* Favorites list implementation */}
          </div>
        )}

        {activeTab === "recent" && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recently Played</h2>
            {/* Recent stations implementation */}
          </div>
        )}

        {activeTab === "visualizer" && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Audio Visualizer</h2>
            <AudioVisualizer audioElement={audioRef.current} isPlaying={isPlaying} isDarkMode={isDarkMode} />
          </div>
        )}

        {activeTab === "listeners" && <ListenerStats isDarkMode={isDarkMode} currentStation={currentStation} />}

        {activeTab === "about" && <AboutPage isDarkMode={isDarkMode} />}

        {activeTab === "privacy" && <PrivacyPolicy isDarkMode={isDarkMode} />}

        {activeTab === "terms" && <TermsOfService isDarkMode={isDarkMode} />}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        isOnline={isOnline}
        currentListeners={currentListeners}
      />

      {/* Floating Visualizer Toggle */}
      {currentStation && (
        <Button
          onClick={() => setShowVisualizer(!showVisualizer)}
          className={`fixed top-1/2 right-4 z-30 p-3 rounded-full ${showVisualizer ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"} text-white shadow-lg`}
        >
          <Activity className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
