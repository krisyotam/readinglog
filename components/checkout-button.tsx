"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BasketItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface CheckoutButtonProps {
  basket: BasketItem[]
}

export function CheckoutButton({ basket }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basket),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const result = await response.json()
      console.log("Checkout result:", result)

      // Handle successful checkout (e.g., redirect to a success page)
    } catch (error) {
      console.error("Error during checkout:", error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading || basket.length === 0}>
      {isLoading ? "Processing..." : "Checkout"}
    </Button>
  )
}

