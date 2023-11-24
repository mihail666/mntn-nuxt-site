<template>
  <MainLayout ><v-card
      v-if="!userStore.checkout.length"
      class="mx-auto text-center"
      title="Add the necessary products to the basket"
      text="And to find them, look in the catalog or in the section with discounts "
      max-width="500"
      :elevation="0"
    >
      <v-card-actions>
        <v-btn
          class="mx-auto"
          @click="navigateTo('/')"
          >go to store</v-btn
        >
        <v-btn
          class="mx-auto"
          @click="navigateTo('/shoppingCart')"
          >go to cart</v-btn
        >
      </v-card-actions>
    </v-card>
    <VRow v-if="userStore.checkout.length">
      <VCol cols="8">
        <VCard class="m-3 px-6 py-10">
          <v-list
            lines="three"
            select-strategy="classic"
          >
            <v-list-subheader>General</v-list-subheader>

            <v-list-item
              density="comfortable"
              v-for="item in userStore.checkout"
              :key="item"
            >
              <template #prepend>
                <VImg
                  cover
                  width="100"
                  height="100"
                  class="mr-8"
                  :src="item.thumbnail"
                >
                </VImg>
              </template>

              <template #title>
                <span
                  v-html="item.title"
                  class="text-subtitle-2 font-weight-medium"
                ></span>
                <br />
                <span class="text-subtitle-2 font-weight-medium"
                  >{{ item.price }} P</span
                >
              </template>
              <template #subtitle>
                <span
                  v-html="item.brand"
                  class="text-subtitle-2"
                ></span>
                <br />
                <span class="text-caption">{{ item.category }}</span>
              </template>
            </v-list-item>
          </v-list>
        </VCard>
      </VCol>
      <VCol cols="4">
        <VCard>
          <VCardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Summary</span>
          </VCardTitle>
          <VList lines="one">
            <VListItem
              v-for="item in checkoutCart"
              :key="item.title"
            >
              <template #title>
                <span
                  v-html="item.title"
                  class="font-weight-bold mr-3"
                ></span>
                <span v-html="item.total"></span>
              </template>
            </VListItem>
          </VList>
          <VDivider></VDivider>
          <v-card-actions>
            <v-btn
              class=""
              @click="0"
              >bay</v-btn
            >
            <v-btn 
              class=""
              @click="navigateTo('/address')"
              >update address</v-btn
            >
          </v-card-actions>
        </VCard>
        <!-- adderss -->
        <VCard class="mt-6">
          <VCardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Address</span>
          </VCardTitle>
          <VList lines="one">
            <VListItem
              v-for="item in checkoutCart"
              :key="item.title"
            >
              <template #title>
                <span
                  v-html="item.title"
                  class="font-weight-bold mr-3"
                ></span>
                <span v-html="item.total"></span>
              </template>
            </VListItem>
          </VList>  
        </VCard>
      </VCol>
    </VRow>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const totalPriceComputed = computed(() => {
  let price = 0
  userStore.checkout.forEach((prod: any) => {
    price += prod.price
  })
  return price
})

const checkoutCart = ref([
  {
    title: 'Total',
    total: totalPriceComputed,
  },
  {
    title: 'qounts',
    total: userStore.checkout.length,
  },
])
const bay = () => {
  
}
</script>

<style scoped></style>