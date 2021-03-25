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
  private queues: Array<Queue> = [{ count: 5 }, { count: 4 }, { count: 5 }];
}
</script>

<style scoped>
.container {
}

.header {
  font-size: 20px;
}
</style>
