// src/useCases/production.ts

import axios from "axios";

export class ProductionUseCase {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  async listActiveOrders(): Promise<any> {
    try {
      const orderServiceApi = process.env.ORDER_SERVICE_API || "http://order-service:3001";
      const response = await axios.get(
        `${orderServiceApi}/order/status/active`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active orders:", error);
      throw new Error("Failed to fetch active orders");
    }
  }

  async updateOrder(id: string, data: any): Promise<any> {
    try {
      const orderServiceApi = process.env.ORDER_SERVICE_API || "http://order-service:3001";
      const response = await axios.patch(
        `${orderServiceApi}/order/${id}/status`,
        data
      );
      return {
        respose: response.data,
        status: response.status,
      }
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Failed to update order");
    }
  }
}
