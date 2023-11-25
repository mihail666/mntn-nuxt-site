<template>
  <VBtn
    @click="dialog = !dialog"
    icon
    variant="plain"
    class="mt-2"
  >
    <VIcon icon="fluent:search-24-regular" />
  </VBtn>
  <VDialog
    z-index="99999"
    scrollable
    v-model="dialog"
    max-width="500"
  >
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-medium">Search</span>
        <VBtn
          @click="dialog = false"
          flat
          size="small"
          icon
        >
          <VIcon icon="fluent:dismiss-24-regular" />
        </VBtn>
      </VCardTitle>
      <VCardText class="pb-0">
        <VTextField
          clearable
          autofocus
          v-model="search"
          placeholder="Enter a search value..."
          prepend-inner-icon="fluent:search-24-regular"
        />
      </VCardText>
      <VExpandTransition leave-absolute>
        <VCardText
          v-if="search"
          class="pa-0"
          style="height: 500px"
        >
          <VList lines="two">
            <VListSubheader>Results</VListSubheader>
            <VListItem
              v-for="n in itemsSearch"
              :key="`search-${n.title}`"
              :title="n.title"
              :prepend-avatar="n.thumbnail"
              @click="navigateTo(`/item/${n.id}`)"
            >
            </VListItem>
          </VList>
        </VCardText>
      </VExpandTransition>
    </VCard>
  </VDialog>
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
