import { Order } from "@/types/Order";
import { OrderStateInterface } from "@/store/modules/order/order.state";

export const mutations = {
  addNewOrder(state: OrderStateInterface, order: Order): void {
    state.orders.push(order);
    state.counter++;
  },
};
