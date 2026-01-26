"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Linking } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { COLORS, SPACING, BORDER_RADIUS, FONTS } from "../constants/theme"
import type { Order } from "../types"
import { useOrders } from "../context/OrderContext"

const { width, height } = Dimensions.get("window")

export default function NavigationScreen({ route, navigation }: any) {
  const { order }: { order: Order } = route.params
  const { pickupOrder, deliverOrder } = useOrders()
  const insets = useSafeAreaInsets()

  const [currentLocation] = useState({
    latitude: 28.6129,
    longitude: 77.2295,
  })

  const destination = order.status === "accepted"
    ? order.pickupLocation
    : order.deliveryLocation

  const handleOpenMaps = () => {
    const url = Platform.select({
      ios: `maps://app?daddr=${destination.latitude},${destination.longitude}`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}`,
    })
    if (url) Linking.openURL(url)
  }

  const handleAction = () => {
    if (order.status === "accepted") {
      pickupOrder(order.id)
    } else if (order.status === "picked") {
      deliverOrder(order.id)
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: (currentLocation.latitude + destination.latitude) / 2,
          longitude: (currentLocation.longitude + destination.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation}>
          <View style={styles.currentMarker}>
            <Ionicons name="bicycle" size={20} color={COLORS.surface} />
          </View>
        </Marker>

        <Marker coordinate={destination}>
          <View
            style={[
              styles.destinationMarker,
              {
                backgroundColor:
                  order.status === "accepted" ? COLORS.success : COLORS.error,
              },
            ]}
          >
            <Ionicons
              name={order.status === "accepted" ? "storefront" : "location"}
              size={20}
              color={COLORS.surface}
            />
          </View>
        </Marker>
      </MapView>

      {/* Header */}
      <View style={[styles.header, { top: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {order.status === "accepted" ? "Go to Pickup" : "Go to Delivery"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {order.distance} km · {order.estimatedTime} min
          </Text>
        </View>
      </View>

      {/* Bottom Card */}
      <View
        style={[
          styles.bottomCard,
          {
            paddingBottom:
              SPACING.xl +
              insets.bottom +
              (Platform.OS === "android" ? 12 : 0),
          },
        ]}
      >
        <View style={styles.destinationInfo}>
          <View
            style={[
              styles.destinationIcon,
              {
                backgroundColor:
                  order.status === "accepted" ? COLORS.success : COLORS.error,
              },
            ]}
          >
            <Ionicons
              name={order.status === "accepted" ? "storefront" : "location"}
              size={20}
              color={COLORS.surface}
            />
          </View>

          <View style={styles.destinationText}>
            <Text style={styles.destinationType}>
              {order.status === "accepted" ? "Pickup Point" : "Delivery Address"}
            </Text>
            <Text style={styles.destinationAddress} numberOfLines={2}>
              {destination.address}
            </Text>
            {destination.landmark && (
              <Text style={styles.destinationLandmark}>
                {destination.landmark}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.mapsButton} onPress={handleOpenMaps}>
            <Ionicons name="map" size={20} color={COLORS.primary} />
            <Text style={styles.mapsButtonText}>Open Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton} onPress={handleAction}>
            <Text style={styles.mainButtonText}>
              {order.status === "accepted" ? "Picked Up" : "Delivered"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    width,
    height,
  },

  header: {
    position: "absolute",
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },

  backButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  headerInfo: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 4,
  },

  headerTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.text,
  },

  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },

  currentMarker: {
    backgroundColor: COLORS.secondary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.surface,
  },

  destinationMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.surface,
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    elevation: 8,
  },

  destinationInfo: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },

  destinationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  destinationText: { flex: 1 },

  destinationType: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },

  destinationAddress: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
  },

  destinationLandmark: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },

  actionButtons: {
    flexDirection: "row",
    gap: SPACING.md,
  },

  mapsButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  mapsButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.primary,
  },

  mainButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
  },

  mainButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
})
