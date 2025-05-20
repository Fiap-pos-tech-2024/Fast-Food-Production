const BASE_URL = process.env.ORDER_SERVICE_API ?? 'http://order-service:3001'

if (!BASE_URL) {
    throw new Error('ORDER_SERVICE_API is not defined in environment variables')
}

export class OrderController {
    async getOrder(idOrder: string): Promise<any> {
        try {
            const response = await fetch(`${BASE_URL}/order/${idOrder}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to get order: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Failed to get order:', error)
            throw error
        }
    }

    async updateOrder(id: string, order: any): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/order/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })

            if (!response.ok) {
                throw new Error(`Failed to update order: ${response.status}`)
            }
        } catch (error) {
            console.error('Failed to update order:', error)
            throw error
        }
    }

    async updateOrderStatus(id: string, status: string): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/order/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            })

            if (!response.ok) {
                throw new Error(`Failed to update order status: ${response.status}`)
            }
        } catch (error) {
            console.error('Failed to update order status:', error)
            throw error
        }
    }

    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${BASE_URL}/health`)
            return response.ok
        } catch (error) {
            console.error('Failed to check order health:', error)
            return false
        }
    }
}