import { Router, Request, Response } from 'express'
import { ProductionUseCase } from '../../useCases/production'

export class ProductionController {
    private readonly router: Router
    private readonly productionService: ProductionUseCase

    constructor(productionService: ProductionUseCase) {
        this.router = Router()
        this.productionService = productionService
    }

    public setupRoutes(): Router {
        this.router.get('/active', this.listActiveOrders.bind(this))
        this.router.put('/update/:id', this.updateOrder.bind(this))
        return this.router
    }

    /**
     * Lista pedidos ativos
     */
    public async listActiveOrders(req: Request, res: Response): Promise<void> {
        try {
            console.log('Listing active orders')
            const data = await this.productionService.listActiveOrders()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: 'Failed to list active orders' })
        }
    }

    /**
     * Atualiza um pedido
     */
    public async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const data = await this.productionService.updateOrder(id, req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: 'Failed to update order' })
        }
    }
}

// Remova o export const productionController, pois agora precisa ser instanciado com service
