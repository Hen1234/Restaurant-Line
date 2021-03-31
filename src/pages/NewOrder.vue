<!--<template xmlns="http://www.w3.org/1999/html">-->
<template>
  <div class="container">
    <form class="form-container">
      <div class="customer-details">
        <div class="header">Delivery information</div>
        <div class="field">
          <input
            class="field-input"
            :class="{ invalid: inputValidity('customerName') }"
            id="full-name"
            type="text"
            v-model="customerName"
            placeholder="Your Name"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            :class="{ invalid: inputValidity('customerPhone') }"
            id="phone"
            type="text"
            v-model="customerPhone"
            placeholder="Your Phone"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            :class="{ invalid: inputValidity('customerStreet1') }"
            id="street"
            type="text"
            v-model="customerStreet1"
            placeholder="Street Address"
          />
        </div>
        <div class="field">
          <input
            class="field-input"
            id="street2"
            type="text"
            v-model="customerStreet2"
            placeholder="Street Address 2"
          />
        </div>
        <div class="field">
          <input
            class="field-input-address"
            :class="{ invalid: inputValidity('customerCity') }"
            id="city"
            type="text"
            v-model="customerCity"
            placeholder="City"
          />
          <input
            class="field-input-address-right-state"
            :class="{ invalid: inputValidity('customerState') }"
            id="state"
            type="text"
            v-model="customerState"
            placeholder="State / Province"
          />
        </div>
        <div class="field">
          <input
            class="field-input-address"
            :class="{ invalid: inputValidity('customerZipCode') }"
            id="zip"
            type="text"
            v-model="customerZipCode"
            placeholder="Portal / Zip Code"
          />
          <select
            class="field-input-address-right-country"
            :class="{ invalid: inputValidity('customerCountry') }"
            id="country"
            v-model="customerCountry"
          >
            <!--            <option selected="selected">Select Country</option>-->
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
            v-model="customerComments"
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
                :src="resolveImageUrl(selectedProductName)"
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
                    :src="resolveImageUrl(material.name)"
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
                v-model="selectedOptionalMaterials"
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
        v-for="product in productsSummary"
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
    <base-dialog :showDialogProp="showDialog" @closeModal="hideDialog"
      ><template v-slot:content>
        <h2>{{ modalContent }}</h2>
      </template></base-dialog
    >
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
import { Nullable } from "@/types/utility.types";

const ProductModule = namespace("product");
const OrderModule = namespace("order");

@Component({
  name: "NewOrder",
  components: { BaseDialog, ProductionItem },
})
export default class NewOrder extends Vue {
  @OrderModule.Action("addNewOrderAction") addOrder!: (products: Order) => void;
  @ProductModule.State((state) => state.products) products!: Array<Product>;
  @ProductModule.State((state) => state.materials) materials!: Array<Material>;
  @OrderModule.State((state) => state.currentOrderId) orderCounter!: number;
  @OrderModule.State((state) => state.orders) orders!: Array<Order>;
  selectedProduct: Nullable<Product> = null;
  productsSummary: Array<Product> = [];
  selectedOptionalMaterials: Array<Material> = [];
  showDialog = false;
  modalContent = "";
  customerName = "";
  customerPhone = "";
  customerStreet1 = "";
  customerStreet2 = "";
  customerState = "";
  customerCity = "";
  customerZipCode = "";
  customerCountry = "";
  customerComments = "";

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
    return this.productMaterials.filter((material) => !material.isMust);
  }

  get hasProducts(): boolean {
    return this.productsSummary.length > 0;
  }

  get selectedProductName(): string {
    return this.selectedProduct ? this.selectedProduct.name : "";
  }

  inputValidity(inputName: string): boolean {
    return this[inputName] === "";
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

  resolveImageUrl(imageName: string): string {
    const images = require.context("../images/", false, /\.jpg$/);
    return images(`./${imageName}.jpg`);
  }

  hideDialog(): void {
    this.showDialog = false;
    if (this.validateForm()) this.$router.push("/");
  }

  updateOrder(): void {
    //todo: check id.toString()
    this.selectedOptionalMaterials = this.selectedOptionalMaterials.map(
      (selectedMaterial) =>
        this.materials.find(
          (material) => material.id.toString() === selectedMaterial
        )
    );
    const mustMaterials = this.selectedProduct?.materials
      .filter((material) => material.isMust)
      .map((mustMaterial) =>
        this.materials.find((material) => material.id === mustMaterial.material)
      );
    this.selectedOptionalMaterials = this.selectedOptionalMaterials.concat(
      mustMaterials
    );
    this.productsSummary.push({
      ...this.selectedProduct,
      materials: this.selectedOptionalMaterials,
    });
    this.resetProduct();
  }

  resetProduct(): void {
    this.selectedProduct = null;
    this.selectedOptionalMaterials = [];
  }

  submitOrder(): void {
    if (this.validateForm()) {
      const newCustomer = {
        id: 1,
        name: this.customerName,
        street1: this.customerStreet1,
        street2: this.customerStreet2,
        city: this.customerCity,
        state: this.customerState,
        zipCode: this.customerZipCode,
        country: this.customerCountry,
        phone: this.customerPhone,
        money: 0,
        priority: 0,
      };
      this.addOrder({
        orderID: 0,
        products: this.productsSummary,
        customer: newCustomer,
        comments: this.customerComments,
      });
      this.modalContent = "Yor order has been submitted";
      this.showDialog = true;
    } else {
      this.modalContent = "Yor have to fill all the marked fields";
      this.showDialog = true;
    }
  }

  validateForm(): boolean {
    if (
      this.customerName === "" ||
      this.customerPhone === "" ||
      this.customerStreet1 === "" ||
      this.customerCountry === "" ||
      this.customerZipCode === "" ||
      this.customerState === "" ||
      this.customerCity === ""
    ) {
      return false;
    }
    return true;
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
      &-right-state {
        margin-left: 10px;
        width: 130px;
      }
      &-right-country {
        margin-left: 10px;
        width: 137px;
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

.invalid {
  border: 2px solid red;
}
</style>
