import {Product} from "@/types/Product";

export interface Order {
  orderID: number;
  products: Product[];
}