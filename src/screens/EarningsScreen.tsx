"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import type { Earning } from "../types"

const { width } = Dimensions.get("window")

type PeriodType = "today" | "week" | "month"

// Mock earnings data
const mockEarnings: Earning[] = [
  { id: "1", orderId: "ORD001", amount: 35, tip: 10, incentive: 5, date: new Date(), status: "credited" },
  { id: "2", orderId: "ORD002", amount: 42, tip: 0, incentive: 8, date: new Date(), status: "credited" },
  { id: "3", orderId: "ORD003", amount: 28, tip: 15, incentive: 0, date: new Date(), status: "pending" },
  {
    id: "4",
    orderId: "ORD004",
    amount: 38,
    tip: 5,
    incentive: 10,
    date: new Date(Date.now() - 86400000),
    status: "credited",
  },
  {
    id: "5",
    orderId: "ORD005",
    amount: 45,
    tip: 20,
    incentive: 0,
    date: new Date(Date.now() - 86400000),
    status: "credited",
  },
]

const weeklyData = [
  { day: "Mon", amount: 856 },
  { day: "Tue", amount: 1024 },
  { day: "Wed", amount: 768 },
  { day: "Thu", amount: 1156 },
  { day: "Fri", amount: 1340 },
  { day: "Sat", amount: 1580 },
  { day: "Sun", amount: 920 },
]

export default function EarningsScreen() {
  const [period, setPeriod] = useState<PeriodType>("week")

  const totalEarnings = {
    today: 856,
    week: 7644,
    month: 28540,
  }

  const stats = {
    deliveries: period === "today" ? 12 : period === "week" ? 84 : 312,
    tips: period === "today" ? 125 : period === "week" ? 890 : 3240,
    incentives: period === "today" ? 85 : period === "week" ? 620 : 2180,
  }

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount))

  const periods: { key: PeriodType; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Period Tabs */}
      <View style={styles.periodContainer}>
        {periods.map((p) => (
          <TouchableOpacity
            key={p.key}
            style={[styles.periodTab, period === p.key && styles.periodTabActive]}
            onPress={() => setPeriod(p.key)}
          >
            <Text style={[styles.periodText, period === p.key && styles.periodTextActive]}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total Earnings Card */}
      <View style={styles.earningsCard}>
        <Text style={styles.earningsLabel}>Total Earnings</Text>
        <Text style={styles.earningsAmount}>₹{totalEarnings[period].toLocaleString()}</Text>
        <View style={styles.earningsStats}>
          <View style={styles.earningsStat}>
            <Ionicons name="bicycle" size={16} color={COLORS.secondary} />
            <Text style={styles.earningsStatText}>{stats.deliveries} deliveries</Text>
          </View>
          <View style={styles.earningsStat}>
            <Ionicons name="heart" size={16} color={COLORS.error} />
            <Text style={styles.earningsStatText}>₹{stats.tips} tips</Text>
          </View>
          <View style={styles.earningsStat}>
            <Ionicons name="trophy" size={16} color={COLORS.warning} />
            <Text style={styles.earningsStatText}>₹{stats.incentives} bonus</Text>
          </View>
        </View>
      </View>

      {/* Weekly Chart */}
      {period === "week" && (
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Daily Breakdown</Text>
          <View style={styles.chart}>
            {weeklyData.map((data, index) => (
              <View key={index} style={styles.chartBar}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (data.amount / maxAmount) * 120,
                      backgroundColor: index === new Date().getDay() - 1 ? COLORS.primary : COLORS.border,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{data.day}</Text>
                <Text style={styles.barAmount}>₹{data.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Recent Transactions */}
        <View style={styles.transactionsCard}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          </View>

          {mockEarnings.map((earning) => (
            <View key={earning.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons name="receipt-outline" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionId}>Order #{earning.orderId}</Text>
                <Text style={styles.transactionDate}>
                  {earning.date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.amountText}>+₹{earning.amount + earning.tip + earning.incentive}</Text>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: earning.status === "credited" ? COLORS.success : COLORS.warning,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>



      {/* Payout Card */}
      <View style={styles.payoutCard}>
        <View style={styles.payoutInfo}>
          <Text style={styles.payoutLabel}>Available for Payout</Text>
          <Text style={styles.payoutAmount}>₹{totalEarnings.week.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.payoutButton}>
          <Text style={styles.payoutButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  periodContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  periodTab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
  },
  periodTabActive: {
    backgroundColor: COLORS.primary,
  },
  periodText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  periodTextActive: {
    color: COLORS.secondary,
  },
  earningsCard: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
  },
  earningsLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
  earningsAmount: {
    fontSize: FONTS.sizes.xxxl + 8,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  earningsStats: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginTop: SPACING.lg,
  },
  earningsStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  earningsStatText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.surface,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  chartTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
  },
  chartBar: {
    alignItems: "center",
    width: (width - SPACING.lg * 4) / 7,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    marginBottom: SPACING.sm,
  },
  barLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  barAmount: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text,
    fontWeight: "500",
    marginTop: 2,
  },
  transactionsCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  transactionsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
  },
  viewAllText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  transactionId: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  transactionDate: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  transactionAmount: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  amountText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.success,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  payoutCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payoutInfo: {},
  payoutLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  payoutAmount: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  payoutButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  payoutButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.surface,
  },
})
