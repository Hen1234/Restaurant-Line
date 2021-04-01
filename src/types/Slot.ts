import { Product } from "@/types/Product";
import {Order} from "@/types/Order";

export interface Slot {
  // image: string;
  // orderID: number;
  // producing: Product;
  // time: string;
  // status: string;
  // isAvailable: boolean;
  slotID: number;
  totalCount: number;
  orders: Array<Order>
}
