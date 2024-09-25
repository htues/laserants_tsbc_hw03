import { Request, Response } from 'express'
import { dbConnection } from '../../config/setup.js'

const hcController = {
  backendHealthCheck: async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      message: 'Backend is running',
      timestamp: new Date().toISOString(),
    })
  },

  dbHealthCheck: async (req: Request, res: Response) => {
    try {
      await dbConnection()
      res.status(200).json({
        status: 'OK',
        message: 'Database is connected',
        timestamp: new Date().toISOString(),
      })
    } catch (error: unknown) {
      res.status(500).json({
        status: 'ERROR',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
      })
    }
  },
}


export default hcController;
