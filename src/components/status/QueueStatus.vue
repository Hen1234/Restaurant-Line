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

<script lang="ts">
import QueueItem from "@/components/item/QueueItem.vue";
import { Component, Vue } from "vue-property-decorator";
import { Queue } from "@/types/Queue";
@Component({
  name: "QueueStatus",
  components: {
    QueueItem,
  },
})
export default class QueueStatus extends Vue {
  private queues: Array<Queue> = [
    { id: 1, maxCount: 10, currentCount: 5 },
    { id: 2, maxCount: 10, currentCount: 4 },
    { id: 3, maxCount: 10, currentCount: 5 },
  ];
}
</script>

<style scoped>
.container {
}

.header {
  font-size: 20px;
}
</style>
