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

<script>
import DeliveryItem from "@/components/item/DeliveryItem";
export default {
  name: "DeliveryStatus",
  components: { DeliveryItem },
  data: function () {
    return {
      deliveries: [
        { orderID: "51", time: "01:15:00", inDelivery: "true" },
        { orderID: "52", time: "00:25:00", inDelivery: "true" },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  /*flex: 1;*/
  /*width: 50%;*/
}
.header {
  font-size: 20px;
}

.delivery-item {
  display: flex;
  justify-content: space-between;
}
</style>
