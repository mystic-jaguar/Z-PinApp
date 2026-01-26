import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import type { Order } from "../types"

interface OrderCardProps {
  order: Order
  isActive?: boolean
  onAccept?: () => void
  onReject?: () => void
}

export default function OrderCard({ order, isActive, onAccept, onReject }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return COLORS.warning
      case "accepted":
        return COLORS.primary
      case "picked":
        return COLORS.secondary
      case "delivered":
        return COLORS.success
      default:
        return COLORS.textSecondary
    }
  }

  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.earning}>₹{order.deliveryFee}</Text>
      </View>

      {/* Route Info */}
      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.routeAddress} numberOfLines={1}>
            {order.pickupLocation.address}
          </Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.dot, { backgroundColor: COLORS.error }]} />
          <Text style={styles.routeAddress} numberOfLines={1}>
            {order.deliveryLocation.address}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Ionicons name="cube-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{order.items.length} items</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="speedometer-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{order.distance} km</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{order.estimatedTime} min</Text>
        </View>
      </View>

      {/* Action Buttons */}
      {order.status === "pending" && onAccept && onReject && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
            <Ionicons name="close" size={20} color={COLORS.error} />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Ionicons name="checkmark" size={20} color={COLORS.secondary} />
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  containerActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  orderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  orderId: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: "600",
    color: COLORS.surface,
  },
  earning: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.success,
  },
  routeContainer: {
    marginBottom: SPACING.md,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeAddress: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: COLORS.border,
    marginLeft: 4,
    marginVertical: 4,
  },
  stats: {
    flexDirection: "row",
    gap: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  statText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  rejectButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  rejectText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.error,
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  acceptText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.secondary,
  },
})
