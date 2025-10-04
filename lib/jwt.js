import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Convert the secret string to Uint8Array for jose
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET)

export const generateToken = async (payload) => {
  const secret = getSecretKey()
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret)
  return token
}

export const verifyToken = async (token) => {
  try {
    const secret = getSecretKey()
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error("[v0] Token verification error:", error.message)
    return null
  }
}

export const decodeToken = (token) => {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    return null
  }
}
