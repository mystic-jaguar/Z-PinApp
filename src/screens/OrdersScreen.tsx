"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import { useOrders } from "../context/OrderContext"
import type { Order } from "../types"
import OrderCard from "../components/OrderCard"

type FilterType = "all" | "active" | "completed"

export default function OrdersScreen({ navigation }: any) {
  const { orders, activeOrder, acceptOrder, rejectOrder } = useOrders()
  const [filter, setFilter] = useState<FilterType>("all")
  const [refreshing, setRefreshing] = useState(false)

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true
    if (filter === "active") return ["pending", "accepted", "picked"].includes(order.status)
    if (filter === "completed") return ["delivered", "cancelled"].includes(order.status)
    return true
  })

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const handleOrderPress = (order: Order) => {
    navigation.navigate("OrderDetail", { order })
  }

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)}>
      <OrderCard
        order={item}
        isActive={activeOrder?.id === item.id}
        onAccept={item.status === "pending" ? () => acceptOrder(item.id) : undefined}
        onReject={item.status === "pending" ? () => rejectOrder(item.id) : undefined}
      />
    </TouchableOpacity>
  )

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ]

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterTab, filter === f.key && styles.filterTabActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.secondary,
  },
  listContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.xxxl * 2,
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
})
