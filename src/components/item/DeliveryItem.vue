<template>
  <div class="container">
    <div class="delivery-details">
      <div><span class="attribute">Order ID:</span> {{ orderID }}</div>
      <div><span class="attribute">Time Left:</span> {{ time }}</div>
    </div>
    <div class="in-delivery" :v-if="inDelivery">
      <span>In delivery</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryItem",
  props: ["orderID", "time", "inDelivery"],
};
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
