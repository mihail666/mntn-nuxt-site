<template>
  <MainLayout>
    <h1 class="text-h1 mt-15 mb-15">Marketpalce</h1>
    <v-row class="m-0">
      <v-col
        v-for="item in paginatedItem"
        :key="item"
        cols="3"
        class="mb-10"
      >
        <ItemCard :item="item" />
      </v-col>
    </v-row>
    <div class="d-flex justifu-start mb-16 ml-n16">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="7"
        active-color="black"
        color="black"
      ></v-pagination>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'

const items = ref<any[]>([])
let page = ref(1)

const pages = computed(() => {
  if (items.value.length) {
    return Math.ceil(items.value.length / 8)
  }
  return 3
})

const paginatedItem = computed(() => {
  const arr = items.value.reverse()
  const from = (page.value - 1) * 8
  const to = from + 8
  return arr.slice(from, to)
})

onBeforeMount(async () => {
  await fetch(
    'https://dummyjson.com/products'
  )
    .then((res) => res.json())
    .then((data) => {
      items.value = data.products
    })
})
</script>
