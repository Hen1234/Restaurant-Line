<!--<template xmlns="http://www.w3.org/1999/html">-->
<template>
  <div class="container">
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
          <div class="slot-details">
            <div class="slot-image">
              <img
                class="slot-image"
                :src="imgURL(selectedProductName)"
                v-bind:alt="selectedProductName"
              />
            </div>
            <div class="slot-details-status">
              <span class="attribute">Production Status:</span>
              <div class="materials-list">
                <div
                  v-for="material in productMaterials"
                  :key="material.name"
                  class="product-material"
                >
                  {{ material.name }}
                  <img
                    class="status-image"
                    :src="imgURL(material.name)"
                    v-bind:alt="material.name"
                  />
                </div>
              </div>
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
        {{ product.name }}:
        <div
          class="order-product-materials"
          v-for="material in product.materials"
          :key="material.id"
        >
          {{ material.name }}
        </div>
      </div>
      <div class="field">
        <button @click="submitOrder">Place order</button>
      </div>
    </div>
    <base-dialog
      :showDialogProp="showDialog"
      @closeModal="hideDialog"
    ></base-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Material } from "@/types/Material";
import { Product } from "@/types/Product";
import { ProductMaterial } from "@/types/ProductMaterial";
import ProductionItem from "@/components/item/ProductionItem.vue";
import { Order } from "@/types/Order";
import BaseDialog from "@/components/ui/BaseDialog.vue";

const ProductModule = namespace("product");
const OrderModule = namespace("order");

@Component({
  name: "NewOrder",
  components: { BaseDialog, ProductionItem },
})
export default class NewOrder extends Vue {
  @ProductModule.State((state) => state.products) products!: Array<Product>;
  @ProductModule.State((state) => state.materials) materials!: Array<Material>;
  @OrderModule.Action("addNewOrderAction") addOrder;
  @OrderModule.State((state) => state.counter) orderCounter!: number;
  @OrderModule.State((state) => state.orders) orders!: Array<Order>;
  selectedProduct: Product | null;
  selectedProducts: Array<Product>;
  selectedMaterials: Array<Material>;
  showDialog: boolean;
  constructor() {
    super();
    this.selectedProduct = null;
    this.selectedMaterials = [];
    this.selectedProducts = [];
    this.showDialog = false;
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

  imgURL(imageName: string) {
    const images = require.context("../images/", false, /\.jpg$/);
    return images("./" + imageName + ".jpg");
  }

  hideDialog(): void {
    this.showDialog = false;
    this.$router.push("/");
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
    //todo: check id.toString()
    this.selectedMaterials = this.selectedMaterials.map((selectedMaterial) =>
      this.materials.find(
        (material) => material.id.toString() === selectedMaterial
      )
    );
    const mustMaterials = this.selectedProduct?.materials
      .filter((material) => material.isMust)
      .map((mustMaterial) =>
        this.materials.find((material) => material.id === mustMaterial.material)
      );
    this.selectedMaterials = this.selectedMaterials.concat(mustMaterials);
    this.selectedProducts.push({
      ...this.selectedProduct,
      materials: this.selectedMaterials,
    });
    this.resetProduct();
  }

  resetProduct(): void {
    this.selectedProduct = null;
    this.selectedMaterials = [];
  }

  submitOrder(): void {
    this.addOrder({
      orderID: this.orderCounter,
      products: this.selectedProducts,
    });
    this.showDialog = true;
  }
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
.slot-details {
  margin-top: 10px;
  height: 100px;
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
.status-images {
  display: flex;
}
.status-image {
  height: 40px;
  width: 40px;
}
.slot-image {
  height: 100px;
  width: 110px;
}
</style>
