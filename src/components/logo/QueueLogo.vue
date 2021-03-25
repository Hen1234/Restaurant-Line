<template>
  <div class="queue-logo"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "QueueLogo",
})
export default class QueueLogo extends Vue {}
</script>

<style scoped>
.queue-logo {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: green;
  border: 1px solid black;
  margin-left: 10px;
}
</style>
