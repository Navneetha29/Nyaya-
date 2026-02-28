// Mock API utilities for frontend demo
// These simulate API calls without a backend

export async function delay(ms: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const BASE_URL = "/api"

export async function apiGet<T>(endpoint: string): Promise<T> {
  await delay(300)
  // Mock implementation - would call BASE_URL + endpoint in production
  console.log(`[API] GET ${BASE_URL}${endpoint}`)
  throw new Error("API not connected - using mock data")
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  await delay(500)
  console.log(`[API] POST ${BASE_URL}${endpoint}`, data)
  throw new Error("API not connected - using mock data")
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  await delay(500)
  console.log(`[API] PUT ${BASE_URL}${endpoint}`, data)
  throw new Error("API not connected - using mock data")
}
