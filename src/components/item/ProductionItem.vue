<template>
  <div class="container">
    <div class="slot-num">Production Slot #{{ num + 1 }}</div>
    <div class="slot-details">
      <div class="slot-image">
        <img class="slot-image" :src="image" />
      </div>
      <div class="slot-details-product">
        <div><span class="attribute">Order ID:</span> {{ orderID }}</div>
        <div><span class="attribute">Producing:</span> {{ producing }}</div>
        <div><span class="attribute">Estimated Time:</span> {{ time }}</div>
      </div>
      <div class="slot-details-status">
        <span class="attribute">Production Status:</span>
        <div class="status-images">
          <img class="status-image" src="../../images/steak.jpg" />
          <img class="status-image" src="../../../src/images/tomato.jpg" />
          <img class="status-image" src="../../images/mushroom.jpg" />
          <img class="status-image" src="../../../src/images/lettuce.jpg" />
          <img class="status-image" src="../../../src/images/onion.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "ProductionItem",
})
export default class ProductionItem extends Vue {
  @Prop() num!: number;
  @Prop() image!: string;
  @Prop() orderID!: number;
  @Prop() producing!: string;
  @Prop() time!: string;
  @Prop() status!: string;
}
</script>

<style scoped lang="scss">
.slot-num {
  margin-top: 10px;
}
.slot-details {
  border: 1px solid black;
  display: flex;
  align-items: center;
  &-product {
    margin-left: 20px;
  }
  &-status {
    margin-left: 20px;
  }
}

.attribute {
  text-decoration: underline;
}

.slot-image {
  height: 80px;
  width: 100px;
}

.status-images {
  display: flex;
}
.status-image {
  height: 40px;
  width: 40px;
}
</style>
