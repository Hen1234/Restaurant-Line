<template>
  <div class="home">
    <div class="header">
      <the-header></the-header>
    </div>
    <div class="menu-and-content">
      <the-menu></the-menu>
      <the-content></the-content>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TheHeader from "@/components/layout/TheHeader.vue"; // @ is an alias to /src
import TheMenu from "@/components/layout/TheMenu.vue";
import TheContent from "@/components/layout/TheContent.vue";

@Component({
  components: {
    TheHeader,
    TheMenu,
    TheContent
  },
})
export default class Home extends Vue {
  // @Prop({
  //   type: String,
  //   required: true
  // }) name: number;
  // helloWorld() {
  //   console.log(`Hello ${this.name}, how are you?`);
  // }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.menu-and-content {
  display: flex;
  flex: 1;
}
</style>
