<template>
  <div class="menu-item">
    <div class="item-image">
      <img src="../../../src/images/item.png" />
    </div>
    <div v-if="hover" class="item-label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: ["hover", "label"],
};
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
</style>
