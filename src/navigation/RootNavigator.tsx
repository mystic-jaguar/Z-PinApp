"use client"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { COLORS } from "../constants/theme"
import { useAuth } from "../context/AuthContext"

// Screens
import HomeScreen from "../screens/HomeScreen"
import OrdersScreen from "../screens/OrdersScreen"
import OrderDetailScreen from "../screens/OrderDetailScreen"
import NavigationScreen from "../screens/NavigationScreen"
import EarningsScreen from "../screens/EarningsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import DocumentsScreen from "../screens/DocumentsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import HelpSupportScreen from "../screens/HelpSupportScreen"
import BankAccountScreen from "../screens/BankAccountScreen"
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function OrdersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="OrdersList" component={OrdersScreen} options={{ title: "My Orders" }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: "Order Details" }} />
      <Stack.Screen
        name="Navigation"
        component={NavigationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name="Documents" component={DocumentsScreen} options={{ title: "My Documents" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: "Help & Support" }} />
      <Stack.Screen
        name="BankAccount"
        component={BankAccountScreen}
        options={{ title: "Bank Account Details" }}
      />
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  const { user } = useAuth()
  const insets = useSafeAreaInsets() // ✅ CRITICAL

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Orders") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Earnings") {
            iconName = focused ? "wallet" : "wallet-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,

        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: insets.bottom,
          height: 56 + insets.bottom,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarHideOnKeyboard: true,

        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: { fontWeight: "bold" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersStack} options={{ headerShown: false }} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
