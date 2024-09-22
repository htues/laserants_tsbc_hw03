import express, { Router } from 'express'
import hcController from '../controllers/hcController.js'

const router: Router = express.Router()

router.get("/backend", hcController.backendHealthCheck)
router.get("/db", hcController.dbHealthCheck)

export default router
