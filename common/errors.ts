export interface PGError extends Error {
  message: string
  code: string
}

export interface DevworxError extends Error {
  message: string
  code: string
}
