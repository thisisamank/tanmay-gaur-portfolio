"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { validateContactForm } from "@/lib/utils/validation"
import type { ContactFormData } from "@/lib/utils/validation"

export function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = validateContactForm(formData)
    if (!validation.valid) {
      toast({
        title: "Validation Error",
        description: Object.values(validation.errors)[0],
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent. I'll get back to you soon.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          projectType: "",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-foreground">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="mt-2"
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="mt-2"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-foreground">
          Phone (Optional)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className="mt-2"
        />
      </div>

      {/* Project Type */}
      <div>
        <Label htmlFor="projectType" className="text-foreground">
          Project Type (Optional)
        </Label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full mt-2 px-3 py-2 bg-input border border-border rounded-md text-foreground"
        >
          <option value="">Select a project type</option>
          <option value="commercial">Commercial</option>
          <option value="documentary">Documentary</option>
          <option value="music-video">Music Video</option>
          <option value="corporate">Corporate</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="mt-2 min-h-32"
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
