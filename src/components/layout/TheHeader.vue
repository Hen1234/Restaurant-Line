<template>
  <div class="container">
    <div class="logo">
      <logo></logo>
    </div>
    <div class="header-text">Restaurant Line</div>
  </div>
</template>

<script>
import logo from "@/components/logo/HeaderLogo.vue";

export default {
  components: {
    logo,
  },
};
</script>

<style scoped>
.container {
  border: 2px solid black;
  display: flex;
  align-items: center;
}

.header-text {
  margin-left: 20px;
  font-size: 30px;
}
</style>
