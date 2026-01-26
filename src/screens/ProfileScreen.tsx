"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import { useAuth } from "../context/AuthContext"

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ])
  }

  const menuItems = [
    {
      icon: "document-text-outline",
      label: "My Documents",
      subtitle: "KYC, License, Vehicle RC",
      onPress: () => navigation.navigate("Documents"),
    },
    {
      icon: "bicycle-outline",
      label: "Vehicle Details",
      subtitle: user?.vehicleNumber,
      onPress: () => { },
    },
    {
      icon: "card-outline",
      label: "Bank Account",
      subtitle: "Add or update bank details",
      onPress: () => navigation.navigate("BankAccount"),
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      subtitle: "FAQs, Contact us",
      onPress: () => navigation.navigate("HelpSupport"),
    },
    // {
    //   icon: "settings-outline",
    //   label: "Settings",
    //   subtitle: "Notifications, Language",
    //   onPress: () => navigation.navigate("Settings"),
    // },
  ]

  const getVehicleIcon = (type: string | undefined) => {
    switch (type) {
      case "bike":
        return "bicycle"
      case "scooter":
        return "bicycle"
      case "car":
        return "car"
      default:
        return "bicycle"
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color={COLORS.surface} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userPhone}>{user?.phone}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="star" size={20} color={COLORS.primary} />
            <Text style={styles.statValue}>{user?.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.statValue}>{user?.totalDeliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Ionicons name={getVehicleIcon(user?.vehicleType)} size={20} color={COLORS.secondary} />
            <Text style={styles.statValue}>{user?.vehicleType}</Text>
            <Text style={styles.statLabel}>Vehicle</Text>
          </View>
        </View>
      </View>

      {/* Verification Status */}
      <View style={styles.verificationCard}>
        <View style={styles.verificationRow}>
          <View style={styles.verificationInfo}>
            <Ionicons
              name={user?.documentsVerified ? "shield-checkmark" : "shield-outline"}
              size={24}
              color={user?.documentsVerified ? COLORS.success : COLORS.warning}
            />
            <View>
              <Text style={styles.verificationTitle}>
                {user?.documentsVerified ? "Verified Partner" : "Verification Pending"}
              </Text>
              <Text style={styles.verificationSubtitle}>
                {user?.documentsVerified ? "All documents verified" : "Complete your KYC to start delivering"}
              </Text>
            </View>
          </View>
          {!user?.documentsVerified && (
            <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate("Documents")}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, index !== menuItems.length - 1 && styles.menuItemBorder]}
            onPress={item.onPress}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={22} color={COLORS.text} />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    backgroundColor: COLORS.surface,
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  userName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  userPhone: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  verificationCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verificationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    flex: 1,
  },
  verificationTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  verificationSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  verifyButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  menuLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  menuSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.error,
  },
  versionText: {
    textAlign: "center",
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxxl,
  },
})
