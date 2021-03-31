<template>
  <div class="container">
    <div v-if="showDialogProp" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="showDialogProp">
        <header>
          <h2>Yor order has been submitted</h2>
        </header>
        <div>
          <button @click="close">close</button>
        </div>
      </dialog>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "BaseDialog",
})
export default class BaseDialog extends Vue {
  @Prop() showDialogProp!: boolean;
  @Emit("closeModal")
  close(): void {
    //todo: no content
    console.log("close modal");
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
}

dialog {
  position: fixed;
  top: 30vh;
  left: 30%;
  width: 400px;
  min-width: 400px;
  height: 20%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  margin: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
