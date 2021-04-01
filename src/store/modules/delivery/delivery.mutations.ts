import { DeliveryStateInterface } from "@/store/modules/delivery/delivery.state";
import { Delivery } from "@/types/Delivery";

export const mutations = {
  addDelivery(state: DeliveryStateInterface, delivery: Delivery): void {
    state.deliveries.push(delivery);
  },
};
