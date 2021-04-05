import { DeliveryStateInterface } from "@/store/modules/delivery/delivery.state";
import { Delivery } from "@/types/Delivery";

export const mutations = {
  addNewDelivery(state: DeliveryStateInterface, delivery: Delivery): void {
    state.deliveries.push(delivery);
  },
  addOrderToDelivery(state: DeliveryStateInterface, payload: {deliveryID: number, orderID: number}){
    const delivery = state.deliveries.find((delivery)=> delivery.deliveryID === payload.deliveryID);
    if(delivery) delivery.orderID = payload.orderID;
  }
};
