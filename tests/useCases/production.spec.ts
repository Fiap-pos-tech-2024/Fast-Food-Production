import { ProductionUseCase } from '../../src/useCases/production'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('ProductionUseCase', () => {
  let useCase: ProductionUseCase

  beforeEach(() => {
    useCase = new ProductionUseCase()
  })

  it('deve listar pedidos ativos', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [{ id: 1, status: 'active' }] })
    const result = await useCase.listActiveOrders()
    expect(result).toEqual([{ id: 1, status: 'active' }])
    expect(mockedAxios.get).toHaveBeenCalled()
  })

  it('deve lançar erro ao falhar na listagem', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('fail'))
    await expect(useCase.listActiveOrders()).rejects.toThrow('Failed to fetch active orders')
  })

  it('deve atualizar pedido', async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: { id: 1, status: 'done' } })
    const result = await useCase.updateOrder('1', { status: 'done' })
    expect(result).toEqual({ id: 1, status: 'done' })
    expect(mockedAxios.patch).toHaveBeenCalled()
  })

  it('deve lançar erro ao falhar na atualização', async () => {
    mockedAxios.patch.mockRejectedValueOnce(new Error('fail'))
    await expect(useCase.updateOrder('1', { status: 'done' })).rejects.toThrow('Failed to update order')
  })
})
