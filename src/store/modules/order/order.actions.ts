import { Product } from "@/types/Product";
import { Order } from "@/types/Order";

// export default {
//
//
//   addNewOrder(): void {
//     console.log("actionnnnnnnnnn")
//     // context.commit("addNewOrder", newOrder);
//   },
// };

export const actions = {
  addNewOrderAction(context, order: Order): void {
    context.commit("addNewOrder", order);
    console.log(order);
  },
};
