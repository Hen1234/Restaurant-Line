<template>
  <div class="container">
    <queue-status></queue-status>
    <production-status></production-status>
    <delivery-status></delivery-status>
  </div>
</template>

<script lang="ts">
import ProductionStatus from "@/components/status/ProductionStatus.vue";
import DeliveryStatus from "@/components/status/DeliveryStatus.vue";
import { Component, Vue } from "vue-property-decorator";
import QueueStatus from "@/components/status/QueueStatus.vue";

@Component({
  name: "TheContent",
  components: {
    QueueStatus,
    ProductionStatus,
    DeliveryStatus,
  },
})
export default class TheContent extends Vue {}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 10px;
  flex: 1;
}
</style>
