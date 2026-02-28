// Auth utilities (frontend-only mock for MVP demo)

export interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "lawyer" | "admin"
  phone?: string
  state?: string
  avatar?: string
}

export function getMockUser(): User {
  return {
    id: "usr_001",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "citizen",
    phone: "+91 98765 43210",
    state: "Maharashtra",
  }
}

export function getMockLawyerUser(): User {
  return {
    id: "lw_001",
    name: "Adv. Rajesh Mehta",
    email: "rajesh.mehta@example.com",
    role: "lawyer",
    phone: "+91 98765 12345",
    state: "Delhi",
  }
}

export function isAuthenticated(): boolean {
  // In production, check session/token
  return false
}
