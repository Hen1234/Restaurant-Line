import { ActionTree } from "vuex";
import { Order } from "@/types/Order";
import { SlotStateInterface } from "@/store/modules/slot/slot.state";
import { AppState } from "@/store";

export const actions: ActionTree<SlotStateInterface, AppState> = {
  addNewOrderToSlotAction(
    { commit },
    payload: { order: Order; slotID: number }
  ): void {
    commit("addNewOrder", payload);
  },
  deleteOrderFromSlot(
    { commit },
    payload: { slotID: number; index: number }
  ): void {
    commit("deleteOrder", payload);
  },
};
