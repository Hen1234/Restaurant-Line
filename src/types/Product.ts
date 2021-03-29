import { ProductMaterial } from "@/types/ProductMaterial";

export interface Product {
  order: number;
  name: string;
  priority: number;
  materials: ProductMaterial[];
}
