<template>
  <div class="container">
    <span class="header">Production Status</span>

    <!--    <production-item-->
    <!--      slotNum="1"-->
    <!--      :key="orderID"-->
    <!--      :orderID="orderID"-->
    <!--      :products="orderProducts"-->
    <!--    ></production-item>-->

    <production-item
      v-for="order in orders"
      slotNum="1"
      :key="order.orderID"
      :orderID="order.orderID"
      :products="order.products"
    >
    </production-item>
    <div class="noOrdersToShow" v-if="isOrdersEmpty">No orders on slots</div>
    <!--    <production-item v-if="isMoreThanOneOrder" slotNum="2"></production-item>-->
  </div>
</template>

<script lang="ts">
import ProductionItem from "@/components/item/ProductionItem.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Slot } from "@/types/Slot.ts";
import { namespace } from "vuex-class";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";

const OrderModule = namespace("order");
@Component({
  name: "ProductionStatus",
  components: {
    ProductionItem,
  },
})
export default class ProductionStatus extends Vue {
  @OrderModule.State((state) => state.orders) ordersState!: Array<Order>;
  @OrderModule.State((state) => state.currentOrderId)
  currentOrderIdState!: number;

  get orders() {
    return this.ordersState;
  }

  get isOrdersEmpty(): boolean {
    return this.ordersState.length === 0;
  }

  @Watch("orderStateLength", { deep: true })
  newOrder(value: string, oldValue: string): void {
    console.log("new order!!!!");
  }

  get orderStateLength(): number {
    console.log(this.ordersState.length);
    return this.ordersState.length;
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
