import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import { useOrders } from "../context/OrderContext"
import type { Order } from "../types"

export default function OrderDetailScreen({ route, navigation }: any) {
  const { order }: { order: Order } = route.params
  const { activeOrder, acceptOrder, pickupOrder, deliverOrder } = useOrders()

  const isActive = activeOrder?.id === order.id
  const currentOrder = isActive ? activeOrder : order

  const handleCall = () => {
    Linking.openURL(`tel:${order.customerPhone}`)
  }

  const handleNavigate = () => {
    navigation.navigate("Navigation", { order: currentOrder })
  }

  const getActionButton = () => {
    if (!currentOrder) return null

    switch (currentOrder.status) {
      case "pending":
        return (
          <TouchableOpacity style={styles.actionButton} onPress={() => acceptOrder(order.id)}>
            <Text style={styles.actionButtonText}>Accept Order</Text>
          </TouchableOpacity>
        )
      case "accepted":
        return (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.navigationButton]} onPress={handleNavigate}>
              <Ionicons name="navigate" size={20} color={COLORS.surface} />
              <Text style={styles.actionButtonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => pickupOrder(order.id)}>
              <Text style={styles.actionButtonText}>Picked Up</Text>
            </TouchableOpacity>
          </View>
        )
      case "picked":
        return (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.navigationButton]} onPress={handleNavigate}>
              <Ionicons name="navigate" size={20} color={COLORS.surface} />
              <Text style={styles.actionButtonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deliverButton]}
              onPress={() => deliverOrder(order.id)}
            >
              <Text style={styles.actionButtonText}>Mark Delivered</Text>
            </TouchableOpacity>
          </View>
        )
      case "delivered":
        return (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.completedText}>Order Delivered</Text>
          </View>
        )
      default:
        return null
    }
  }

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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Order ID & Status */}
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentOrder?.status || order.status) }]}>
            <Text style={styles.statusText}>{(currentOrder?.status || order.status).toUpperCase()}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer</Text>
          <View style={styles.customerRow}>
            <View>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <Text style={styles.customerPhone}>{order.customerPhone}</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Ionicons name="call" size={20} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Route</Text>

          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: COLORS.success }]} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationAddress}>{order.pickupLocation.address}</Text>
              {order.pickupLocation.landmark && (
                <Text style={styles.locationLandmark}>{order.pickupLocation.landmark}</Text>
              )}
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: COLORS.error }]} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Delivery</Text>
              <Text style={styles.locationAddress}>{order.deliveryLocation.address}</Text>
              {order.deliveryLocation.landmark && (
                <Text style={styles.locationLandmark}>{order.deliveryLocation.landmark}</Text>
              )}
            </View>
          </View>

          <View style={styles.routeStats}>
            <View style={styles.routeStat}>
              <Ionicons name="speedometer-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.routeStatText}>{order.distance} km</Text>
            </View>
            <View style={styles.routeStat}>
              <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.routeStatText}>{order.estimatedTime} min</Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items ({order.items.length})</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>₹{order.totalAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.feeLabel}>Your Earnings</Text>
            <Text style={styles.feeValue}>₹{order.deliveryFee}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>{getActionButton()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
  },
  orderId: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: "bold",
    color: COLORS.surface,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  cardTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  customerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  customerPhone: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  callButton: {
    backgroundColor: COLORS.success,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  locationAddress: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  locationLandmark: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.border,
    marginLeft: 5,
    marginVertical: SPACING.sm,
  },
  routeStats: {
    flexDirection: "row",
    gap: SPACING.xl,
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  routeStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  routeStatText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  itemQuantity: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.primary,
    width: 30,
  },
  itemName: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
  },
  feeLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.success,
    fontWeight: "500",
  },
  feeValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.success,
  },
  actionContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
  navigationButton: {
    backgroundColor: COLORS.secondary,
  },
  deliverButton: {
    backgroundColor: COLORS.success,
  },
  actionButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.surface,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  completedText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.success,
  },
})
