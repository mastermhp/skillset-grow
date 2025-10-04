// API client utility for frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

class ApiClient {
  constructor() {
    this.token = null
  }

  setToken(token) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  getToken() {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  async request(endpoint, options = {}) {
    const token = this.getToken()

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const config = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      return data
    } catch (error) {
      console.error("[v0] API request error:", error)
      throw error
    }
  }

  // Auth endpoints
  async signup(userData) {
    return this.request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async signin(credentials) {
    return this.request("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  // Training modules endpoints
  async getTrainingModules(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/api/training-modules?${queryString}`)
  }

  async getTrainingModule(id) {
    return this.request(`/api/training-modules/${id}`)
  }

  async createTrainingModule(data) {
    return this.request("/api/training-modules", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Trainer endpoints
  async getTrainers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/api/trainers?${queryString}`)
  }

  async getTrainer(id) {
    return this.request(`/api/trainers/${id}`)
  }

  async getTrainerRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/api/trainer-requests?${queryString}`)
  }

  async createTrainerRequest(data) {
    return this.request("/api/trainer-requests", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateTrainerRequest(id, status) {
    return this.request(`/api/trainer-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  // Company endpoints
  async getCompanies(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/api/companies?${queryString}`)
  }

  async getCompany(id) {
    return this.request(`/api/companies/${id}`)
  }

  // Dashboard stats endpoints
  async getDashboardStats(role) {
    return this.request(`/api/dashboard/stats?role=${role}`)
  }

  // Shifts endpoints
  async getShifts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/api/shifts?${queryString}`)
  }

  async createShift(data) {
    return this.request("/api/shifts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async requestShift(shiftId, traineeId) {
    return this.request(`/api/shifts/${shiftId}/request`, {
      method: "POST",
      body: JSON.stringify({ traineeId }),
    })
  }

  async updateShiftRequest(shiftId, requestId, status) {
    return this.request(`/api/shifts/${shiftId}/request/${requestId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  async deleteShift(shiftId) {
    return this.request(`/api/shifts/${shiftId}`, {
      method: "DELETE",
    })
  }

  // Messages endpoints
  async getMessages(userId, otherUserId) {
    return this.request(`/api/messages?userId=${userId}&otherUserId=${otherUserId}`)
  }

  async sendMessage(data) {
    return this.request("/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Support tickets endpoints
  async getSupportTickets(userId) {
    return this.request(`/api/support-tickets?userId=${userId}`)
  }

  async createSupportTicket(data) {
    return this.request("/api/support-tickets", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Upload endpoint
  async uploadFile(file, folder = "skillset-grow") {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const token = this.getToken()
    const headers = {}

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers,
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Upload failed")
    }

    return data
  }
}

export const apiClient = new ApiClient()
