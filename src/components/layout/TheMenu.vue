<template>
  <div class="container" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="item">
      <menu-item :hover="hover" label="New Order" link="new-order"></menu-item>
    </div>
    <div class="item">
      <menu-item :hover="hover" label="Item 2"></menu-item>
    </div>
    <div class="item">
      <menu-item :hover="hover" label="Item 3"></menu-item>
    </div>
    <div class="item">
      <menu-item :hover="hover" label="Item 4"></menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuItem from "@/components/item/MenuItem.vue";

@Component({
  name: "TheMenu",
  components: {
    MenuItem,
  },
})
export default class TheMenu extends Vue {
  public hover: boolean;
  constructor() {
    super();
    this.hover = false;
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 80px;
  border: 2px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;
  transition: 1s;

  &:hover {
    width: 200px;
  }
}
</style>
