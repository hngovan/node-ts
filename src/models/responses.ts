import { Response } from 'express'

interface ApiResponse {
  success: boolean
  status: number
  message: string
  data?: any
}

export const createSuccessResponse = (res: Response, data: any, status = 200, message = 'Success') => {
  const response: ApiResponse = {
    success: true,
    status,
    message,
    data
  }
  return res.status(status).json(response)
}

export const createErrorResponse = (res: Response, status = 500, message = 'Internal Server Error') => {
  const response: ApiResponse = {
    success: false,
    status,
    message
  }
  return res.status(status).json(response)
}
