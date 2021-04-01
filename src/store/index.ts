import Vue from "vue";
import Vuex, { Store } from "vuex";
import product from "./modules/product";
import order from "./modules/order";
import slot from "./modules/slot";
import delivery from "./modules/delivery";

Vue.use(Vuex);

export interface AppState {
  version: number;
}

const store: Store<AppState> = new Vuex.Store<AppState>({
  state: {
    version: 1,
  },
  mutations: {},
  actions: {},
  modules: {
    product,
    order,
    slot,
    delivery,
  },
});

export default store;
