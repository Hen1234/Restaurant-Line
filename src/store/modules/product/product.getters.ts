import { GetterTree } from "vuex";
import { ProductStateInterface } from "@/store/modules/product/product.state";
import { AppState } from "@/store";
import { Material } from "@/types/Material";

export const getters: GetterTree<ProductStateInterface, AppState> = {
  materialsKeyedById(state): Record<string, Material> {
    return state.materials.reduce<Record<string, Material>>(
      (carry, material) => {
        return {
          ...carry,
          [material.id]: material,
        };
      },
      {}
    );
  },
};
