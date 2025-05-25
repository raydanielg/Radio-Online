"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Globe, MapPin, Clock, Radio, Headphones, Activity } from "lucide-react"

interface ListenerStatsProps {
  isDarkMode: boolean
  currentStation?: any
}

export function ListenerStats({ isDarkMode, currentStation }: ListenerStatsProps) {
  const [stats, setStats] = useState({
    totalListeners: 0,
    currentStationListeners: 0,
    peakListeners: 0,
    countriesListening: 0,
    averageListenTime: 0,
    topCountries: [] as { country: string; listeners: number }[],
    hourlyStats: [] as { hour: number; listeners: number }[],
  })

  // Simulate real-time listener data
  useEffect(() => {
    const updateStats = () => {
      const baseListeners = 15000 + Math.floor(Math.random() * 5000)
      const currentListeners = currentStation ? 500 + Math.floor(Math.random() * 1500) : 0

      setStats({
        totalListeners: baseListeners,
        currentStationListeners: currentListeners,
        peakListeners: 25000 + Math.floor(Math.random() * 5000),
        countriesListening: 45 + Math.floor(Math.random() * 15),
        averageListenTime: 25 + Math.floor(Math.random() * 20),
        topCountries: [
          { country: "Tanzania", listeners: 3500 + Math.floor(Math.random() * 1000) },
          { country: "Kenya", listeners: 2800 + Math.floor(Math.random() * 800) },
          { country: "Uganda", listeners: 2200 + Math.floor(Math.random() * 600) },
          { country: "Nigeria", listeners: 1900 + Math.floor(Math.random() * 500) },
          { country: "South Africa", listeners: 1600 + Math.floor(Math.random() * 400) },
        ],
        hourlyStats: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          listeners: 1000 + Math.floor(Math.random() * 2000),
        })),
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [currentStation])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Live Listener Statistics
        </h2>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Real-time data from Radio Hub Africa network
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Total Listeners</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.totalListeners.toLocaleString()}</div>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Across all stations</p>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Radio className="w-4 h-4 text-emerald-500" />
              <span>Current Station</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{stats.currentStationListeners.toLocaleString()}</div>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {currentStation?.name || "No station playing"}
            </p>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>Peak Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.peakListeners.toLocaleString()}</div>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Highest concurrent</p>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Globe className="w-4 h-4 text-purple-500" />
              <span>Countries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.countriesListening}</div>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Currently listening</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Countries */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span>Top Listening Countries</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.topCountries.map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-500 text-white"
                        : index === 1
                          ? "bg-gray-400 text-white"
                          : index === 2
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{country.listeners.toLocaleString()}</Badge>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-green-500" />
              <span>Avg. Listen Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">{stats.averageListenTime} min</div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Headphones className="w-4 h-4 text-pink-500" />
              <span>Active Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-pink-500">
              {Math.floor(stats.totalListeners * 0.85).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Activity className="w-4 h-4 text-red-500" />
              <span>Network Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Live Updates Indicator */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Live updates every 30 seconds</span>
      </div>
    </div>
  )
}
