export interface User {
  id: string
  name: string
  phone: string
  email: string
  avatar?: string
  vehicleType: "bike" | "scooter" | "car"
  vehicleNumber: string
  isOnline: boolean
  rating: number
  totalDeliveries: number
  documentsVerified: boolean
}

export interface Order {
  id: string
  status: "pending" | "accepted" | "picked" | "delivered" | "cancelled"
  pickupLocation: Location
  deliveryLocation: Location
  customerName: string
  customerPhone: string
  items: OrderItem[]
  totalAmount: number
  deliveryFee: number
  distance: number
  estimatedTime: number
  createdAt: Date
  acceptedAt?: Date
  pickedAt?: Date
  deliveredAt?: Date
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  landmark?: string
}

export interface Earning {
  id: string
  orderId: string
  amount: number
  tip: number
  incentive: number
  date: Date
  status: "pending" | "credited"
}

export interface Document {
  id: string
  type: "aadhaar" | "pan" | "license" | "rc" | "insurance"
  name: string
  status: "pending" | "verified" | "rejected"
  imageUri?: string
  uploadedAt?: Date
}
