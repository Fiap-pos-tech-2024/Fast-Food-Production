// CONFIG/swaggerConfig.ts - AJUSTADO PARA MICRO DE PRODUÇÃO

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { Router } from 'express'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TechChallenge: Produção API',
            version: '1.0.0',
            description: 'API do microserviço de Produção - TechChallenge',
        },
    },
    apis: ['./src/drivers/web/*.ts'], // <-- manter isso se suas rotas ficarem aqui
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const swaggerRouter = Router()

swaggerRouter.use('/', swaggerUi.serve)
swaggerRouter.get('/', swaggerUi.setup(swaggerDocs))

export default swaggerRouter