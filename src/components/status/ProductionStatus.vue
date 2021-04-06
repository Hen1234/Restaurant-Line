<template>
  <div class="container">
    <span class="header">Production Status</span>
    <button class="newSlotButton" @click="addNewSlot">Add New Slot</button>
    <SlotItem
      v-for="slot in slots"
      :key="slot.slotID"
      :ordersSlot="slot.orders"
      :slot-num="slot.slotID"
      @vacantSlot="vacantSlotHandle($event)"
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
const DeliveryModule = namespace("delivery");
@Component({
  name: "ProductionStatus",
  components: {
    SlotItem,
    ProductionItem,
  },
})
export default class ProductionStatus extends Vue {
  @OrderModule.Getter("readyToBeProduced")
  readyToBeProducedOrders!: Array<Order>;
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

  created(): void {
    console.log("hereCreatedStatus");
  }

  @Watch("currentOrderId", { deep: true })
  newOrderWatcher(): void {
    this.processNewOrder();
  }

  processNewOrder(): void {
    const vacantSlot = this.slots.find(
      (slot) =>
        slot.orders.length === 0 || slot.produceCapacity > slot.orders.length
    );

    if (vacantSlot) {
      this.addOrderToSlot({
        order: this.readyToBeProducedOrders[
          this.readyToBeProducedOrders.length - 1
        ],
        slotID: vacantSlot.slotID,
      });
      this.readyToBeProducedOrders[
        this.readyToBeProducedOrders.length - 1
      ].status = OrderStatus.BeingPrepared;
    }
  }

  vacantSlotHandle(event: { slotID: number; orderID: number }): void {
    console.log("hereFunction");
    console.log(event.orderID);
    console.log(event.slotID);

    const preparedOrder = this.BeingPreparedOrders.find(
      (order) => order.orderID === event.orderID
    );
    if (preparedOrder) {
      console.log("readeForDelivery");
      preparedOrder.status = OrderStatus.ReadyForDelivery;
    }
    console.log(this.BeingPreparedOrders);
    if (this.readyToBeProducedOrders) {
      const unHandledOrder = this.readyToBeProducedOrders.find(
        (order) => order.status === OrderStatus.ReadyToBeProduced
      );
      if (unHandledOrder) {
        this.addOrderToSlot({
          order: this.readyToBeProducedOrders[
            this.readyToBeProducedOrders.length - 1
          ],
          slotID: event.slotID,
        });
        unHandledOrder.status = OrderStatus.BeingPrepared;
      }
    }
  }
}
</script>

<style scoped>
.header {
  font-size: 20px;
}
.newSlotButton {
  margin-top: 5px;
  height: fit-content;
  width: fit-content;
}
</style>
