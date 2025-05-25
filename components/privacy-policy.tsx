"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle, FileText, Clock } from "lucide-react"

interface PrivacyPolicyProps {
  isDarkMode: boolean
}

export function PrivacyPolicy({ isDarkMode }: PrivacyPolicyProps) {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (email, username, preferences)",
        "Usage data (listening history, favorite stations, time spent)",
        "Device information (browser type, operating system, IP address)",
        "Audio preferences and equalizer settings",
        "Location data (only with your permission for nearby stations)",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our radio streaming services",
        "Personalize your listening experience and recommendations",
        "Send important updates about service changes",
        "Analyze usage patterns to enhance app performance",
        "Ensure security and prevent fraudulent activities",
      ],
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        "All data is encrypted in transit and at rest using AES-256 encryption",
        "We use secure HTTPS connections for all communications",
        "Regular security audits and penetration testing",
        "Limited access to personal data on a need-to-know basis",
        "Automatic data backup with geographic redundancy",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights & Controls",
      content: [
        "Access and download your personal data at any time",
        "Delete your account and all associated data",
        "Opt-out of data collection for analytics",
        "Control what information is shared with radio stations",
        "Manage notification preferences and privacy settings",
      ],
    },
  ]

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Privacy Policy</h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
          Your privacy is our priority. Learn how we collect, use, and protect your personal information.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge className="bg-green-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Last Updated: January 2024
          </Badge>
          <Badge className="bg-blue-500 text-white">
            <FileText className="w-3 h-3 mr-1" />
            Version 2.0
          </Badge>
        </div>
      </div>

      {/* Quick Summary */}
      <Card className={`${isDarkMode ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-600">
            <UserCheck className="w-5 h-5" />
            <span>Privacy at a Glance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Lock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-600">Encrypted</h3>
              <p className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-700"}`}>
                All your data is encrypted and secure
              </p>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-600">Transparent</h3>
              <p className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-700"}`}>
                Clear about what we collect and why
              </p>
            </div>
            <div className="text-center">
              <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-600">Your Control</h3>
              <p className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-700"}`}>You decide what to share</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon
          return (
            <Card
              key={index}
              className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Data Sharing */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Data Sharing & Third Parties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            We do not sell, trade, or rent your personal information to third parties. We may share limited data only in
            these circumstances:
          </p>
          <ul className="space-y-2">
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Radio Stations:</strong> Basic listening statistics (anonymized) to help stations understand
                their audience
              </span>
            </li>
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Service Providers:</strong> Trusted partners who help us operate our services (hosting,
                analytics)
              </span>
            </li>
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Legal Requirements:</strong> When required by law or to protect our users and services
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Cookies */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle>Cookies & Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            We use cookies and similar technologies to enhance your experience:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Essential Cookies</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Required for basic functionality like login and preferences. Cannot be disabled.
              </p>
            </div>
            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Analytics Cookies</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Help us understand how you use our app. You can opt-out in settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className={`${isDarkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
        <CardHeader>
          <CardTitle className="text-blue-600">Questions About Privacy?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"} mb-4`}>
            If you have any questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <div className="space-y-2 text-sm">
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Email:</strong> privacy@radiohub.africa
            </p>
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Address:</strong> Radio Hub Africa, Dar es Salaam, Tanzania
            </p>
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Response Time:</strong> We respond to all privacy inquiries within 48 hours
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
