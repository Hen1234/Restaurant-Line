<template>
  <div class="container">
    <span class="header">Delivery Status</span>
    <div class="delivery-item">
      <delivery-item
        v-for="(delivery, index) in deliveries"
        :key="index"
        :orderID="delivery.orderID"
        :time="delivery.time"
        :inDelivery="delivery.inDelivery"
        :deliveryID="delivery.deliveryID"
      >
      </delivery-item>
      <button class="addButton" @click="addNewDelivery">
        Add New Delivery
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import DeliveryItem from "@/components/item/DeliveryItem.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Delivery } from "@/types/Delivery.ts";
import { namespace } from "vuex-class";
import { Order } from "@/types/Order";
const DeliveryModule = namespace("delivery");
const OrderModule = namespace("order");
@Component({
  name: "DeliveryStatus",
  components: {
    DeliveryItem,
  },
})
export default class DeliveryStatus extends Vue {
  @DeliveryModule.State((state) => state.deliveries)
  deliveries!: Array<Delivery>;
  @OrderModule.Getter("ReadyForDelivery")
  ReadyForDeliveriesOrders!: Array<Order>;
  @DeliveryModule.Action("addNewDelivery") addNewDelivery!: () => void;
  @DeliveryModule.Action("addOrderToDelivery") addOrderToDelivery !: void;

  //watch delivery orders
  @Watch("ReadyForDelivery")
  newOrderToDelivery(): void {
    this.addNewOrderToDelivery();
  }

  addNewOrderToDelivery() {
    const availableDeliver = this.deliveries.find((delivery)=> !delivery.inDelivery);
    if(availableDeliver){
      this.addOrderToDelivery({deliveryID: availableDeliver.deliveryID, orderID:this.ReadyForDeliveriesOrders[this.ReadyForDeliveriesOrders.length-1].orderID })

    }
  }
}
</script>

<style scoped>
.header {
  font-size: 20px;
}

.delivery-item {
  display: flex;
  justify-content: space-between;
}
.addButton {
  margin-top: 5px;
}
</style>
