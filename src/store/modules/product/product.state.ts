import { MaterialsIds, Material } from "@/types/Material";
import { Product } from "@/types/Product";

export interface ProductStateInterface {
  materials: Array<Material>;
  products: Array<Product>;
}

export const state: ProductStateInterface = {
  materials: [
    {
      id: MaterialsIds.Tomato,
      name: MaterialsIds.Tomato,
      count: 50,
      productionTime: 5000,
    },
    {
      id: MaterialsIds.Onion,
      name: MaterialsIds.Onion,
      count: 100,
      productionTime: 10000,
    },
    {
      id: MaterialsIds.Steak,
      name: MaterialsIds.Steak,
      count: 30,
      productionTime: 30000,
    },
    {
      id: MaterialsIds.Lettuce,
      name: MaterialsIds.Lettuce,
      count: 20,
      productionTime: 3000,
    },
    {
      id: MaterialsIds.Cucumber,
      name: MaterialsIds.Cucumber,
      count: 50,
      productionTime: 5000,
    },
    {
      id: MaterialsIds.Mushroom,
      name: MaterialsIds.Mushroom,
      count: 20,
      productionTime: 5000,
    },
  ],
  products: [
    {
      name: "Hamburger",
      order: 0,
      priority: 0,
      materials: [
        { material: MaterialsIds.Tomato, isMust: true },
        { material: MaterialsIds.Onion, isMust: false },
        { material: MaterialsIds.Steak, isMust: true },
        { material: MaterialsIds.Lettuce, isMust: false },
      ],
    },
    {
      name: "Salad",
      priority: 0,
      order: 1,
      materials: [
        { material: MaterialsIds.Tomato, isMust: true },
        { material: MaterialsIds.Onion, isMust: false },
        { material: MaterialsIds.Lettuce, isMust: true },
        { material: MaterialsIds.Cucumber, isMust: false },
        { material: MaterialsIds.Mushroom, isMust: false },
      ],
    },
  ],
};
