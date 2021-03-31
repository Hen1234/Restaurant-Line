import {Product} from "@/types/Product";
import {Customer} from "@/types/Customer";

export interface Order {
  orderID: number;
  products: Product[];
  customer: Customer;
  comments: string;
}