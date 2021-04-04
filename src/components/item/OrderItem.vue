<template>
  <div class="container">
    <div
      v-for="product in order.products"
      :key="product.name"
      class="slot-details"
    >
      <div class="slot-image">
        <img class="slot-image" :src="resolveImageUrl(product.name)" />
      </div>
      <div class="slot-details-product">
        <div><span class="attribute">Order ID:</span> {{ order.orderID }}</div>
        <div><span class="attribute">Producing:</span> {{ product.name }}</div>
        <div>
          <span class="attribute">Estimated Time:</span>
          {{ productTotalTime(product) }} ms
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
import { Component, Emit, Mixins, Prop } from "vue-property-decorator";
import { Product } from "@/types/Product";
import ResolveImageUrlMixin from "@/mixins/ResolveImageUrlMixin.vue";
import { Order } from "@/types/Order";

@Component({
  name: "OrderItem",
})
export default class OrderItem extends Mixins(ResolveImageUrlMixin) {
  @Prop() order!: Order;
  orderTotalTime = 0;
  @Emit("delete-order")
  orderTimeOver(): void {
    //todo: no content
    console.log("delete-order");
  }

  created() {
    for (let i = 0; i < this.order.products.length; i++) {
      for (let j = 0; j < this.order.products[i].materials.length; j++) {
        this.orderTotalTime += this.order.products[i].materials[
          j
        ].productionTime;
      }
    }
    setTimeout(this.orderTimeOver, this.orderTotalTime + 5000);
  }

  resolveImageUrl(imageName: string): string {
    return this.resolveImageUrlMixin(imageName);
  }

  productTotalTime(product: Product): number {
    return product.materials.reduce<number>((carry, material) => {
      carry += material.productionTime;
      // this.orderTotalTime += carry;//may cause infinity loop
      return carry;
    }, 0);
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 5px;
}
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
