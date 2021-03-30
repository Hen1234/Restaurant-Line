import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product";
import order from "./modules/order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    order,
  },
});
