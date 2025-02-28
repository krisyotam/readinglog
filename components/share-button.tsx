"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ShareButton() {
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        description: "Link copied to clipboard!",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy link.",
      })
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleShare}>
      <Share2 className="h-5 w-5" />
    </Button>
  )
}

