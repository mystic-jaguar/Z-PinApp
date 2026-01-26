"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"

export default function SettingsScreen() {
  const settings = [
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "lock-closed-outline", label: "Privacy & Security" },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {settings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, index !== settings.length - 1 && styles.border]}
          >
            <Ionicons name={item.icon as any} size={22} color={COLORS.text} />
            <Text style={styles.label}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: "500",
  },
})
