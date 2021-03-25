import { Product } from "@/types/Product";

export interface Slot {
  image: string;
  orderID: number;
  producing: Product;
  time: string;
  status: string;
  isAvailable: boolean;
}
