<template>
  <div class="container">
    <div class="slot-num">Production Slot #{{ orderID }}</div>
    <div v-for="product in products" :key="product.name" class="slot-details">
      <div class="slot-image">
        <img class="slot-image" :src="resolveImageUrl(product.name)" />
      </div>
      <div class="slot-details-product">
        <div><span class="attribute">Order ID:</span> {{ orderID }}</div>
        <div><span class="attribute">Producing:</span> {{ product.name }}</div>
        <div>
          <span class="attribute">Estimated Time:</span>
          {{ totalTime(product) }} ms
        </div>
      </div>
      <div class="slot-details-status">
        <span class="attribute">Production Status:</span>
        <div class="status-images">
          <div v-for="material in product.materials" :key="material.id">
            <img class="status-image" :src="resolveImageUrl(material.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/types/Product";
@Component({
  name: "ProductionItem",
})
export default class ProductionItem extends Vue {
  @Prop() orderID!: number;
  @Prop() products!: Array<Product>;
  @Prop() slotNum!: number;

  resolveImageUrl(imageName: string): string {
    const images = require.context("../../images/", false, /\.jpg$/);
    return images(`./${imageName}.jpg`);
  }

  totalTime(product: Product): number {
    return product.materials.reduce<number>((carry, material) => {
      carry += material.productionTime;
      return carry;
    }, 0);
  }
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
    //display: flex;
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
