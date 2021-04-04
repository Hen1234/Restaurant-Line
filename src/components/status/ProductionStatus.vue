<template>
  <div class="container">
    <span class="header">Production Status</span>
    <button class="newSlotButton" @click="addNewSlot">Add New Slot</button>
    <SlotItem
      v-for="slot in slots"
      :key="slot.slotID"
      :ordersSlot="slot.orders"
      :slot-num="slot.slotID"
    />
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
  @OrderModule.Getter("readyToBeProduced") orders!: Array<Order>;
  @OrderModule.State((state) => state.currentOrderId)
  currentOrderId!: number;
  @SlotModule.State((state) => state.slots) slots!: Array<Slot>;
  @SlotModule.Action("addNewOrderToSlotAction") addOrderToSlot!: ({
    order,
    slotID,
  }: {
    order: Order;
    slotID: number;
  }) => void;
  @SlotModule.Action("addNewSlot") addNewSlot!: () => void;

  @Watch("currentOrderId", { deep: true })
  newOrderWatcher(newOrderId: number): void {
    console.log("Okay");
    this.processNewOrder(newOrderId);
  }

  processNewOrder(orderID: number): void {
    const vacantSlot = this.slots.find((slot) => slot.orders.length === 0);

    if (vacantSlot) {
      // this.addOrderToSlot();
    }
  }
  //   if (this.ordersState.length !== 0) {
  //     if (this.slots[0].produceCapacity === this.slots[0].orders.length) {
  //       this.addOrderToSlot({
  //         order: this.ordersState[this.ordersState.length - 1],
  //         slotID: 2,
  //       });
  //     } else {
  //       this.addOrderToSlot({
  //         order: this.ordersState[this.ordersState.length - 1],
  //         slotID: 1,
  //       });
  //     }
  //   }
  // }
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

.newSlotButton {
  margin-left: 5px;
}
</style>
