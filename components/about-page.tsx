"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Radio,
  Heart,
  Globe,
  Users,
  Award,
  Zap,
  Shield,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react"

interface AboutPageProps {
  isDarkMode: boolean
}

export function AboutPage({ isDarkMode }: AboutPageProps) {
  const features = [
    {
      icon: Radio,
      title: "100+ Radio Stations",
      description: "Access to radio stations from across Africa with high-quality streaming",
    },
    {
      icon: Globe,
      title: "18 Countries",
      description: "Broadcasting from Tanzania, Kenya, Uganda, Nigeria, South Africa and more",
    },
    {
      icon: Headphones,
      title: "HD Audio Quality",
      description: "Crystal clear audio with multiple bitrate options up to 320kbps",
    },
    {
      icon: Zap,
      title: "Real-time Visualizer",
      description: "Beautiful audio visualizations with multiple display modes",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is protected with end-to-end encryption and no tracking",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by Africans, for Africans, with community feedback and support",
    },
  ]

  const team = [
    {
      name: "Amara Okafor",
      role: "Founder & CEO",
      location: "Lagos, Nigeria",
      bio: "Passionate about connecting Africa through music and radio",
    },
    {
      name: "Kwame Asante",
      role: "CTO",
      location: "Accra, Ghana",
      bio: "Building the future of digital radio with cutting-edge technology",
    },
    {
      name: "Fatima Hassan",
      role: "Head of Content",
      location: "Cairo, Egypt",
      bio: "Curating the best radio content from across the continent",
    },
    {
      name: "David Mwangi",
      role: "Lead Developer",
      location: "Nairobi, Kenya",
      bio: "Creating seamless user experiences for radio lovers",
    },
  ]

  const stats = [
    { label: "Active Users", value: "2.5M+", icon: Users },
    { label: "Radio Stations", value: "150+", icon: Radio },
    { label: "Countries", value: "18", icon: Globe },
    { label: "Hours Streamed", value: "50M+", icon: Headphones },
  ]

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
          <Radio className="w-10 h-10 text-white" />
        </div>
        <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Radio Hub Africa</h1>
        <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
          Connecting Africa through the power of radio. Discover, listen, and share the best radio stations from across
          the continent.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge className="bg-emerald-500 text-white">
            <Heart className="w-3 h-3 mr-1" />
            Made in Africa
          </Badge>
          <Badge className="bg-blue-500 text-white">
            <Award className="w-3 h-3 mr-1" />
            Award Winning
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`text-center ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}
            >
              <CardContent className="pt-6">
                <Icon className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-500">{stat.value}</div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mission */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Our Mission</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Radio Hub Africa was born from a simple belief: that radio has the power to unite, inform, and entertain
            people across our beautiful continent. We're building the largest and most comprehensive radio platform in
            Africa, making it easy for anyone, anywhere to discover and enjoy the rich diversity of African radio
            content.
          </p>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            From the bustling streets of Lagos to the highlands of Ethiopia, from the townships of South Africa to the
            markets of Morocco, we bring you the authentic voices and sounds that make Africa unique.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6 text-center`}>
          Why Choose Radio Hub Africa?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"} hover:scale-105 transition-transform duration-200`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6 text-center`}>
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <Card
              key={index}
              className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{member.name}</h3>
                    <p className="text-emerald-500 font-medium">{member.role}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-2`}>{member.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Get In Touch</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Email</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>hello@radiohub.africa</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Phone</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>+255 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Address</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Dar es Salaam, Tanzania</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="sm">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" size="sm">
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </Button>
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
