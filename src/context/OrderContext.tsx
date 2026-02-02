"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Order } from "../types"

interface OrderContextType {
  orders: Order[]
  activeOrder: Order | null
  pendingOrders: Order[]
  setActiveOrder: (order: Order | null) => void
  acceptOrder: (orderId: string) => void
  pickupOrder: (orderId: string) => void
  deliverOrder: (orderId: string) => void
  rejectOrder: (orderId: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD001",
    status: "pending",
    pickupLocation: {
      latitude: 28.6139,
      longitude: 77.209,
      address: "ZPIN Warehouse, Connaught Place",
      landmark: "Near Metro Station",
    },
    deliveryLocation: {
      latitude: 28.628,
      longitude: 77.2189,
      address: "45, Rajendra Place, Block A",
      landmark: "Opposite SBI Bank",
    },
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 12345",
    items: [
      { name: "Milk 1L", quantity: 2, price: 60 },
      { name: "Bread", quantity: 1, price: 45 },
      { name: "Eggs (12pc)", quantity: 1, price: 90 },
    ],
    totalAmount: 255,
    deliveryFee: 25,
    distance: 2.4,
    estimatedTime: 15,
    createdAt: new Date(),
  },
  {
    id: "ORD002",
    status: "pending",
    pickupLocation: {
      latitude: 28.62,
      longitude: 77.21,
      address: "ZPIN Store, Karol Bagh",
      landmark: "Main Market",
    },
    deliveryLocation: {
      latitude: 28.635,
      longitude: 77.225,
      address: "78, Model Town, Part 2",
      landmark: "Near Community Park",
    },
    customerName: "Amit Verma",
    customerPhone: "+91 87654 32109",
    items: [
      { name: "Rice 5kg", quantity: 1, price: 320 },
      { name: "Oil 1L", quantity: 2, price: 180 },
    ],
    totalAmount: 680,
    deliveryFee: 35,
    distance: 3.8,
    estimatedTime: 22,
    createdAt: new Date(),
  },
  {
    id: "ORD003",
    status: "pending",
    pickupLocation: {
      latitude: 28.61,
      longitude: 77.205,
      address: "ZPIN Hub, Nehru Place",
      landmark: "Near Bus Stand",
    },
    deliveryLocation: {
      latitude: 28.6,
      longitude: 77.215,
      address: "23, Greater Kailash, Part 1",
      landmark: "M Block Market",
    },
    customerName: "Sneha Gupta",
    customerPhone: "+91 76543 21098",
    items: [
      { name: "Fruits Basket", quantity: 1, price: 450 },
      { name: "Yogurt", quantity: 3, price: 75 },
    ],
    totalAmount: 525,
    deliveryFee: 30,
    distance: 2.9,
    estimatedTime: 18,
    createdAt: new Date(),
  },
]

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)

  const pendingOrders = orders.filter((o) => o.status === "pending")

  const acceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "accepted", acceptedAt: new Date() } : order)),
    )
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      setActiveOrder({ ...order, status: "accepted", acceptedAt: new Date() })
    }
  }

  const pickupOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "picked", pickedAt: new Date() } : order)),
    )
    if (activeOrder?.id === orderId) {
      setActiveOrder({ ...activeOrder, status: "picked", pickedAt: new Date() })
    }
  }

  const deliverOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "delivered", deliveredAt: new Date() } : order)),
    )
    setActiveOrder(null)
  }

  const rejectOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        pendingOrders,
        setActiveOrder,
        acceptOrder,
        pickupOrder,
        deliverOrder,
        rejectOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
