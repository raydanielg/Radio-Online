"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  Search,
  Heart,
  Clock,
  Download,
  Settings,
  Menu,
  X,
  Radio,
  Users,
  Info,
  Shield,
  FileText,
  HelpCircle,
  Headphones,
  Wifi,
  WifiOff,
} from "lucide-react"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isDarkMode: boolean
  isOnline: boolean
  currentListeners: number
}

export function MobileNavigation({
  activeTab,
  onTabChange,
  isDarkMode,
  isOnline,
  currentListeners,
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mainTabs = [
    { id: "stations", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "menu", label: "Menu", icon: Menu },
  ]

  const menuItems = [
    { id: "offline", label: "Offline", icon: Download },
    { id: "visualizer", label: "Visualizer", icon: Radio },
    { id: "listeners", label: "Listeners", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "about", label: "About Us", icon: Info },
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "terms", label: "Terms of Service", icon: FileText },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  const handleTabClick = (tabId: string) => {
    if (tabId === "menu") {
      setIsMenuOpen(!isMenuOpen)
    } else {
      onTabChange(tabId)
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 ${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-md border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
          {mainTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id || (tab.id === "menu" && isMenuOpen)

            return (
              <Button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                  isActive
                    ? "text-emerald-500"
                    : isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-500" : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>}
              </Button>
            )
          })}
        </div>

        {/* Status Bar */}
        <div
          className={`flex items-center justify-between px-4 py-1 text-xs ${isDarkMode ? "bg-gray-800/50 text-gray-400" : "bg-gray-100/50 text-gray-600"}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {isOnline ? <Wifi className="w-3 h-3 text-green-500" /> : <WifiOff className="w-3 h-3 text-red-500" />}
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-blue-500" />
              <span>{currentListeners.toLocaleString()} listening</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Headphones className="w-3 h-3 text-purple-500" />
            <span>Radio Hub Africa</span>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div
            className={`absolute right-0 top-0 h-full w-80 ${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-xl transform transition-transform duration-300`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Menu</h2>
              <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="sm" className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    variant="ghost"
                    className={`w-full justify-start space-x-3 p-3 h-auto ${
                      activeTab === item.id
                        ? "bg-emerald-500/10 text-emerald-500"
                        : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* App Info */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"}`}
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Radio className="w-5 h-5 text-emerald-500" />
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Radio Hub Africa
                  </span>
                </div>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Version 2.0.0 • Made with ❤️ in Africa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
