<template>
  <MainLayout class="position-relative"
    ><v-card
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
    <v-row
      v-if="userStore.checkout.length"
      class="position-relative h70"
    >
      <v-col cols="8">
        <v-card class="m-3 px-6 py-10">
          <v-list
            lines="three"
            select-strategy="classic"
          >
            <v-list-subheader>General</v-list-subheader>

            <v-list-item
              density="comfortable"
              v-for="item in checkoutArr"
              :key="item.id"
            >
              <template #prepend>
                <v-img
                  cover
                  width="100"
                  height="100"
                  class="mr-8"
                  :src="item.thumbnail"
                >
                </v-img>
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
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-cardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Summary</span>
          </v-cardTitle>
          <v-list lines="one">
            <v-listItem
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
            </v-listItem>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              @click="dialog = !dialog"
              :disabled="!canBay"
              >bay</v-btn
            >
            <v-btn @click="navigateTo('/addAddress')">
              <div v-if="!addressUser.length">add address</div>
              <div v-else>update address</div>
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- adderss -->
        <v-card
          class="mt-6"
          v-if="addressUser.length"
        >
          <v-cardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Address</span>
          </v-cardTitle>

          <v-list>
            <v-listItem
              v-for="item in addressUser"
              :key="item.id"
            >
              <div>
                <span class="font-weight-bold mr-3">City</span>{{ item.city }}
              </div>
              <div>
                <span class="font-weight-bold mr-3">Country</span
                >{{ item.country }}
              </div>
              <div>
                <span class="font-weight-bold mr-3">Address</span
                >{{ item.address }}
              </div>
            </v-listItem>
          </v-list>
        </v-card>
        <!-- profile -->
        <v-card class="mt-6">
          <v-cardTitle class="d-flex align-center justify-space-between">
            <span class="font-weight-bold text-subtitle-1">Profile</span>
          </v-cardTitle>

          <v-list>
            <v-listItem
              v-for="item in userInfo"
              :key="item.id"
            >
              <div>
                <span class="font-weight-bold mr-3">Name</span>{{ item.name }}
              </div>
              <div>
                <span class="font-weight-bold mr-3">Email</span>{{ item.email }}
              </div>
              <div>
                <span class="font-weight-bold mr-3">Phone</span>{{ item.phone }}
              </div>
            </v-listItem>
          </v-list>
        </v-card>
      </v-col>
      <div
        class="w-100 top20 d-flex align-center justify-center position-absolute"
        v-if="dialog"
      >
        <Confirm
          v-model="dialog"
          @close="dialog = false"
        />
      </div>
    </v-row>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'
import { type item, type user } from '@/types'

const userStore = useUserStore()
const dialog = ref(false)

let checkoutArr = ref<item[]>([])
let addressUser = ref<user[]>([])
let userInfo = ref<any>([])

const totalPriceComputed = computed(() => {
  let price = 0
  userStore.checkout.forEach((prod: any) => {
    price += prod.price
  })
  return price
})

const canBay = computed(() => {
  if (addressUser.value && userInfo.value) {
    return true
  }
  return false
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

onBeforeMount(() => {
  checkoutArr.value = userStore.cart
  addressUser.value = userStore.address
  userInfo.value = userStore.userInfo
})
</script>

<style scoped></style>
