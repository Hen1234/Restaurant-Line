import { GetterTree } from "vuex";
import { ProductStateInterface } from "@/store/modules/product/product.state";
import { AppState } from "@/store";

export const getters: GetterTree<ProductStateInterface, AppState> = {
  materialsKeyedById(state) {
    // Current value
    // [
    //   { id: "tomato", name: "tomato", count: 50 },
    //   { id: "onion", name: "onion", count: 100 },
    //   { id: "steak", name: "steak", count: 30 },
    //   { id: "lettuce", name: "lettuce", count: 20 },
    //   { id: "cucumber", name: "cucumber", count: 50 },
    //   { id: "mushroom", name: "mushroom", count: 20 },
    // ];

    // Should return
    // {
    //   tomato: { id: "tomato", name: "tomato", count: 50 },
    //   onion: { id: "onion", name: "onion", count: 100 },
    // };
    return state.materials;
  },
};
