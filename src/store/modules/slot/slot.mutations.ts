import { Order } from "@/types/Order";
import { SlotStateInterface } from "@/store/modules/slot/slot.state";
import { MutationTree } from "vuex";

export const mutations: MutationTree<SlotStateInterface> = {
  addNewOrder(state, payload: { order: Order; slotID: number }): void {
    state.slots[payload.slotID - 1].orders.push(payload.order);
  },

  deleteOrder(state, payload: { slotID: number; index: number }): void {
    state.slots[payload.slotID].orders.splice(payload.index);
  },
  addNewSlot(state, slot) {
    state.slots.push(slot);
  },
};
