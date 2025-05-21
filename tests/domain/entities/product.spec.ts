import { Product } from '../../../src/domain/entities/product'

describe('Product Entity', () => {
  it('deve criar um produto corretamente', () => {
    const data = {
      idProduct: '1',
      name: 'Coca-Cola',
      amount: 2,
      unitValue: 5,
      observation: 'gelada',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      category: 'bebida',
      calculateTotalValue: () => 10
    }
    const product = new Product(data)
    expect(product.idProduct).toBe('1')
    expect(product.name).toBe('Coca-Cola')
    expect(product.amount).toBe(2)
    expect(product.unitValue).toBe(5)
    expect(product.observation).toBe('gelada')
    expect(product.category).toBe('bebida')
    expect(product.calculateTotalValue()).toBe(10)
  })
})
