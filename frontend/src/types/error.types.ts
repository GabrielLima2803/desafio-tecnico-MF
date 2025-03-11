export interface CustomError extends Error {
  response?: {
    data: {
      message: string
      errors?: Record<string, string[]>
    }
  }
}
