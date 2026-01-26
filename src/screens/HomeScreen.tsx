"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import OrderCard from "../components/OrderCard"

const { width } = Dimensions.get("window")

export default function HomeScreen({ navigation }: any) {
  const { user, isOnline, toggleOnline } = useAuth()
  const { pendingOrders, activeOrder, acceptOrder, rejectOrder } = useOrders()
  const [todayStats, setTodayStats] = useState({
    deliveries: 12,
    earnings: 856,
    distance: 28.4,
    hours: 6.5,
  })

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, isOnline && styles.statusDotOnline]} />
          <Text style={styles.statusText}>{isOnline ? "You are Online" : "You are Offline"}</Text>
        </View>
        <Switch
          value={isOnline}
          onValueChange={toggleOnline}
          trackColor={{ false: COLORS.border, true: COLORS.primaryDark }}
          thumbColor={isOnline ? COLORS.primary : COLORS.textLight}
        />
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.welcomeText}>Hello, {user?.name?.split(" ")[0]}!</Text>
            <Text style={styles.welcomeSubtext}>Ready to deliver?</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color={COLORS.primary} />
            <Text style={styles.ratingText}>{user?.rating}</Text>
          </View>
        </View>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Performance</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="bicycle" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{todayStats.deliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>₹{todayStats.earnings}</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="speedometer" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>{todayStats.distance} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color={COLORS.secondary} />
            <Text style={styles.statValue}>{todayStats.hours} hrs</Text>
            <Text style={styles.statLabel}>Online</Text>
          </View>
        </View>
      </View>

      {/* Active Order */}
      {activeOrder && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Delivery</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Orders", {
                screen: "OrderDetail",
                params: { order: activeOrder },
              })
            }
          >
            <OrderCard order={activeOrder} isActive />
          </TouchableOpacity>
        </View>
      )}

      {/* New Orders */}
      {isOnline && pendingOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Orders ({pendingOrders.length})</Text>
          {pendingOrders.slice(0, 3).map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={() => acceptOrder(order.id)}
              onReject={() => rejectOrder(order.id)}
            />
          ))}
        </View>
      )}

      {/* Offline Message */}
      {!isOnline && (
        <View style={styles.offlineCard}>
          <Ionicons name="moon" size={48} color={COLORS.textLight} />
          <Text style={styles.offlineTitle}>You're Offline</Text>
          <Text style={styles.offlineText}>Turn on availability to start receiving orders</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.textLight,
  },
  statusDotOnline: {
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  welcomeCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  welcomeSubtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.secondary,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
  },
  statsContainer: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  statCard: {
    backgroundColor: COLORS.surface,
    width: (width - SPACING.lg * 2 - SPACING.md) / 2 - SPACING.md / 2,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  offlineCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xxxl,
    alignItems: "center",
  },
  offlineTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.lg,
  },
  offlineText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.sm,
  },
})
