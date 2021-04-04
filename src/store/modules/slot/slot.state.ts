import { Slot } from "@/types/Slot";

export interface SlotStateInterface {
  slots: Array<Slot>;
}

export const state: SlotStateInterface = {
  slots: [],
};
