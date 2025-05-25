"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { BarChart3, Waves, Activity, Zap } from "lucide-react"

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null
  isPlaying: boolean
  isDarkMode: boolean
}

export function AudioVisualizer({ audioElement, isPlaying, isDarkMode }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<Uint8Array>()
  const [visualizerType, setVisualizerType] = useState<"bars" | "wave" | "circle" | "spectrum">("bars")
  const [sensitivity, setSensitivity] = useState([50])

  useEffect(() => {
    if (!audioElement || !canvasRef.current) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaElementSource(audioElement)

      source.connect(analyser)
      analyser.connect(audioContext.destination)

      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      analyserRef.current = analyser
      dataArrayRef.current = dataArray

      if (audioContext.state === "suspended") {
        audioContext.resume()
      }
    } catch (error) {
      console.log("Audio context not supported")
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioElement])

  useEffect(() => {
    if (!isPlaying || !analyserRef.current || !dataArrayRef.current || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return

      analyserRef.current.getByteFrequencyData(dataArrayRef.current)

      ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5
      let barHeight
      let x = 0

      const sensitivityMultiplier = sensitivity[0] / 50

      switch (visualizerType) {
        case "bars":
          for (let i = 0; i < dataArrayRef.current.length; i++) {
            barHeight = (dataArrayRef.current[i] * sensitivityMultiplier * canvas.height) / 256

            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
            gradient.addColorStop(0, "#10b981")
            gradient.addColorStop(0.5, "#06d6a0")
            gradient.addColorStop(1, "#0891b2")

            ctx.fillStyle = gradient
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 1
          }
          break

        case "wave":
          ctx.lineWidth = 2
          ctx.strokeStyle = "#10b981"
          ctx.beginPath()

          const sliceWidth = canvas.width / dataArrayRef.current.length
          x = 0

          for (let i = 0; i < dataArrayRef.current.length; i++) {
            const v = (dataArrayRef.current[i] * sensitivityMultiplier) / 128.0
            const y = (v * canvas.height) / 2

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
            x += sliceWidth
          }
          ctx.stroke()
          break

        case "circle":
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const radius = Math.min(centerX, centerY) - 20

          ctx.strokeStyle = "#10b981"
          ctx.lineWidth = 2

          for (let i = 0; i < dataArrayRef.current.length; i++) {
            const angle = (i / dataArrayRef.current.length) * 2 * Math.PI
            const amplitude = (dataArrayRef.current[i] * sensitivityMultiplier) / 256
            const x1 = centerX + Math.cos(angle) * radius
            const y1 = centerY + Math.sin(angle) * radius
            const x2 = centerX + Math.cos(angle) * (radius + amplitude * 50)
            const y2 = centerY + Math.sin(angle) * (radius + amplitude * 50)

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
          break

        case "spectrum":
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
          gradient.addColorStop(0, "#10b981")
          gradient.addColorStop(0.5, "#06d6a0")
          gradient.addColorStop(1, "#0891b2")

          ctx.fillStyle = gradient

          for (let i = 0; i < dataArrayRef.current.length; i++) {
            const barHeight = (dataArrayRef.current[i] * sensitivityMultiplier * canvas.height) / 256
            const hue = (i / dataArrayRef.current.length) * 360
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
            ctx.fillRect(i * 3, canvas.height - barHeight, 2, barHeight)
          }
          break
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, visualizerType, sensitivity, isDarkMode])

  return (
    <div className={`${isDarkMode ? "bg-black/20" : "bg-white/20"} backdrop-blur-sm rounded-2xl p-4 space-y-4`}>
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Audio Visualizer</h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => setVisualizerType("bars")}
            variant={visualizerType === "bars" ? "default" : "outline"}
            size="sm"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setVisualizerType("wave")}
            variant={visualizerType === "wave" ? "default" : "outline"}
            size="sm"
          >
            <Waves className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setVisualizerType("circle")}
            variant={visualizerType === "circle" ? "default" : "outline"}
            size="sm"
          >
            <Activity className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setVisualizerType("spectrum")}
            variant={visualizerType === "spectrum" ? "default" : "outline"}
            size="sm"
          >
            <Zap className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full h-48 rounded-xl border border-emerald-500/20"
      />

      <div className="flex items-center space-x-4">
        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Sensitivity:</span>
        <Slider value={sensitivity} onValueChange={setSensitivity} max={100} min={10} step={5} className="flex-1" />
        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{sensitivity[0]}%</span>
      </div>
    </div>
  )
}
