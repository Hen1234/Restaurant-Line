import { ActionContext } from "vuex";
import { Order } from "@/types/Order";

export const actions = {
  addNewOrderToSlotAction(
    context: ActionContext<any, any>,
    payload: { order: Order; slotID: number }
  ): void {
    context.commit("addNewOrder", payload);
  },

  deleteOrderFromSlot(
    context: ActionContext<any, any>,
    payload: { slotID: number; index: number }
  ): void {
    context.commit("deleteOrder", payload);
  },
};
