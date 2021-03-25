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
      >
      </delivery-item>
    </div>
  </div>
</template>

<script lang="ts">
import DeliveryItem from "@/components/item/DeliveryItem.vue";
import { Component, Vue } from "vue-property-decorator";
import { Delivery } from "@/types/Delivery.ts";
@Component({
  name: "DeliveryStatus",
  components: {
    DeliveryItem,
  },
})
export default class DeliveryStatus extends Vue {
  private deliveries: Array<Delivery> = [
    { orderID: 51, time: "01:15:00", inDelivery: true },
    { orderID: 52, time: "00:25:00", inDelivery: true },
  ];
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
</style>
