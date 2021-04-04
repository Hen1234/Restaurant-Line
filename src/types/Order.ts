import { Product } from "@/types/Product";
import { Customer } from "@/types/Customer";

export enum OrderStatus {
  ReadyToBeProduced,
  BeingPrepared,
  ReadyForDelivery,
}

export interface Order {
  orderID: number;
  products: Product[];
  customer: Customer;
  comments: string;
  status: OrderStatus;
}
