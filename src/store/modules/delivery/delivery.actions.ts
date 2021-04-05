import { ActionTree } from "vuex";
import { Delivery } from "@/types/Delivery";
import { DeliveryStateInterface } from "@/store/modules/delivery/delivery.state";
import { AppState } from "@/store";

export const actions: ActionTree<DeliveryStateInterface, AppState> = {
  addDeliveryAction(context, delivery: Delivery): void {
    context.commit("addNewDelivery", delivery);
  },

  addNewDelivery({ commit, state }) {
    const newDelivery = {
      deliveryID: state.deliveries.length + 1,
      orderID: 0,
      time: "00:50:00",
      inDelivery: false,
      isFailed: false,
    };
    commit("addNewDelivery", newDelivery);
  },

  addOrderToDelivery({ commit, state }, payload: {deliveryID: number, orderID: number}) {
    commit("addOrderToDelivery", payload)
  },
};
