import { HealthCheckController } from '../../../src/drivers/web/healthCheckController'
import { HealthCheckUseCase } from '../../../src/useCases/healthCheck'
import { Request, Response } from 'express'

describe('HealthCheckController', () => {
  let controller: HealthCheckController
  let useCase: HealthCheckUseCase
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    useCase = new HealthCheckUseCase()
    controller = new HealthCheckController(useCase)
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('deve retornar health check', () => {
    controller['healthCheck'](req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      currentEnv: expect.any(String),
      node: expect.any(String),
      timestamp: expect.any(String),
      name: expect.any(String)
    }))
  })
})
