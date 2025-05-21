import { ProductionController } from '../../../src/drivers/web/productionController'
import { ProductionUseCase } from '../../../src/useCases/production'
import { Request, Response } from 'express'

const mockService = {
  listActiveOrders: jest.fn(),
  updateOrder: jest.fn()
} as unknown as ProductionUseCase

describe('ProductionController', () => {
  let controller: ProductionController
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    controller = new ProductionController(mockService)
    req = { params: {}, body: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    jest.clearAllMocks()
  })

  it('deve retornar pedidos ativos', async () => {
    mockService.listActiveOrders = jest.fn().mockResolvedValue([{ id: 1 }])
    await controller.listActiveOrders(req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }])
  })

  it('deve retornar erro ao listar pedidos', async () => {
    mockService.listActiveOrders = jest.fn().mockRejectedValue(new Error('fail'))
    await controller.listActiveOrders(req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to list active orders' })
  })

  it('deve atualizar pedido', async () => {
    req.params = { id: '1' }
    mockService.updateOrder = jest.fn().mockResolvedValue({ id: 1, status: 'done' })
    await controller.updateOrder(req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: 1, status: 'done' })
  })

  it('deve retornar erro ao atualizar pedido', async () => {
    req.params = { id: '1' }
    mockService.updateOrder = jest.fn().mockRejectedValue(new Error('fail'))
    await controller.updateOrder(req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update order' })
  })
})
