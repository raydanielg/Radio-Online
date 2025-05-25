"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Globe,
  Signal,
  Users,
  Star,
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Wifi,
  Radio,
  Volume2,
  Music,
} from "lucide-react"
import type { ProcessedStation } from "@/types/radio"

interface StationDetailsModalProps {
  station: ProcessedStation | null
  isOpen: boolean
  onClose: () => void
  onPlay: (station: ProcessedStation) => void
  isPlaying: boolean
  isFavorite: boolean
  onToggleFavorite: (stationId: string) => void
}

export function StationDetailsModal({
  station,
  isOpen,
  onClose,
  onPlay,
  isPlaying,
  isFavorite,
  onToggleFavorite,
}: StationDetailsModalProps) {
  if (!station) return null

  const shareStation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: station.name,
          text: `Listen to ${station.name} - ${station.genre}`,
          url: station.homepage || window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(station.homepage || window.location.href)
    }
  }

  const downloadStationInfo = () => {
    const stationData = {
      name: station.name,
      url: station.url,
      genre: station.genre,
      country: station.country,
      language: station.language,
      bitrate: station.bitrate,
      codec: station.codec,
    }

    const blob = new Blob([JSON.stringify(stationData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${station.name.replace(/[^a-z0-9]/gi, "_")}_info.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
              {station.favicon ? (
                <img
                  src={station.favicon || "/placeholder.svg"}
                  alt={station.name}
                  className="w-8 h-8 rounded-lg"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              ) : (
                <Radio className="w-6 h-6 text-white" />
              )}
            </div>
            <span>{station.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onPlay(station)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              onClick={() => onToggleFavorite(station.id)}
              variant={isFavorite ? "destructive" : "outline"}
              className={isFavorite ? "bg-red-500 hover:bg-red-600" : "border-slate-600 text-slate-300"}
            >
              <Heart className="w-4 h-4 mr-2" />
              {isFavorite ? "Remove Favorite" : "Add Favorite"}
            </Button>
            <Button onClick={shareStation} variant="outline" className="border-slate-600 text-slate-300">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={downloadStationInfo} variant="outline" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Download Info
            </Button>
          </div>

          {/* Basic Information */}
          <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Music className="w-5 h-5 mr-2 text-emerald-400" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-slate-300">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Location:</span>
                  <span className="ml-2 font-medium">
                    {station.location}, {station.country}
                  </span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Globe className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Language:</span>
                  <span className="ml-2 font-medium">{station.language}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Volume2 className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Bitrate:</span>
                  <span className="ml-2 font-medium">{station.bitrate || "Unknown"} kbps</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-slate-300">
                  <Wifi className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Codec:</span>
                  <span className="ml-2 font-medium">{station.codec || "Unknown"}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Star className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Votes:</span>
                  <span className="ml-2 font-medium">{station.votes}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Users className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm">Clicks:</span>
                  <span className="ml-2 font-medium">{station.clickcount || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Genres & Tags</h3>
            <div className="flex flex-wrap gap-2">
              {station.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Signal className="w-5 h-5 mr-2 text-emerald-400" />
              Technical Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Stream URL:</span>
                  <span className="text-slate-300 truncate ml-2 max-w-[200px]">{station.url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <Badge className={station.isLive ? "bg-green-500" : "bg-red-500"}>
                    {station.isLive ? "Live" : "Offline"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Checked:</span>
                  <span className="text-slate-300">{new Date(station.lastChecked).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="text-slate-300">
                    {station.geo_lat ? `${station.geo_lat.toFixed(2)}, ${station.geo_long.toFixed(2)}` : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Station ID:</span>
                  <span className="text-slate-300 font-mono text-xs">{station.id.slice(0, 8)}...</span>
                </div>
              </div>
            </div>
          </div>

          {/* External Links */}
          {station.homepage && (
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-3">External Links</h3>
              <Button
                onClick={() => window.open(station.homepage, "_blank")}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Station Website
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
