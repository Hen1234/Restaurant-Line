<template>
  <div class="container">
    <span class="header">Production Status</span>
    <div class="slots" v-if="!isOrdersEmpty">
      <SlotItem
        v-for="slot in slots"
        :key="slot.slotID"
        :ordersSlot="slot.orders"
        :slot-num="slot.slotID"
      />
    </div>
    <div class="noOrdersToShow" v-if="isOrdersEmpty">No orders on slots</div>
  </div>
</template>

<script lang="ts">
import ProductionItem from "@/components/item/OrderItem.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Slot } from "@/types/Slot.ts";
import { namespace } from "vuex-class";
import { Order } from "@/types/Order";
import SlotItem from "@/components/item/SlotItem.vue";

const OrderModule = namespace("order");
const SlotModule = namespace("slot");
@Component({
  name: "ProductionStatus",
  components: {
    SlotItem,
    ProductionItem,
  },
})
export default class ProductionStatus extends Vue {
  @OrderModule.State((state) => state.orders) ordersState!: Array<Order>;
  @OrderModule.State((state) => state.currentOrderId)
  currentOrderIdState!: number;
  @SlotModule.State((state) => state.slots) slots!: Array<Slot>;
  // @SlotModule.Action("addNewOrderToSlotAction") addOrderToSlot!: ({
  //   order: Order,
  //   slotID: number,
  // }) => void;
  @SlotModule.Action("addNewOrderToSlotAction") addOrderToSlot!: ({
    order,
    slotID,
  }: {
    order: Order;
    slotID: number;
  }) => void;

  created(): void {
    console.log(this.currentOrderIdState);
    this.newOrder();
  }
  get isOrdersEmpty(): boolean {
    return this.ordersState.length === 0;
  }
  @Watch("orderStateLength", { deep: true })
  newOrderWatcher(value: string, oldValue: string): void {
    console.log(`new order!!!!1${value}`);
  }

  get orderStateLength(): number {
    // console.log(this.ordersState.length);
    // return this.ordersState.length;
    return this.currentOrderIdState;
  }

  newOrder(): void {
    if (this.ordersState.length !== 0) {
      if (this.slots[0].totalCount === this.slots[0].orders.length) {
        this.addOrderToSlot({
          order: this.ordersState[this.ordersState.length - 1],
          slotID: 2,
        });
      } else {
        this.addOrderToSlot({
          order: this.ordersState[this.ordersState.length - 1],
          slotID: 1,
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
.header {
  font-size: 20px;
}
.noOrdersToShow {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 15px;
}
</style>
