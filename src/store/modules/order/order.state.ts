import { Order } from "@/types/Order";

export interface OrderStateInterface {
  orders: Array<Order>;
  currentOrderId: number;
}

export const state: OrderStateInterface = {
  orders: [],
  currentOrderId: 0,
};
