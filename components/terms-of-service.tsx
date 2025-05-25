"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, AlertCircle, Users, Shield, Gavel, Clock, CheckCircle } from "lucide-react"

interface TermsOfServiceProps {
  isDarkMode: boolean
}

export function TermsOfService({ isDarkMode }: TermsOfServiceProps) {
  const sections = [
    {
      icon: Users,
      title: "User Accounts & Responsibilities",
      content: [
        "You must be at least 13 years old to use our services",
        "Provide accurate and complete information when creating an account",
        "Keep your account credentials secure and confidential",
        "You are responsible for all activities under your account",
        "Notify us immediately of any unauthorized use of your account",
      ],
    },
    {
      icon: CheckCircle,
      title: "Acceptable Use",
      content: [
        "Use the service only for lawful purposes and in accordance with these terms",
        "Do not attempt to reverse engineer, hack, or disrupt our services",
        "Respect intellectual property rights of radio stations and content creators",
        "Do not share copyrighted content without proper authorization",
        "Be respectful in any community interactions or feedback",
      ],
    },
    {
      icon: Shield,
      title: "Service Availability",
      content: [
        "We strive for 99.9% uptime but cannot guarantee uninterrupted service",
        "Radio stations may go offline or change their streaming URLs",
        "We may temporarily suspend service for maintenance or updates",
        "Some features may not be available in all regions",
        "We reserve the right to modify or discontinue features with notice",
      ],
    },
    {
      icon: Gavel,
      title: "Intellectual Property",
      content: [
        "Radio Hub Africa owns all rights to our app, design, and technology",
        "Radio content is owned by respective stations and broadcasters",
        "You retain rights to any content you create (playlists, reviews)",
        "We may use your feedback to improve our services",
        "Respect all trademarks, copyrights, and other intellectual property",
      ],
    },
  ]

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Terms of Service</h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
          Please read these terms carefully before using Radio Hub Africa. By using our service, you agree to these
          terms.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge className="bg-purple-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Effective: January 1, 2024
          </Badge>
          <Badge className="bg-pink-500 text-white">
            <FileText className="w-3 h-3 mr-1" />
            Version 2.0
          </Badge>
        </div>
      </div>

      {/* Agreement Notice */}
      <Card className={`${isDarkMode ? "bg-purple-900/20 border-purple-700" : "bg-purple-50 border-purple-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-600">
            <AlertCircle className="w-5 h-5" />
            <span>Agreement to Terms</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${isDarkMode ? "text-purple-300" : "text-purple-700"}`}>
            By accessing and using Radio Hub Africa, you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Limitation of Liability */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span>Limitation of Liability</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Radio Hub Africa provides this service "as is" without any warranties. We are not liable for:
          </p>
          <ul className="space-y-2">
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Content provided by third-party radio stations</span>
            </li>
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Service interruptions or technical issues beyond our control</span>
            </li>
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Data loss or corruption due to device or network issues</span>
            </li>
            <li className={`flex items-start space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Any damages arising from use of our service</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Termination */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle>Account Termination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason,
            including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>User Violations</h4>
              <ul className="space-y-1 text-sm">
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Breach of these terms</li>
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Illegal activities</li>
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Abuse of service</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Your Rights</h4>
              <ul className="space-y-1 text-sm">
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Delete account anytime</li>
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Export your data</li>
                <li className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>• Appeal decisions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes to Terms */}
      <Card className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}>
        <CardHeader>
          <CardTitle>Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
            We reserve the right to modify these terms at any time. We will notify users of significant changes through:
          </p>
          <ul className="space-y-2">
            <li className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>In-app notifications</span>
            </li>
            <li className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Email notifications to registered users</span>
            </li>
            <li className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Updates on our website and social media</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className={`${isDarkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
        <CardHeader>
          <CardTitle className="text-blue-600">Questions About These Terms?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"} mb-4`}>
            If you have any questions about these Terms of Service, please contact our legal team:
          </p>
          <div className="space-y-2 text-sm">
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Email:</strong> legal@radiohub.africa
            </p>
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Address:</strong> Radio Hub Africa Legal Department, Dar es Salaam, Tanzania
            </p>
            <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <strong>Response Time:</strong> We respond to all legal inquiries within 5 business days
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
