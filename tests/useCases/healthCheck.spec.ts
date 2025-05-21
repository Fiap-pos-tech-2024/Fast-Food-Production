import { HealthCheckUseCase } from '../../src/useCases/healthCheck'

describe('HealthCheckUseCase', () => {
  it('deve retornar informações de health check', () => {
    const useCase = new HealthCheckUseCase()
    const result = useCase.healthCheck()
    expect(result).toHaveProperty('currentEnv')
    expect(result).toHaveProperty('node')
    expect(result).toHaveProperty('timestamp')
    expect(result).toHaveProperty('name')
  })
})
