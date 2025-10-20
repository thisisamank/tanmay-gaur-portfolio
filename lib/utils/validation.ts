export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+$$$$]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  projectType?: string
}

export function validateContactForm(data: ContactFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
