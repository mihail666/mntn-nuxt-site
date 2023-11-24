<template>
  <MainLayout>
    <v-card
      v-if="!userStore.cart.length"
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
      </v-card-actions>
    </v-card>
    <VRow v-if="userStore.cart.length">
      <VCol cols="8">
        <VCard class="m-3 px-6 py-10">
          <v-list
            lines="one"
            select-strategy="classic"
          >
            <v-list-subheader>General</v-list-subheader>

            <v-list-item
              density="comfortable"
              v-for="item in userStore.cart"
              :key="item"
            >
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    v-model="selectedArray"
                    :value="item"
                  ></v-checkbox-btn>
                </v-list-item-action>
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
              v-for="item in shoppingCart"
              :key="item.title"
            >
              <template #title>
                <span
                  v-html="item.title"
                  class="font-weight-bold mr-3"
                ></span>
                <span>{{item.total}} {{ item.type }}</span>
              </template>
            </VListItem>
          </VList>
          <v-card-actions>
            <v-btn
              @click="goToCheckout"
              >go to checkout</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn
              @click="navigateTo('/address')"
              >add address</v-btn
            >
          </v-card-actions>
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
let selectedArray = ref([])

const totalPriceComputed = computed(() => {
  let price = 0
  userStore.cart.forEach((prod: any) => {
    price += prod.price
  })
  return price
})

const shoppingCart = ref([
  {
    title: 'Total',
    total: totalPriceComputed,
    type: 'P'
  },
  {
    title: 'qounts',
    total: userStore.cart.length,
    type: ''
  },
])

const goToCheckout = () => {
  let ids: any = []
  userStore.checkout = []

  selectedArray.value.forEach((item: any) => ids.push(item.id))

  let res = userStore.cart.filter((item: any) => {
    return ids.indexOf(item.id) != -1
  })

  res.forEach((item) => userStore.checkout.push(toRaw(item)))

  return navigateTo('/checkout')
}
</script>

<style scoped></style>
