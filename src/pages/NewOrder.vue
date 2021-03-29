<!--<template xmlns="http://www.w3.org/1999/html">-->
<template>
  <div class="container">
    <!--        <div>{{ getMaterialsList }}</div>-->
    <!--    <div>{{ getMaterialFromList("tomato") }}</div>-->

    <form class="form-container" >
      <div class="customer-details">
        <div class="header">Delivery information</div>
        <div class="field">
          <input
            class="field-input"
            id="full-name"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            id="phone"
            type="text"
            placeholder="Your Phone"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            id="street"
            type="text"
            placeholder="Street Address"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            id="street2"
            type="text"
            placeholder="Street Address 2"
          />
        </div>
        <div class="field">
          <input
            class="field-input-address"
            id="city"
            type="text"
            placeholder="City"
          />
          <input
            class="field-input-address-right"
            id="state"
            type="text"
            placeholder="State / Province"
          />
        </div>
        <div class="field">
          <input
            class="field-input-address"
            id="zip"
            type="text"
            placeholder="Portal / Zip Code"
          />
          <select class="field-input-address-right" id="country">
            <option selected="selected">Select Country</option>
            <option value="Israel">Israel</option>
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
          </select>
        </div>
        <div class="field">
          <textarea
            class="field-input-comments"
            type="text"
            placeholder="Comments for delivery"
          ></textarea>
        </div>
      </div>
      <div class="choose-product">
        <div class="header">Choose products</div>
        <select
          @change="productChange($event)"
          class="field field-input"
          name="selectedProduct"
          v-model="selectedProduct"
        >
          <!--          <option selected="selected">Select Product</option>-->
          <option
            v-for="product in products"
            :key="product.name"
            :value="product.name"
          >
            {{ product.name }}
          </option>
        </select>
        <div v-if="selectedProduct" class="product-details">
          <div class="materials-list">
            <div
              v-for="material in productMaterials"
              :key="material.name"
              class="product-material"
            >
              {{ material.name }}
            </div>
          </div>
          <div class="field materials-option">
            <div v-for="material in productMaterialsOpt" :key="material.name">
              <input
                :id="material.name"
                type="checkbox"
                v-model="selectedMaterials"
                :value="material.name"
              />{{ material.name }}
            </div>
          </div>
          <div class="field">
            <button type="button" @click="updateOrder">Add to order</button>
          </div>
        </div>
      </div>
    </form>
    <div v-if="hasProduct" class="order-summary">
      <div class="header">Order summary</div>
      <div
        class="order-details"
        v-for="product in selectedProducts"
        :key="product.name"
      >
        {{ product.name }} with
        {{ product.materials }}
      </div>
      <div class="field">
        <button @click="submitOrder">Place order</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Material } from "@/types/Material";
import { Product } from "@/types/Product";
import { ProductMaterial } from "@/types/ProductMaterial";
// const materials = namespace("Materials");
@Component({
  name: "NewOrder",
})
export default class NewOrder extends Vue {
  products: Product[];
  materials: Material[];
  productMaterials: Material[];
  productMaterialsOpt: Material[];
  selectedProduct: string;
  selectedProducts: string[];
  selectedMaterials: string[];
  hasProduct: boolean;
  constructor() {
    super();
    this.hasProduct = false;
    this.selectedProduct = "";
    this.materials = [
      { name: "tomato", count: 50 },
      { name: "onion", count: 100 },
      { name: "steak", count: 30 },
      { name: "lettuce", count: 20 },
      { name: "cucumber", count: 50 },
      { name: "mushroom", count: 20 },
    ];
    this.products = [
      {
        name: "Hamburger",
        priority: 0,
        materials: [
          { material: this.materials[0], isMust: true },
          { material: this.materials[1], isMust: false },
          { material: this.materials[2], isMust: true },
          { material: this.materials[3], isMust: false },
        ],
      },
      {
        name: "Salad",
        priority: 0,
        materials: [
          { material: this.materials[0], isMust: true },
          { material: this.materials[1], isMust: false },
          { material: this.materials[3], isMust: true },
          { material: this.materials[4], isMust: false },
          { material: this.materials[5], isMust: false },
        ],
      },
    ];
    this.productMaterials = [];
    this.selectedMaterials = [];
    this.selectedProducts = [];
    this.productMaterialsOpt = [];
  }

  productChange(event): void {
    this.selectedProduct = event.target.value;
    const tempArr: ProductMaterial[] = this.products.find(
      (p) => p.name === event.target.value
    ).materials;
    for (let i = 0; i < tempArr.length; i++) {
      this.productMaterials.push(tempArr[i].material);
    }
    const matArr = tempArr.filter((mat) => !mat.isMust);
    for (let i = 0; i < matArr.length; i++) {
      this.productMaterialsOpt.push(matArr[i].material);
    }
    console.dir(this.productMaterials);
  }

  updateOrder(): void {
    this.hasProduct = true;
    this.selectedProducts.push({
      name: this.selectedProduct,
      materials: this.selectedMaterials.toString(),
    });
    this.resetProduct();
  }

  resetProduct(): void {
    this.productMaterialsOpt = [];
    this.productMaterials = [];
    this.selectedProduct = "";
    this.selectedMaterials = [];
  }

  submitOrder(): void {
    console.log("submit")
  }
  // @materials.State
  // materialsList!: Material[];
  // @materials.Getter
  // getMaterialsList!: Material[];
  // @materials.Action
  // cloud!: (materialName: string) => Material;
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
.form-container {
  display: flex;
}
.choose-product {
  margin-left: 200px;
}
.field {
  margin-top: 10px;
  &-input {
    width: 300px;
    &-comments {
      height: 70px;
      //todo delete width from here
      width: 300px;
    }
    &-address {
      width: 125px;
      &-right {
        margin-left: 10px;
      }
    }
  }
}
.materials-list {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 50px;
  border: 1px solid black;
}
.product-material {
  margin: 10px;
}
.order-summary {
  margin-top: 20px;
}
.order-details {
  margin-top: 10px;
}
</style>
