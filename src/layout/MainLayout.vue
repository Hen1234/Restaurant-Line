<template>
  <div class="home">
    <div class="header">
      <TheHeader />
    </div>
    <div class="menu-and-content">
      <TheMenu />
      <div class="content">
        <KeepAlive>
          <RouterView />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/layout/TheHeader.vue"; // @ is an alias to /src
import TheMenu from "@/components/layout/TheMenu.vue";

@Component({
  name: "MainLayout",
  components: {
    TheHeader,
    TheMenu,
  },
})
export default class MainLayout extends Vue {}
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

.content {
  display: flex;
  margin: 10px;
  flex: 1;
}
</style>
