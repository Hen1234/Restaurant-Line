import { OrderStateInterface } from "@/store/modules/order/order.state";
import { Order } from "@/types/Order";
import {
  ADD_NEW_ORDER,
  INCREASE_ORDER_ID,
} from "@/store/modules/order/mutationTypes";

export const mutations = {
  [ADD_NEW_ORDER](state: OrderStateInterface, order: Order): void {
    state.orders.push(order);
  },
  [INCREASE_ORDER_ID](state: OrderStateInterface): void {
    state.currentOrderId++;
  },
};
