import { ActionTree } from "vuex";
import { Delivery } from "@/types/Delivery";
import { DeliveryStateInterface } from "@/store/modules/delivery/delivery.state";
import { AppState } from "@/store";

export const actions: ActionTree<DeliveryStateInterface, AppState> = {
  addDeliveryAction(context, delivery: Delivery): void {
    context.commit("addDelivery", delivery);
  },
};
