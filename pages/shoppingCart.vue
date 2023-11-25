<template>
  <MainLayout>
    <v-card
      v-if="!cartArr.length"
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
    <v-row v-if="cartArr.length">
      <v-col cols="8">
        <v-card class="m-3 px-6 pb-4">
          <v-list
            lines="one"
            select-strategy="classic"
          >
            <v-list-subheader class="text-h6 font-weight-medium"
              >Cart</v-list-subheader
            >

            <v-list-item
              density="comfortable"
              v-for="item in cartArr"
              :key="item.id"
              class=""
            >
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    v-model="selectedArray"
                    :value="item"
                  ></v-checkbox-btn>
                </v-list-item-action>
                <v-img
                  cover
                  width="100"
                  height="100"
                  class="mr-8 my-4"
                  :src="item.thumbnail"
                >
                </v-img>
              </template>

              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <span class="text-subtitle-2 font-weight-medium"
                    >{{ item.title }} <br> {{ item.price }} P
                  </span>


                  <v-tooltip
                    location="bottom"
                    text="Delete"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        @click="removeFromCart"
                        v-bind="props"
                        icon
                        flat
                      >
                        <v-Icon
                          size="22"
                          icon="majesticons:delete-bin"
                        />
                      </v-btn>
                    </template>
                  </v-tooltip>
                </div>
              </template>

              <template #subtitle>
                <span
                  v-html="item.brand"
                  class="text-subtitle-2"
                ></span>
                <br />
                <span class="">{{ item.category }}</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-cardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Summary</span>
          </v-cardTitle>
          <v-list lines="one">
            <v-listItem
              v-for="item in shoppingCart"
              :key="item.title"
            >
              <template #title>
                <span
                  v-html="item.title"
                  class="font-weight-bold mr-3"
                ></span>
                <span>{{ item.total }} {{ item.type }}</span>
              </template>
            </v-listItem>
          </v-list>
          <v-card-actions>
            <v-btn @click="goToCheckout">go to checkout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'
import { type item } from '@/types'

const userStore = useUserStore()

let cartArr = ref<item[]>([])
let selectedArray = ref<item[]>([])

onBeforeMount(() => {
  cartArr.value = userStore.cart
})

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
    type: 'P',
  },
  {
    title: 'qounts',
    total: userStore.cart.length,
    type: '',
  },
])

const removeFromCart = () => {
  console.log('del')
  userStore.cart.forEach((prod: any, index) => {
    if (prod.id == cartArr.value[index].id) {
      userStore.cart.splice(index, 1)
    }
  })
}

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
