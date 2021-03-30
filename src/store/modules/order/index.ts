import { state } from "@/store/modules/order/order.state";
import { actions } from "@/store/modules/order/order.actions";
import { mutations } from "@/store/modules/order/order.mutations";

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
