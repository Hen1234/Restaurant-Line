import { Order } from "@/types/Order";
import { MaterialsIds } from "@/types/Material";

interface OrderStateInterface {
  orders: Array<Order>;
  counter: number;
}

export const state: OrderStateInterface = {
  orders: [
    {
      orderID: 5,
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
      ],
    },
  ],
  counter: 3,
};
