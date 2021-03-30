<template>
  <div class="container">
    <div v-if="showDialogProp" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="showDialogProp">
        <header>
          <slot name="header">
            <h2>Yor order has been submitted</h2>
          </slot>
        </header>
        <div>
          <button @click="close">close</button>
        </div>
        <section>
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop } from "vue-property-decorator";

@Component({
  name: "BaseDialog",
})
export default class BaseDialog {
  @Prop() showDialogProp: boolean;
  @Emit("closeModal")
  close() {
    return false;
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 30%;
  height: 20%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  padding: 0;
  margin: 0;
  background-color: white;
}
</style>
