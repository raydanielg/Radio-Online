"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [spatialAudio, setSpatialAudio] = useState(false)
  const [bassBoost, setBassBoost] = useState(0)
  const [trebleBoost, setTrebleBoost] = useState(0)
  const [noiseReduction, setNoiseReduction] = useState(false)
  const [autoGainControl, setAutoGainControl] = useState(false)
  const [sleepTimer, setSleepTimer] = useState<number | null>(null)
  const [alarmTime, setAlarmTime] = useState("06:00")
  const [voiceCommands, setVoiceCommands] = useState(false)
  const [gestureControls, setGestureControls] = useState(false)
  const [carMode, setCarMode] = useState(false)
  const [socialSharing, setSocialSharing] = useState(false)
  const [friendsActivity, setFriendsActivity] = useState(false)
  const [liveChat, setLiveChat] = useState(false)
  const [badgesEarned, setBadgesEarned] = useState(["early-adopter", "music-lover"])
  const [listeningStreak, setListeningStreak] = useState(7)
  const [totalListeningTime, setTotalListeningTime] = useState(3600)
  const [stationsDiscovered, setStationsDiscovered] = useState(25)
  const [countriesExplored, setCountriesExplored] = useState(["USA", "Canada", "UK"])
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [fontSizePreference, setFontSizePreference] = useState("medium")
  const [magnification, setMagnification] = useState(1)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)
  const [voiceNavigation, setVoiceNavigation] = useState(false)
  const [simplifiedInterface, setSimplifiedInterface] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [audioDescriptions, setAudioDescriptions] = useState(false)
  const [highQualityStreaming, setHighQualityStreaming] = useState(true)
  const [adFreeExperience, setAdFreeExperience] = useState(true)
  const [unlimitedSkips, setUnlimitedSkips] = useState(true)
  const [exclusiveContent, setExclusiveContent] = useState(true)
  const [customThemes, setCustomThemes] = useState(["dark", "retro"])
  const [premiumFeatures, setPremiumFeatures] = useState(true)
  const [prioritySupport, setPrioritySupport] = useState(true)
  const [earlyAccess, setEarlyAccess] = useState(true)
  const [betaTesting, setBetaTesting] = useState(true)
  const [batteryOptimization, setBatteryOptimization] = useState(true)
  const [networkPriority, setNetworkPriority] = useState("auto")
  const [compressionLevel, setCompressionLevel] = useState("medium")
  const [debugMode, setDebugMode] = useState(false)
  const [apiAccess, setApiAccess] = useState(false)
  const [performanceMonitoring, setPerformanceMonitoring] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const setSleepTimerFunction = (minutes: number) => {
    setSleepTimer(minutes)
    setTimeout(
      () => {
        alert("Sleep timer finished!")
        setSleepTimer(null)
      },
      minutes * 60 * 1000,
    )
  }

  const setAlarmFunction = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const now = new Date()
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0)

    if (alarm <= now) {
      alarm.setDate(alarm.getDate() + 1)
    }

    const timeToAlarm = alarm.getTime() - now.getTime()

    setTimeout(() => {
      alert("Wake up!")
    }, timeToAlarm)
  }

  const enableCarMode = () => {
    setCarMode(true)
    alert("Car mode enabled! Some features may be limited for safety.")
  }

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col`}
    >
      <header className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Music App</h1>
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? "Light Mode" : "Dark Mode"}</Button>
      </header>

      <main className="container mx-auto p-6 flex-grow">
        <p>Welcome to the music app! Explore the features below.</p>
      </main>

      {/* Advanced Features Panel */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audio Enhancement Features */}
          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              🎵 Audio Enhancement
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Spatial Audio</span>
                <Button
                  onClick={() => setSpatialAudio(!spatialAudio)}
                  className={`p-2 rounded-lg ${spatialAudio ? "bg-purple-500" : "bg-gray-500"}`}
                >
                  {spatialAudio ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Bass Boost</span>
                <Slider
                  value={[bassBoost]}
                  onValueChange={(value) => setBassBoost(value[0])}
                  max={10}
                  min={-10}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Treble Boost</span>
                <Slider
                  value={[trebleBoost]}
                  onValueChange={(value) => setTrebleBoost(value[0])}
                  max={10}
                  min={-10}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Noise Reduction</span>
                <Button
                  onClick={() => setNoiseReduction(!noiseReduction)}
                  className={`p-2 rounded-lg ${noiseReduction ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {noiseReduction ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Auto Gain Control</span>
                <Button
                  onClick={() => setAutoGainControl(!autoGainControl)}
                  className={`p-2 rounded-lg ${autoGainControl ? "bg-blue-500" : "bg-gray-500"}`}
                >
                  {autoGainControl ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>

          {/* Smart Features */}
          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              🤖 Smart Features
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Sleep Timer (minutes)
                </span>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSleepTimerFunction(15)}
                    className="bg-purple-500 text-white px-3 py-1 text-sm"
                  >
                    15
                  </Button>
                  <Button
                    onClick={() => setSleepTimerFunction(30)}
                    className="bg-purple-500 text-white px-3 py-1 text-sm"
                  >
                    30
                  </Button>
                  <Button
                    onClick={() => setSleepTimerFunction(60)}
                    className="bg-purple-500 text-white px-3 py-1 text-sm"
                  >
                    60
                  </Button>
                </div>
                {sleepTimer && <p className="text-green-400 text-sm">Sleep timer set for {sleepTimer} minutes</p>}
              </div>

              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Wake-up Alarm</span>
                <Input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  className={`${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-300"}`}
                />
                <Button onClick={() => setAlarmFunction(alarmTime)} className="bg-orange-500 text-white w-full">
                  Set Alarm
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Voice Commands</span>
                <Button
                  onClick={() => setVoiceCommands(!voiceCommands)}
                  className={`p-2 rounded-lg ${voiceCommands ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {voiceCommands ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Gesture Controls</span>
                <Button
                  onClick={() => setGestureControls(!gestureControls)}
                  className={`p-2 rounded-lg ${gestureControls ? "bg-blue-500" : "bg-gray-500"}`}
                >
                  {gestureControls ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Car Mode</span>
                <Button
                  onClick={() => enableCarMode()}
                  className={`p-2 rounded-lg ${carMode ? "bg-red-500" : "bg-gray-500"}`}
                >
                  {carMode ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>

          {/* Social & Community Features */}
          <div
            className={`${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
          >
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              👥 Social & Community
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Social Sharing</span>
                <Button
                  onClick={() => setSocialSharing(!socialSharing)}
                  className={`p-2 rounded-lg ${socialSharing ? "bg-blue-500" : "bg-gray-500"}`}
                >
                  {socialSharing ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Friends Activity</span>
                <Button
                  onClick={() => setFriendsActivity(!friendsActivity)}
                  className={`p-2 rounded-lg ${friendsActivity ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {friendsActivity ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Live Chat</span>
                <Button
                  onClick={() => setLiveChat(!liveChat)}
                  className={`p-2 rounded-lg ${liveChat ? "bg-purple-500" : "bg-gray-500"}`}
                >
                  {liveChat ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Achievement Badges</span>
                <div className="flex flex-wrap gap-2">
                  {badgesEarned.map((badge, index) => (
                    <Badge key={index} className="bg-yellow-500 text-white">
                      {badge.replace("-", " ").toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Listening Stats</span>
                <div className="text-xs space-y-1">
                  <p>Streak: {listeningStreak} days</p>
                  <p>Total Time: {Math.floor(totalListeningTime / 60)} hours</p>
                  <p>Stations Discovered: {stationsDiscovered}</p>
                  <p>Countries Explored: {countriesExplored.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div
          className={`mt-8 ${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
        >
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
            ♿ Accessibility Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Visual</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>High Contrast</span>
                  <Button
                    onClick={() => setHighContrastMode(!highContrastMode)}
                    className={`p-1 rounded ${highContrastMode ? "bg-yellow-500" : "bg-gray-500"}`}
                  >
                    {highContrastMode ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-1">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Font Size</span>
                  <select
                    value={fontSizePreference}
                    onChange={(e) => setFontSizePreference(e.target.value as any)}
                    className={`w-full p-2 rounded ${isDarkMode ? "bg-white/10 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Magnification</span>
                  <Slider
                    value={[magnification]}
                    onValueChange={(value) => setMagnification(value[0])}
                    max={3}
                    min={1}
                    step={0.1}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Motor</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Reduced Motion</span>
                  <Button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`p-1 rounded ${reducedMotion ? "bg-green-500" : "bg-gray-500"}`}
                  >
                    {reducedMotion ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Keyboard Navigation
                  </span>
                  <Button
                    onClick={() => setKeyboardNavigation(!keyboardNavigation)}
                    className={`p-1 rounded ${keyboardNavigation ? "bg-blue-500" : "bg-gray-500"}`}
                  >
                    {keyboardNavigation ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Voice Navigation</span>
                  <Button
                    onClick={() => setVoiceNavigation(!voiceNavigation)}
                    className={`p-1 rounded ${voiceNavigation ? "bg-purple-500" : "bg-gray-500"}`}
                  >
                    {voiceNavigation ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Cognitive</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Simplified Interface
                  </span>
                  <Button
                    onClick={() => setSimplifiedInterface(!simplifiedInterface)}
                    className={`p-1 rounded ${simplifiedInterface ? "bg-orange-500" : "bg-gray-500"}`}
                  >
                    {simplifiedInterface ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Focus Mode</span>
                  <Button
                    onClick={() => setFocusMode(!focusMode)}
                    className={`p-1 rounded ${focusMode ? "bg-teal-500" : "bg-gray-500"}`}
                  >
                    {focusMode ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Audio Descriptions
                  </span>
                  <Button
                    onClick={() => setAudioDescriptions(!audioDescriptions)}
                    className={`p-1 rounded ${audioDescriptions ? "bg-pink-500" : "bg-gray-500"}`}
                  >
                    {audioDescriptions ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div
          className={`mt-8 ${isDarkMode ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700" : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"} backdrop-blur-sm rounded-2xl p-6 border`}
        >
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-700"} mb-4`}>
            ⭐ Premium Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Audio Quality</h4>
              <ul className="text-sm space-y-1">
                <li className={`${highQualityStreaming ? "text-green-400" : "text-gray-500"}`}>✓ 320kbps Streaming</li>
                <li className={`${highQualityStreaming ? "text-green-400" : "text-gray-500"}`}>✓ Lossless Audio</li>
                <li className={`${highQualityStreaming ? "text-green-400" : "text-gray-500"}`}>✓ Spatial Audio</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Experience</h4>
              <ul className="text-sm space-y-1">
                <li className={`${adFreeExperience ? "text-green-400" : "text-gray-500"}`}>✓ Ad-Free Listening</li>
                <li className={`${unlimitedSkips ? "text-green-400" : "text-gray-500"}`}>✓ Unlimited Skips</li>
                <li className={`${exclusiveContent ? "text-green-400" : "text-gray-500"}`}>✓ Exclusive Content</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Customization</h4>
              <ul className="text-sm space-y-1">
                <li className={`${customThemes.length > 0 ? "text-green-400" : "text-gray-500"}`}>✓ Custom Themes</li>
                <li className={`${premiumFeatures ? "text-green-400" : "text-gray-500"}`}>✓ Advanced EQ</li>
                <li className={`${premiumFeatures ? "text-green-400" : "text-gray-500"}`}>✓ Unlimited Playlists</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Support</h4>
              <ul className="text-sm space-y-1">
                <li className={`${prioritySupport ? "text-green-400" : "text-gray-500"}`}>✓ Priority Support</li>
                <li className={`${earlyAccess ? "text-green-400" : "text-gray-500"}`}>✓ Early Access</li>
                <li className={`${betaTesting ? "text-green-400" : "text-gray-500"}`}>✓ Beta Features</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2">
              Upgrade to Premium - 15,000 TZS/month
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2">
              Try Pro - 25,000 TZS/month
            </Button>
          </div>
        </div>

        {/* Developer & Advanced Features */}
        <div
          className={`mt-8 ${isDarkMode ? "bg-white/5" : "bg-white/60"} backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? "border-white/10" : "border-white/20"}`}
        >
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
            🔧 Advanced & Developer Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Performance</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Battery Optimization
                  </span>
                  <Button
                    onClick={() => setBatteryOptimization(!batteryOptimization)}
                    className={`p-1 rounded ${batteryOptimization ? "bg-green-500" : "bg-gray-500"}`}
                  >
                    {batteryOptimization ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-1">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Network Priority</span>
                  <select
                    value={networkPriority}
                    onChange={(e) => setNetworkPriority(e.target.value as any)}
                    className={`w-full p-2 rounded ${isDarkMode ? "bg-white/10 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="auto">Auto</option>
                    <option value="wifi">WiFi Only</option>
                    <option value="cellular">Cellular Preferred</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Compression Level</span>
                  <select
                    value={compressionLevel}
                    onChange={(e) => setCompressionLevel(e.target.value as any)}
                    className={`w-full p-2 rounded ${isDarkMode ? "bg-white/10 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Developer Tools</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Debug Mode</span>
                  <Button
                    onClick={() => setDebugMode(!debugMode)}
                    className={`p-1 rounded ${debugMode ? "bg-red-500" : "bg-gray-500"}`}
                  >
                    {debugMode ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>API Access</span>
                  <Button
                    onClick={() => setApiAccess(!apiAccess)}
                    className={`p-1 rounded ${apiAccess ? "bg-blue-500" : "bg-gray-500"}`}
                  >
                    {apiAccess ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Performance Monitoring
                  </span>
                  <Button
                    onClick={() => setPerformanceMonitoring(!performanceMonitoring)}
                    className={`p-1 rounded ${performanceMonitoring ? "bg-purple-500" : "bg-gray-500"}`}
                  >
                    {performanceMonitoring ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="container mx-auto p-6 text-center">
        <p>&copy; 2023 Music App</p>
      </footer>
    </div>
  )
}
