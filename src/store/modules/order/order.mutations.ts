import { OrderStateInterface } from "@/store/modules/order/order.state";
import {Product} from "@/types/Product";
import {Customer} from "@/types/Customer";
import {Order} from "@/types/Order";

export const mutations = {
  addNewOrder(state: OrderStateInterface, order: Order): void {
    state.currentOrderId++;
    const tempStateForReactive = state.orders;
    tempStateForReactive.push({...order,orderID: state.currentOrderId} );
    state.orders = [...tempStateForReactive]
    // state.orders.push({orderID: state.currentOrderId, products: products});
  },
};
