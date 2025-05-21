import { ProductionController } from '../../../src/drivers/web/productionController'

const BASE_URL = 'http://mock-production-service.com'

const mockProduction = {
    idProduction: '1',
    value: 100,
    idClient: 'client123',
    cpf: '12345678900',
    name: 'John Doe',
    email: 'john.doe@example.com',
    items: [],
    status: 'PENDING',
    paymentId: '',
    paymentLink: '',
}

describe('ProductionController', () => {
    let productionController: ProductionController

    beforeAll(() => {
        process.env.PRODUCTION_SERVICE_API = BASE_URL
        productionController = new ProductionController()
    })

    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getProduction', () => {
        it('should return a production when the API responds successfully', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockProduction,
            })

            const result = await productionController.getProduction('1')

            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/production/1`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            expect(result).toEqual(mockProduction)
        })

        it('should throw an error when the API responds with a non-200 status', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
            })

            await expect(productionController.getProduction('2')).rejects.toThrow(
                'Failed to get production: 404'
            )
        })

        it('should throw an error when the fetch request fails', async () => {
            ;(global.fetch as jest.Mock).mockRejectedValueOnce(
                new Error('Network error')
            )

            await expect(productionController.getProduction('1')).rejects.toThrow(
                'Network error'
            )
        })
    })

    describe('updateProduction', () => {
        it('should update a production successfully', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true })

            await productionController.updateProduction('1', mockProduction)

            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/production/1`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockProduction),
            })
        })

        it('should throw an error when the API responds with a non-200 status', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
            })

            await expect(
                productionController.updateProduction('2', mockProduction)
            ).rejects.toThrow('Failed to update production: 500')
        })

        it('should throw an error when the fetch request fails', async () => {
            ;(global.fetch as jest.Mock).mockRejectedValueOnce(
                new Error('Network error')
            )

            await expect(
                productionController.updateProduction('1', mockProduction)
            ).rejects.toThrow('Network error')
        })
    })

    describe('updateProductionStatus', () => {
        it('should update the production status successfully', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true })

            await productionController.updateProductionStatus('1', 'COMPLETED')

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/production/1/status`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'COMPLETED' }),
                }
            )
        })

        it('should throw an error when the API responds with a non-200 status', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 400,
            })

            await expect(
                productionController.updateProductionStatus('1', 'INVALID')
            ).rejects.toThrow('Failed to update production status: 400')
        })

        it('should throw an error when the fetch request fails', async () => {
            ;(global.fetch as jest.Mock).mockRejectedValueOnce(
                new Error('Network error')
            )

            await expect(
                productionController.updateProductionStatus('1', 'COMPLETED')
            ).rejects.toThrow('Network error')
        })
    })
})
