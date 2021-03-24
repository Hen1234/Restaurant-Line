<template>
  <div class="container">
    <menu-item></menu-item>
    <menu-item></menu-item>
    <menu-item></menu-item>
    <menu-item></menu-item>
  </div>
</template>

<script>
import MenuItem from "@/components/item/MenuItem";

export default {
  components: {
    MenuItem,
  },
};
</script>

<style scoped>
.container {
  width: 80px;
  border: 2px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;

}
</style>
