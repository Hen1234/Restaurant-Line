import { state } from "@/store/modules/delivery/delivery.state";
import { actions } from "@/store/modules/delivery/delivery.actions";
import { mutations } from "@/store/modules/delivery/delivery.mutations";

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
