import { Slot } from "@/types/Slot";

export interface SlotStateInterface {
  slots: Array<Slot>;
}

export const state: SlotStateInterface = {
  slots: [
    { slotID: 1, totalCount: 2, orders: [] },
    { slotID: 2, totalCount: 1, orders: [] },
  ],
};
