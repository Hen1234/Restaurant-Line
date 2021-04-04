<template>
  <div v-if="!emptySLot" class="container">
    <div class="slot-num">Production Slot #{{ slotNum }}</div>
    <order-item
      class="orders"
      v-for="(order, index) in orders"
      @delete-order="deleteThisOrder(index, order.orderID)"
      :key="order.orderID"
      :order="order"
    >
    </order-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OrderItem from "@/components/item/OrderItem.vue";
import { namespace } from "vuex-class";
import { Slot } from "@/types/Slot";
import { Delivery } from "@/types/Delivery";
const SlotModule = namespace("slot");
const DeliveryModule = namespace("delivery");

@Component({
  name: "SlotItem",
  components: { OrderItem },
})
export default class SlotItem extends Vue {
  @Prop() slotNum!: number;
  @SlotModule.State((state) => state.slots) slots!: Array<Slot>;
  // @SlotModule.Action("deleteOrderFromSlot") deleteOrderFromSlot!: ({
  //   slotID: number,
  //   index: number,
  // }) => void;
  @SlotModule.Action("deleteOrderFromSlot") deleteOrderFromSlot!: ({slotID, index}:{slotID: number, index: number}) => void;
  @DeliveryModule.Action("addDeliveryAction") addNewDelivery!: (
    delivery: Delivery
  ) => void;

  get orders() {
    return this.slots[this.slotNum - 1].orders;
  }
  get emptySLot(): boolean {
    return this.orders.length === 0;
  }

  deleteThisOrder(index: number, orderID: number): void {
    console.log(`order ${index}is deleted`);
    // this.ordersSlot.splice(this.ordersSlot[index]);
    // this.ordersSlot[index] = undefined;
    this.deleteOrderFromSlot({ slotID: this.slotNum - 1, index });
    this.addNewDelivery({
      orderID,
      time: "00:00:00",
      inDelivery: true,
      isFailed: false,
    });
  }
}
</script>

<style scoped>
.slot-num {
  margin-top: 10px;
}
</style>
