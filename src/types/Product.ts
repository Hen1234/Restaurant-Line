import {ProductMaterial} from "@/types/ProductMaterial";

export interface Product {
  name: string;
  priority: number;
  materials: ProductMaterial[];
}
