import { state } from "@/store/modules/order/order.state";
import { Product } from "@/types/Product";
import {Order} from "@/types/Order";

export const mutations = {
  addNewOrder(payload: Order): void {
    console.log(state.orders);
    // const order = { orderID: ++state.counter, products: orderProducts };
    state.orders.push(payload);
    console.log(state.orders);
    state.counter++;
  },
};
