import { Request, Response } from 'express'
import * as roleService from '../../../src/api/services/roleService'
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../../../src/api/controllers/roleController'

jest.mock('../../../src/api/services/roleService')

describe('roleController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: jest.Mock

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getRoles', () => {
    it('should return all roles', async () => {
      const mockRoles = [{ id: 1, name: 'Admin' }]
      ;(roleService.getRoles as jest.Mock).mockResolvedValue(mockRoles)

      await getRoles(req as Request, res as Response)

      expect(roleService.getRoles).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockRoles)
    })

    it('should handle errors', async () => {
      const error = new Error('Something went wrong')
      ;(roleService.getRoles as jest.Mock).mockRejectedValue(error)

      await getRoles(req as Request, res as Response)

      expect(roleService.getRoles).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })

  describe('getRoleById', () => {
    it('should return a role by id', async () => {
      const mockRole = { id: 1, name: 'Admin' }
      req.params = { id: '1' }
      ;(roleService.getRoleById as jest.Mock).mockResolvedValue(mockRole)

      await getRoleById(req as Request, res as Response)

      expect(roleService.getRoleById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockRole)
    })

    it('should handle errors', async () => {
      const error = new Error('Something went wrong')
      req.params = { id: '1' }
      ;(roleService.getRoleById as jest.Mock).mockRejectedValue(error)

      await getRoleById(req as Request, res as Response)

      expect(roleService.getRoleById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })

  describe('createRole', () => {
    it('should create a new role', async () => {
      const mockRole = { id: 1, name: 'Admin' }
      req.body = { name: 'Admin' }
      ;(roleService.createRole as jest.Mock).mockResolvedValue(mockRole)

      await createRole(req as Request, res as Response)

      expect(roleService.createRole).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(mockRole)
    })

    it('should handle errors', async () => {
      const error = new Error('Something went wrong')
      req.body = { name: 'Admin' }
      ;(roleService.createRole as jest.Mock).mockRejectedValue(error)

      await createRole(req as Request, res as Response)

      expect(roleService.createRole).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })

  describe('updateRole', () => {
    it('should update a role', async () => {
      const mockRole = { id: 1, name: 'Admin' }
      req.params = { id: '1' }
      req.body = { name: 'Admin' }
      ;(roleService.updateRole as jest.Mock).mockResolvedValue(mockRole)

      await updateRole(req as Request, res as Response)

      expect(roleService.updateRole).toHaveBeenCalledWith(1, req.body)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockRole)
    })

    it('should handle errors', async () => {
      const error = new Error('Something went wrong')
      req.params = { id: '1' }
      req.body = { name: 'Admin' }
      ;(roleService.updateRole as jest.Mock).mockRejectedValue(error)

      await updateRole(req as Request, res as Response)

      expect(roleService.updateRole).toHaveBeenCalledWith(1, req.body)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })

  describe('deleteRole', () => {
    it('should delete a role', async () => {
      const mockRole = { id: 1, name: 'Admin' }
      req.params = { id: '1' }
      ;(roleService.deleteRole as jest.Mock).mockResolvedValue(mockRole)

      await deleteRole(req as Request, res as Response)

      expect(roleService.deleteRole).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockRole)
    })

    it('should handle errors', async () => {
      const error = new Error('Something went wrong')
      req.params = { id: '1' }
      ;(roleService.deleteRole as jest.Mock).mockRejectedValue(error)

      await deleteRole(req as Request, res as Response)

      expect(roleService.deleteRole).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('An unexpected error occurred')
    })
  })
})
