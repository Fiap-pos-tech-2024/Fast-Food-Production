import express from 'express'
import { HealthCheckController } from './drivers/web/healthCheckController'
import { MongoConnection } from './config/mongoConfig'
import swaggerRouter from './config/swaggerConfig'
import { HealthCheckUseCase } from './useCases/healthCheck'
import { OrderController } from './drivers/web/orderController'

class InitProject {
    public express: express.Application
    public mongoConnection: MongoConnection

    constructor() {
        this.express = express()
        this.mongoConnection = MongoConnection.getInstance()
    }

    async start() {
        try {
            await this.mongoConnection.connect()
            this.express.use(express.json())
            this.setupRoutes()
            this.startServer()
        } catch (error) {
            console.error('Failed to start application:', error)
        }
    }

    setupRoutes() {
        // Comunicação com microserviço de pedidos
        const orderController = new OrderController()

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