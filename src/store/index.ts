import Vue from "vue";
import Vuex from "vuex";
import Materials from "@/store/modules/materials";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: { Materials },
  // modules: {Materials: {namespaced:true}},

});
