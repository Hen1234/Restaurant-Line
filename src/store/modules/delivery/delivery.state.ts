import { Delivery } from "@/types/Delivery";

export interface DeliveryStateInterface {
  deliveries: Array<Delivery>;
}

export const state: DeliveryStateInterface = {
  deliveries: [],
};
