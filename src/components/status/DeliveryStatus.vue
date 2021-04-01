<template>
  <div class="container">
    <span class="header">Delivery Status</span>
    <div class="delivery-item">
      <delivery-item
        v-for="(delivery, index) in deliveries"
        :key="index"
        :orderID="delivery.orderID"
        :time="delivery.time"
        :inDelivery="delivery.inDelivery"
      >
      </delivery-item>
    </div>
  </div>
</template>

<script lang="ts">
import DeliveryItem from "@/components/item/DeliveryItem.vue";
import { Component, Vue } from "vue-property-decorator";
import { Delivery } from "@/types/Delivery.ts";
import { namespace } from "vuex-class";
const DeliveryModule = namespace("delivery");
@Component({
  name: "DeliveryStatus",
  components: {
    DeliveryItem,
  },
})
export default class DeliveryStatus extends Vue {
  @DeliveryModule.State((state) => state.deliveries)
  deliveries!: Array<Delivery>;
}
</script>

<style scoped>
.header {
  font-size: 20px;
}

.delivery-item {
  display: flex;
  justify-content: space-between;
}
</style>
