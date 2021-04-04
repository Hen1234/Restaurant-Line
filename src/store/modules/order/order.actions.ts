import { Order } from "@/types/Order";
import { ActionTree } from "vuex";
import { OrderStateInterface } from "@/store/modules/order/order.state";
import { AppState } from "@/store";
import {
  ADD_NEW_ORDER,
  INCREASE_ORDER_ID,
} from "@/store/modules/order/mutationTypes";

export const actions: ActionTree<OrderStateInterface, AppState> = {
  addNewOrder({ commit }, order: Order): void {
    commit(INCREASE_ORDER_ID, order);
    commit(ADD_NEW_ORDER, order);
  },
};
