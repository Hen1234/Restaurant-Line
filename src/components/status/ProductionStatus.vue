<template>
  <div class="container">
    <span class="header">Production Status</span>
    <button class="newSlotButton" @click="addNewSlot">Add New Slot</button>
    <SlotItem
      v-for="slot in slots"
      :key="slot.slotID"
      :ordersSlot="slot.orders"
      :slot-num="slot.slotID"
      @vacantSlot="vacantSlot(event, slot.slotID)"
    />
  </div>
</template>

<script lang="ts">
import ProductionItem from "@/components/item/OrderItem.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Slot } from "@/types/Slot.ts";
import { namespace } from "vuex-class";
import { Order, OrderStatus } from "@/types/Order";
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
  @OrderModule.Getter("readyToBeProduced") readyToBeProducedOrders!: Array<Order>;
  @OrderModule.Getter("BeingPrepared") BeingPreparedOrders!: Array<Order>;
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
    this.processNewOrder(newOrderId);
  }

  processNewOrder(orderID: number): void {
    const vacantSlot = this.slots.find(
      (slot) =>
        slot.orders.length === 0 || slot.produceCapacity > slot.orders.length
    );

    if (vacantSlot) {
      this.addOrderToSlot({
        order: this.readyToBeProducedOrders[this.readyToBeProducedOrders.length - 1],
        slotID: vacantSlot.slotID,
      });
      this.readyToBeProducedOrders[this.readyToBeProducedOrders.length - 1].status = OrderStatus.BeingPrepared;
    }
  }

  vacantSlot(orderID: number, slotID: number): void {
    console.log(orderID);
    console.log(slotID)
    console.log(this.BeingPreparedOrders)
    const preparedOrder = this.BeingPreparedOrders.find(
      (order) => order.orderID === orderID
    );
    if (preparedOrder) {
      console.log("readeForDelivery");
      preparedOrder.status = OrderStatus.ReadyForDelivery;
    }
    if (this.readyToBeProducedOrders) {
      const unHandledOrder = this.readyToBeProducedOrders.find(
        (order) => order.status === OrderStatus.ReadyToBeProduced
      );
      if (unHandledOrder) {
        this.addOrderToSlot({
          order: this.readyToBeProducedOrders[this.readyToBeProducedOrders.length - 1],
          slotID: slotID,
        });
        unHandledOrder.status = OrderStatus.BeingPrepared;
      }
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
