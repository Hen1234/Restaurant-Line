<template>
  <div class="container">
    <span class="header">Production Status</span>
    <production-item
      v-for="(slot, index) in slots"
      :key="index"
      :num="index"
      :image="slot.image"
      :orderID="slot.orderID"
      :producing="slot.producing"
      :time="slot.time"
      :status="slot.status"
    >
    </production-item>
  </div>
</template>

<script>
import ProductionItem from "@/components/item/ProductionItem";
export default {
  name: "ProductionStatus",
  components: { ProductionItem },
  data: function () {
    return {
      slots: [
        {
          image: "/img/Hamburger.9f33cc71.jpg",
          orderID: "62",
          producing: "Hamburger",
          time: "01:15:00",
          status: "6",
        },
        {
          image: "/img/Salad.bcb2ab29.jpg",
          orderID: "63",
          producing: "Salad",
          time: "00:30:00",
          status: "7",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  flex: 1;
}
.header {
  font-size: 20px;
}
</style>
