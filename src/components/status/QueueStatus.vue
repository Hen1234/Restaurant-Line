<template>
  <div class="container">
    <span class="header">Queue Status</span>
    <queue-item
      v-for="(queue, index) in queues"
      :num="index"
      :key="index"
      :count="queue.count"
    >
    </queue-item>
  </div>
</template>

<script>
import QueueItem from "@/components/item/QueueItem";

export default {
  name: "QueueStatus",
  components: {
    QueueItem,
  },

  data: function () {
    return {
      queues: [{ count: "5" }, { count: "4" }, { count: "5" }],
    };
  },
};
</script>

<style scoped>
.container {
}

.header {
  font-size: 20px;
}
</style>
