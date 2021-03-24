<template>
  <div class="container">
    <queue-status></queue-status>
    <production-status></production-status>
    <delivery-status></delivery-status>

  </div>

</template>

<script>
import QueueStatus from "@/components/status/QueueStatus";
import ProductionStatus from "@/components/status/ProductionStatus";
import DeliveryStatus from "@/components/status/DeliveryStatus";

export default {
  components: {
    QueueStatus,
    ProductionStatus,
    DeliveryStatus
  }

}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 10px;
  flex: 1;

}
</style>