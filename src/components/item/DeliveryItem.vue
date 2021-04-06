<template>
  <div class="container">
    <div v-if="orderID!==0" class="delivery-details">
      <div><span class="attribute">Order ID:</span> {{ orderID }}</div>
      <div><span class="attribute">Time Left:</span> {{ time }}</div>
    </div>
    <div v-else>
      Delivery {{deliveryID}}
    </div>
    <div class="in-delivery" v-if="inDelivery">
      <span>In delivery</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "DeliveryItem",
})
export default class DeliveryItem extends Vue {
  @Prop() orderID!: number;
  @Prop() time!: string;
  @Prop() inDelivery!: boolean;
  @Prop() deliveryID!: number
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  height: 50px;
  margin-top: 10px;
}
.attribute {
  text-decoration: underline;
}
.delivery-details {
  margin-left: 15px;
}
.in-delivery {
  border: 1px solid black;
  background-color: orange;
  width: 100px;
  height: 40px;
  margin-right: 5px;
  margin-left: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
