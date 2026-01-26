"use client"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"

const SUPPORT_NUMBER = "+919922558877" // 🔴 Replace with actual customer support number

export default function HelpSupportScreen() {
  const handleCallSupport = async () => {
    const phoneUrl = `tel:${SUPPORT_NUMBER}`
    Linking.openURL(phoneUrl)    
  }

  const faqs = [
    {
      q: "I am unable to accept orders",
      a: "Please ensure you are marked online and have a stable internet connection.",
    },
    {
      q: "Payment not credited",
      a: "Payments are processed within 24–48 hours after order completion.",
    },
    {
      q: "App is not working properly",
      a: "Try restarting the app or updating it to the latest version.",
    },
    {
      q: "How do I update my documents?",
      a: "Go to Profile → Documents to update your details.",
    },
  ]

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* FAQs */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.q}</Text>
            <Text style={styles.answer}>{item.a}</Text>
          </View>
        ))}
      </View>

      {/* Contact Support */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Need more help?</Text>

        <TouchableOpacity style={styles.supportButton} onPress={handleCallSupport}>
          <Ionicons name="call-outline" size={22} color={COLORS.surface} />
          <Text style={styles.supportText}>Contact Customer Support</Text>
        </TouchableOpacity>

        <Text style={styles.supportSubText}>
          Available 9 AM – 9 PM
        </Text>
      </View>
    </ScrollView>
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
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  faqItem: {
    marginBottom: SPACING.md,
  },
  question: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  answer: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  supportText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  supportSubText: {
    marginTop: SPACING.sm,
    textAlign: "center",
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
})
