"use client"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"

export default function BankAccountScreen() {
  const [accountType, setAccountType] = useState<"Savings" | "Current">("Savings")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.card}>
        {/* Account Number */}
        <Input
          label="Account Number"
          placeholder="Enter account number"
          keyboardType="number-pad"
        />

        {/* Re-enter Account Number */}
        <Input
          label="Re-enter Account Number"
          placeholder="Re-enter account number"
          keyboardType="number-pad"
        />

        {/* IFSC Code */}
        <Input
          label="IFSC Code"
          placeholder="Enter IFSC code"
          autoCapitalize="characters"
        />

        {/* Phone Number */}
        <Input
          label="Phone Number"
          placeholder="Enter registered phone number"
          keyboardType="phone-pad"
        />

        {/* OTP */}
        {/* <Input
          label="OTP"
          placeholder="Enter OTP"
          keyboardType="number-pad"
        /> */}

        {/* Account Type Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Account Type</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{accountType}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={COLORS.textLight}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {["Savings", "Current"].map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setAccountType(type as any)
                    setShowDropdown(false)
                  }}
                >
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Bank Details</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

/* -------------------- */
/* Reusable Input Field */
/* -------------------- */
function Input(props: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={COLORS.textLight}
        style={styles.input}
      />
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
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  dropdownMenu: {
    marginTop: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: SPACING.md,
  },
  dropdownItemText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
})
