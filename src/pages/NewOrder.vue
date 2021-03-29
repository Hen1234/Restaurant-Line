<!--<template xmlns="http://www.w3.org/1999/html">-->
<template>
  <div class="container">
    <!--        <div>{{ getMaterialsList }}</div>-->
    <!--    <div>{{ getMaterialFromList("tomato") }}</div>-->

    <form class="form-container">
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
          @change="productChangeHandler($event)"
          class="field field-input"
          name="selectedProduct"
          :value="selectedProductName"
        >
          <option selected="selected">Select Product</option>
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
            <div
              v-for="material in optionalProductMaterials"
              :key="material.name"
            >
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
    <div v-if="hasProducts" class="order-summary">
      <div class="header">Order summary</div>
      <div
        class="order-details"
        v-for="product in selectedProducts"
        :key="product ? product.name : null"
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
// import { ProductMaterial } from "@/types/ProductMaterial";

const ProductModule = namespace("product");

@Component({
  name: "NewOrder",
})
export default class NewOrder extends Vue {
  @ProductModule.State((state) => state.products) products!: Array<Product>;
  @ProductModule.State((state) => state.materials) materials!: Array<Material>;
  selectedProduct: Product | null;
  selectedProducts: Array<Product>;
  selectedMaterials: string[];
  constructor() {
    super();
    this.selectedProduct = null;
    this.selectedMaterials = [];
    this.selectedProducts = [];
  }

  productChangeHandler(event: Event): void {
    const selectedProductName = (event.target as HTMLInputElement).value;
    const selectedProduct = this.products.find(
      (product) => product.name === selectedProductName
    );

    if (selectedProduct) {
      this.selectedProduct = selectedProduct;
    }
  }

  get productMaterials(): Array<Material & Pick<ProductMaterial, "isMust">> {
    if (!this.selectedProduct) {
      return [];
    }

    const selectedProductMaterials: ProductMaterial[] = this.selectedProduct
      .materials;

    return selectedProductMaterials.reduce<
      Array<Material & Pick<ProductMaterial, "isMust">>
    >((carry, productMaterial) => {
      const material = this.materials.find(
        (material) => material.id === productMaterial.material
      );

      if (material) {
        carry.push({
          ...material,
          isMust: productMaterial.isMust,
        });
      }

      return carry;
    }, []);
  }

  get optionalProductMaterials(): Material[] {
    return this.productMaterials
      ? this.productMaterials.filter((material) => !material.isMust)
      : [];
  }

  get hasProducts(): boolean {
    return this.selectedProducts.length > 0;
  }

  get selectedProductName(): string {
    return this.selectedProduct ? this.selectedProduct.name : "";
  }

  updateOrder(): void {
    this.selectedProducts.push({
      name: this.selectedProductName,
      materials: this.selectedMaterials.toString(),
    });
    this.resetProduct();
  }

  resetProduct(): void {
    this.selectedProduct = null;
    this.selectedMaterials = [];
  }

  submitOrder(): void {
    console.log("submit");
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
