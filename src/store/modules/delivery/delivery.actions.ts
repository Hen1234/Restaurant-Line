import { ActionContext } from "vuex";
import { Delivery } from "@/types/Delivery";

export const actions = {
  addDeliveryAction(
    context: ActionContext<any, any>,
    delivery: Delivery
  ): void {
    context.commit("addDelivery", delivery);
  },
};
