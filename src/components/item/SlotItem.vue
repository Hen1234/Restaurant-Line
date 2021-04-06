<template>
  <div class="container">
    <div class="slot-num">Production Slot #{{ slotNum }}</div>
    <template v-if="isSlotEmpty">
      <div>Ready for produce.</div>
    </template>
    <template v-else>
      <OrderItem
        class="orders"
        v-for="(order, index) in orders"
        @delete-order="deleteThisOrder(index, order.orderID)"
        :key="order.orderID"
        :order="order"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import OrderItem from "@/components/item/OrderItem.vue";
import { namespace } from "vuex-class";
import { Slot } from "@/types/Slot";
import { Delivery } from "@/types/Delivery";
import { Order, OrderStatus } from "@/types/Order";

const SlotModule = namespace("slot");
const DeliveryModule = namespace("delivery");

@Component({
  name: "SlotItem",
  components: { OrderItem },
})
export default class SlotItem extends Vue {
  @Prop() slotNum!: number;
  @SlotModule.State((state) => state.slots) slots!: Array<Slot>;
  @SlotModule.Action("deleteOrderFromSlot") deleteOrderFromSlot!: ({
    slotID,
    index,
  }: {
    slotID: number;
    index: number;
  }) => void;
  @DeliveryModule.Action("addDeliveryAction") addNewDelivery!: (
    delivery: Delivery
  ) => void;

  @Emit("vacantSlot")
  vacantSlot(orderID: number): void {
    console.log(`orderID  from slot: ${orderID}`);
    this.$emit("vacantSlot", { slotID: this.slotNum, orderID: orderID });
    // console.log(`vacant slot${this.slotNum}`);
  }
  get orders(): Order[] {
    return this.slots[this.slotNum - 1].orders;
  }
  get isSlotEmpty(): boolean {
    return this.orders.length === 0;
  }

  deleteThisOrder(index: number, orderID: number): void {
    console.log(`order ${index}is deleted`);
    this.deleteOrderFromSlot({ slotID: this.slotNum - 1, index });
    this.vacantSlot(orderID);
    // this.addNewDelivery({
    //   orderID,
    //   time: "00:00:00",
    //   inDelivery: true,
    //   isFailed: false,
    // });
  }
}
</script>

<style scoped>
.slot-num {
  margin-top: 10px;
}
</style>
