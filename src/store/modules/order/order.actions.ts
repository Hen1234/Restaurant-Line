import { Order } from "@/types/Order";
import {ActionContext} from "vuex";

export const actions = {
  //todo: context type
  addNewOrderAction(context: ActionContext<any, any>, order: Order): void {
    context.commit("addNewOrder", order);
  },
};
