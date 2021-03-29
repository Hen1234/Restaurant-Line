<template>
  <div class="container">
    <span class="header">Production Status</span>
    <production-item
      v-for="(slot, index) in slots"
      :key="index"
      :num="index"
      :image="slot.image"
      :orderID="slot.orderID"
      :producing="slot.producing.name"
      :time="slot.time"
      :status="slot.status"
    >
    </production-item>
  </div>
</template>

<script lang="ts">
import ProductionItem from "@/components/item/ProductionItem.vue";
import { Component, Vue } from "vue-property-decorator";
import { Slot } from "@/types/Slot.ts";
@Component({
  name: "ProductionStatus",
  components: {
    ProductionItem,
  },
})
export default class ProductionStatus extends Vue {
  private slots: Array<Slot> = [
    {
      image: "/img/Hamburger.9f33cc71.jpg",
      orderID: 62,
      producing: { priority: 0, name: "Hamburger", materials: [] },
      time: "01:15:00",
      status: "6",
      isAvailable: true,
    },
    {
      image: "/img/Salad.bcb2ab29.jpg",
      orderID: 63,
      producing: { priority: 0, name: "Salad", materials: [] },
      time: "00:30:00",
      status: "7",
      isAvailable: true,
    },
  ];
}
</script>

<style scoped>
.container {
  flex: 1;
}
.header {
  font-size: 20px;
}
</style>
