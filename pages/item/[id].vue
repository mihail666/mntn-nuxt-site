<template>
  <MainLayout>
    <VRow>
      <VCol cols="5">
        <VRow>
          <VCol cols="3">
            <v-infinite-scroll
              :height="400"
              :items="prod.images"
              class="pr-2"
            >
              <template
                v-for="image in prod.images"
                :key="image"
              >
                <v-img
                  @mouseover="currentImage = image"
                  @click="currentImage = image"
                  cover
                  class="mb-6 mt-n4"
                  width="100"
                  height="100"
                  :src="image"
                ></v-img>
              </template>
            </v-infinite-scroll>
          </VCol>
          <VCol cols="9"
            ><v-img
              cover
              height="400"
              :src="currentImage"
            ></v-img
          ></VCol>
        </VRow>
      </VCol>
      <VCol cols="7">
        <VCard>
          <v-card-text>
            <div class="mb-6">
              <h1 class="text-h2">{{ prod.title }}</h1>
            </div>
            <div class="text-h6 mb-6">
              {{ prod.description }}
            </div>
            <v-row
              align="center"
              class="mx-0 mb-2"
            >
              <v-rating
                :model-value="prod.rating"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>

              <div class="text-grey ms-4">
                {{ prod.rating }}
              </div>
            </v-row>

            <div class="text-h6 mb-2">
              {{ prod.category }}
            </div>

            <v-row
              align="center"
              class="mx-0 mb-6"
            >
              <div class="text-h6">{{ priceComputed }}P</div>

              <div class="text-h6 ms-4 text-decoration-line-through">
                {{ prod.price }}P
              </div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple-lighten-2"
              variant="text"
              @click="addToCart(prod)"
              :disabled="isInCart"
            >
              <div v-if="isInCart">Is Added</div>
              <div v-else>Add to Cart</div>
            </v-btn>
          </v-card-actions>
        </VCard>
      </VCol>
    </VRow>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const route = useRoute()
const { id } = useRoute().params

let currentImage = ref<string>('')

let prod = ref<any>([])

onBeforeMount(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => (prod.value = data))
})

watchEffect(() => {
  currentImage.value = prod.value.thumbnail
})

const priceComputed = computed(() => {
  if (prod.value) {
    return (prod.value.price - prod.value.price / 100).toFixed(2)
  }
  return '0.00'
})

const isInCart = computed(() => {
  let res = false
  userStore.cart.forEach((prod: any) => {
    if (id == prod.id) {
      res = true
    }
  })
  return res
})

const addToCart = (prod: any) => {
  //@ts-ignore
  userStore.cart.push(prod)
}
</script>

<style scoped></style>
