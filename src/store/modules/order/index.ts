import { state } from "@/store/modules/order/order.state";
import { actions } from "@/store/modules/order/order.actions";
import { mutations } from "@/store/modules/order/order.mutations";
import { getters } from "@/store/modules/order/order.getters";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
