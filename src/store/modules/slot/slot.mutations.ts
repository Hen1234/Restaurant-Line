import { OrderStateInterface } from "@/store/modules/order/order.state";
import { Order } from "@/types/Order";
import { SlotStateInterface } from "@/store/modules/slot/slot.state";

export const mutations = {
  addNewOrder(
    state: SlotStateInterface,
    payload: { order: Order; slotID: number }
  ): void {
    state.slots[payload.slotID - 1].orders.push(payload.order);
  },

  deleteOrder(
    state: SlotStateInterface,
    payload: { slotID: number; index: number }
  ): void {
    state.slots[payload.slotID].orders.splice(payload.index);
  },
};
