<template>
  <div class="menu-item">
    <div class="item-image">
      <img src="../../../src/images/item.png" />
    </div>
    <div v-if="hover" class="item-label">
      <router-link :to="'/' + label">{{ label }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "MenuItem",
})
export default class MenuItem extends Vue {
  @Prop() hover!: boolean;
  @Prop() label!: string;
}
</script>

<style scoped lang="scss">
.menu-item {
  display: flex;
  align-items: center;
}
.item-image {
  height: 50px;
  width: 50px;
  margin: 10px 0 0 7px;
  display: flex;
}
.item-label {
  margin: 10px 0 0 7px;
  min-width: 50px;
}
a {
  text-decoration: none;
}
</style>
