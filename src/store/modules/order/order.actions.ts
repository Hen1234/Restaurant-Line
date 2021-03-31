import { Order } from "@/types/Order";
import {ActionContext} from "vuex";
import {Product} from "@/types/Product";
import {Customer} from "@/types/Customer";

export const actions = {
  //todo: context type
  addNewOrderAction(context: ActionContext<any, any>, order: Order): void {
    context.commit("addNewOrder", order);
  },
};
