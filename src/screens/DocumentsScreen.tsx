"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import type { Document } from "../types"

const initialDocuments: Document[] = [
  { id: "1", type: "aadhaar", name: "Aadhaar Card", status: "verified" },
  { id: "2", type: "pan", name: "PAN Card", status: "verified" },
  { id: "3", type: "license", name: "Driving License", status: "pending" },
  { id: "4", type: "rc", name: "Vehicle RC", status: "pending" },
  { id: "5", type: "insurance", name: "Vehicle Insurance", status: "rejected" },
]

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)

  const handleUpload = async (docId: string) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please allow access to your photos to upload documents.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    })

    if (!result.canceled) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? { ...doc, imageUri: result.assets[0].uri, status: "pending", uploadedAt: new Date() }
            : doc,
        ),
      )
      Alert.alert("Success", "Document uploaded successfully. Verification in progress.")
    }
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return { name: "checkmark-circle", color: COLORS.success }
      case "pending":
        return { name: "time", color: COLORS.warning }
      case "rejected":
        return { name: "close-circle", color: COLORS.error }
      default:
        return { name: "cloud-upload", color: COLORS.textSecondary }
    }
  }

  const getDocIcon = (type: Document["type"]) => {
    switch (type) {
      case "aadhaar":
        return "id-card"
      case "pan":
        return "card"
      case "license":
        return "car"
      case "rc":
        return "document-text"
      case "insurance":
        return "shield-checkmark"
      default:
        return "document"
    }
  }

  const verifiedCount = documents.filter((d) => d.status === "verified").length

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressTitle}>Document Verification</Text>
          <Text style={styles.progressSubtitle}>
            {verifiedCount} of {documents.length} documents verified
          </Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{Math.round((verifiedCount / documents.length) * 100)}%</Text>
        </View>
      </View>

      {/* Documents List */}
      <View style={styles.documentsCard}>
        <Text style={styles.sectionTitle}>Required Documents</Text>

        {documents.map((doc, index) => {
          const statusIcon = getStatusIcon(doc.status)
          return (
            <View
              key={doc.id}
              style={[styles.documentItem, index !== documents.length - 1 && styles.documentItemBorder]}
            >
              <View style={styles.docIcon}>
                <Ionicons name={getDocIcon(doc.type) as any} size={24} color={COLORS.primary} />
              </View>

              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                <View style={styles.statusRow}>
                  <Ionicons name={statusIcon.name as any} size={16} color={statusIcon.color} />
                  <Text style={[styles.statusText, { color: statusIcon.color }]}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Text>
                </View>
              </View>

              {doc.status !== "verified" && (
                <TouchableOpacity
                  style={[styles.uploadButton, doc.status === "rejected" && styles.reuploadButton]}
                  onPress={() => handleUpload(doc.id)}
                >
                  <Text style={[styles.uploadButtonText, doc.status === "rejected" && styles.reuploadButtonText]}>
                    {doc.status === "rejected" ? "Re-upload" : "Upload"}
                  </Text>
                </TouchableOpacity>
              )}

              {doc.status === "verified" && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={16} color={COLORS.success} />
                </View>
              )}
            </View>
          )
        })}
      </View>

      {/* Guidelines */}
      <View style={styles.guidelinesCard}>
        <Text style={styles.guidelinesTitle}>Upload Guidelines</Text>
        <View style={styles.guideline}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
          <Text style={styles.guidelineText}>Documents should be clear and readable</Text>
        </View>
        <View style={styles.guideline}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
          <Text style={styles.guidelineText}>All corners of the document should be visible</Text>
        </View>
        <View style={styles.guideline}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
          <Text style={styles.guidelineText}>File size should be less than 5MB</Text>
        </View>
        <View style={styles.guideline}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
          <Text style={styles.guidelineText}>Accepted formats: JPG, PNG, PDF</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  progressSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.secondary,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  documentsCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  documentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  docIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  docInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  docName: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  statusText: {
    fontSize: FONTS.sizes.sm,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  uploadButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  reuploadButton: {
    backgroundColor: COLORS.error,
  },
  reuploadButtonText: {
    color: COLORS.surface,
  },
  verifiedBadge: {
    width: 32,
    height: 32,
    backgroundColor: `${COLORS.success}20`,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  guidelinesCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  guidelinesTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  guideline: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  guidelineText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
})
