import { Order } from "@/types/Order";
import { MaterialsIds } from "@/types/Material";

export interface OrderStateInterface {
  orders: Array<Order>;
  currentOrderId: number;
}

export const state: OrderStateInterface = {
  orders: [],
  currentOrderId: 0,
};
