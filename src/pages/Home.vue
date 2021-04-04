<template>
  <div class="container">
    <queue-status></queue-status>
    <production-status></production-status>
    <delivery-status></delivery-status>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductionStatus from "@/components/status/ProductionStatus.vue";
import DeliveryStatus from "@/components/status/DeliveryStatus.vue";
import QueueStatus from "@/components/status/QueueStatus.vue";

@Component({
  name: "Home",
  components: {
    ProductionStatus,
    DeliveryStatus,
    QueueStatus,
  },
})
export default class Home extends Vue {}
</script>

<style scoped></style>
