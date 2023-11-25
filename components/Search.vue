<template>
  <v-btn
    @click="dialog = !dialog"
    icon
    variant="plain"
    class="mt-2"
  >
    <v-icon icon="fluent:search-24-regular" />
  </v-btn>
  <v-dialog
    z-index="99999"
    scrollable
    v-model="dialog"
    max-width="500"
  >
    <v-card rounded="lg">
      <v-cardTitle class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-medium">Search</span>
        <v-btn
          @click="dialog = false"
          flat
          size="small"
          icon
        >
          <v-icon icon="fluent:dismiss-24-regular" />
        </v-btn>
      </v-cardTitle>
      <v-cardText class="pb-0">
        <v-text-field
          clearable
          autofocus
          v-model="search"
          placeholder="Enter a search value..."
          prepend-inner-icon="fluent:search-24-regular"
        />
      </v-cardText>
      <v-expand-transition leave-absolute>
        <v-cardText
          v-if="search"
          class="pa-0"
          style="height: 500px"
        >
          <v-list lines="two">
            <v-list-subheader>Results</v-list-subheader>
            <v-list-item
              v-for="n in itemsSearch"
              :key="`search-${n.title}`"
              :title="n.title"
              :prepend-avatar="n.thumbnail"
              @click="navigateTo(`/item/${n.id}`)"
            >
            </v-list-item>
          </v-list>
        </v-cardText>
      </v-expand-transition>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { type item } from '@/types'
const search = ref<string>('')
const items = ref<item[]>([])
const itemsSearch = ref<item[]>([])
let isSearching = ref(false)

const dialog = ref(false)

const seachByName = () => {
  isSearching.value = true
  itemsSearch.value = items.value.filter((item) =>
    item.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  )
  isSearching.value = false
}

watch(
  () => search.value,
  () => {
    seachByName()
  }
)

onBeforeMount(async () => {
  await fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
      items.value = data.products
    })
})
</script>

<style scoped></style>
