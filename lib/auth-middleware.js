// Authentication middleware for API routes
import { verifyToken } from "./jwt"

export const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }

  req.user = decoded
  return handler(req, res)
}

export const roleMiddleware = (allowedRoles) => (handler) => async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }

  if (!allowedRoles.includes(decoded.role)) {
    return res.status(403).json({ error: "Access denied" })
  }

  req.user = decoded
  return handler(req, res)
}
