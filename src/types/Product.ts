import { Material } from "@/types/Material";

export interface Product {
  name: string;
  priority: number;
  materials: Material[];
}
