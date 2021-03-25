<template>
  <div class="queue">
    <div class="queue-name">Queue #{{ num + 1 }}</div>
    <!--    <div class="queue-name">Queue #{{ num + 1 }} {{ count }}</div>-->
    <!--    <queue-logo v-for="(logo, index) in logoArr" :key="index"></queue-logo>-->
    <queue-logo></queue-logo>
    <queue-logo></queue-logo>
    <queue-logo></queue-logo>
    <queue-logo></queue-logo>
    <queue-logo></queue-logo>
  </div>
</template>

<script lang="ts">
import QueueLogo from "@/components/logo/QueueLogo";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "QueueItem",
  components: {
    QueueLogo,
  },
})
export default class QueueItem extends Vue {
  @Prop() num: number;
  @Prop() count: number;
}
</script>

<style scoped>
.queue {
  border: 1px solid black;
  margin-top: 10px;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}
.queue-name {
  margin-left: 15px;
}
</style>
