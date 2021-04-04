import { GetterTree } from "vuex";
import { OrderStateInterface } from "@/store/modules/order/order.state";
import { AppState } from "@/store";
import { OrderStatus } from "@/types/Order";

export const getters: GetterTree<OrderStateInterface, AppState> = {
  readyToBeProduced: (state) =>
    state.orders.filter(
      (order) => order.status === OrderStatus.ReadyToBeProduced
    ),

  BeingPrepared: (state) =>
    state.orders.filter((order) => order.status === OrderStatus.BeingPrepared),
};
