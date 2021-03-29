<template>
  <div class="container">
        <div>{{ getMaterialsList }}</div>
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
      <div class="product-details">
        <div class="header">Choose products</div>
        <select class="field-input" id="product">
          <option selected="selected">Select Product</option>
          <option value="Israel">Israel</option>
          <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
        </select>
      </div>
    </form>
    <div class="order-summary">summary</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Material } from "@/types/Material";
const materials = namespace("Materials");
@Component({
  name: "Registration",
})
export default class Registration extends Vue {
  // @materials.State
  // materialsList!: Material[];
  @materials.Getter
  getMaterialsList!: Material[];
  @materials.Action
  cloud!: (materialName: string) => Material;
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
.product-details {
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
      &-right{
        margin-left: 10px;
      }
    }
  }
}
</style>
