import express from 'express'
import { HealthCheckController } from './drivers/web/healthCheckController'
import swaggerRouter from './config/swaggerConfig'
import { HealthCheckUseCase } from './useCases/healthCheck'
import { ProductionController } from './drivers/web/productionController'
import { ProductionUseCase } from './useCases/production'

class InitProject {
    public express: express.Application

    constructor() {
        this.express = express()
    }

    async start() {
        try {
            this.express.use(express.json())
            this.setupRoutes()
            this.startServer()
        } catch (error) {
            console.error('Failed to start application:', error)
        }
    }

    setupRoutes() {
        // Comunicação com microserviço de produção
        const productionService = new ProductionUseCase()
        const productionController = new ProductionController(productionService)
        this.express.use('/production', productionController.setupRoutes())

        // Health Check
        const healthCheckUseCase = new HealthCheckUseCase()
        const routesHealthCheckController = new HealthCheckController(
            healthCheckUseCase
        )
        this.express.use('/health', routesHealthCheckController.setupRoutes())

        // Swagger
        this.express.use('/api-docs', swaggerRouter)
    }

    startServer() {
        const PORT = 3003
        this.express.listen(PORT, () => {
            console.log(`Servidor de PRODUÇÃO rodando na porta ${PORT}`)
        })
    }
}

const app = new InitProject()
app.start()