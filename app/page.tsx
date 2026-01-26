import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Download, Terminal, FileCode, Package, Map, Wallet, User, ShoppingBag } from "lucide-react"

export default function Page() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Order Management",
      description: "Accept/reject orders, view details, track deliveries",
    },
    {
      icon: Map,
      title: "Live Navigation",
      description: "Maps integration, route guidance, open in Google/Apple Maps",
    },
    {
      icon: Wallet,
      title: "Earnings Dashboard",
      description: "Daily/weekly/monthly earnings with charts",
    },
    {
      icon: User,
      title: "Profile & Documents",
      description: "KYC verification, document upload, vehicle details",
    },
  ]

  const files = [
    { name: "App.tsx", desc: "Entry point" },
    { name: "src/screens/HomeScreen.tsx", desc: "Dashboard" },
    { name: "src/screens/OrdersScreen.tsx", desc: "Order list" },
    { name: "src/screens/EarningsScreen.tsx", desc: "Earnings" },
    { name: "src/screens/ProfileScreen.tsx", desc: "Profile" },
    { name: "src/screens/NavigationScreen.tsx", desc: "Maps" },
    { name: "src/components/OrderCard.tsx", desc: "Order card" },
  ]

  const steps = [
    {
      step: 1,
      title: "Download the Code",
      description: "Click the three dots menu → Download ZIP",
      icon: Download,
    },
    {
      step: 2,
      title: "Create Expo Project",
      description: "npx create-expo-app delivery-app",
      icon: Terminal,
    },
    {
      step: 3,
      title: "Copy Source Files",
      description: "Copy src/, App.tsx to your Expo project",
      icon: FileCode,
    },
    {
      step: 4,
      title: "Install Dependencies",
      description: "npm install @react-navigation/native react-native-maps expo-image-picker",
      icon: Package,
    },
    {
      step: 5,
      title: "Run the App",
      description: "npx expo start",
      icon: Smartphone,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <div className="bg-amber-400 px-6 py-16 text-center">
        <Badge className="mb-4 bg-amber-600 text-white hover:bg-amber-600">React Native</Badge>
        <h1 className="text-4xl font-bold text-amber-950 md:text-5xl">Delivery Partner App</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-amber-900">
          A Z-Pin-style delivery partner application built with React Native and Expo
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-amber-950 hover:bg-amber-900">
            <Download className="mr-2 h-5 w-5" />
            Download ZIP
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Features Included</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-amber-200">
              <CardHeader className="pb-2">
                <feature.icon className="mb-2 h-8 w-8 text-amber-500" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Setup Steps */}
      <div className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">How to Run Locally</h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <Card key={item.step} className="border-l-4 border-l-amber-400">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <item.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Step {item.step}: {item.title}
                    </p>
                    <code className="text-sm text-gray-600">{item.description}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* File Structure */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Project Files</h2>
        <Card>
          <CardContent className="py-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {files.map((file) => (
                <div key={file.name} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                  <FileCode className="h-5 w-5 shrink-0 text-amber-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note */}
      <div className="bg-amber-50 px-6 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This is React Native code that needs to run locally with Expo. The preview above
            shows the project documentation. Download the ZIP and follow the setup steps to run on your device.
          </p>
        </div>
      </div>
    </div>
  )
}
