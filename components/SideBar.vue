<template>
  <v-card class="">
    <v-card-title class="d-flex align-center justify-space-between mb-3">
      <span class="font-weight-bold text-h4 mx-auto">Side Bar</span>
      <Search />
    </v-card-title>
    <div class="ml-7 pb-3 font-weight-bold text-h6">Categories</div>
    <v-list
      lines="one"
      height="300"
    >
      <v-list-item
        v-for="item in categories"
        :key="item"
      >
        <template #prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              v-model="selectedCat"
              :value="item"
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <template #title>
          <span
            v-html="item"
            class="mr-2"
          ></span>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-select
      class="mx-6 mt-6"
      label="sort by price"
      :items="selectData"
      variant="outlined"
      v-model="selectedPrice"
    ></v-select>
    <v-divider></v-divider>

    <v-radio-group
      class="ml-4 pb-3"
      v-model="radios"
    >
      <div class="ml-3 font-weight-bold text-h6">Discount</div>
      <v-radio
        label="more 10%"
        :value="10"
      ></v-radio>
      <v-radio
        label="more 15%"
        :value="15"
      ></v-radio>
      <v-radio
        label="more 20%"
        :value="20"
      ></v-radio>
    </v-radio-group>
    <v-divider></v-divider>
    <v-card-actions class="ml-3">
      <v-btn @click="filter">filter</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const selectedCat = ref<string[]>([])
const categories = ref<string[]>([])
const selectedPrice = ref<string>('')
const radios = ref<number>(0)

const selectData = [
  { title: 'max price', value: 'max' },
  { title: 'min price', value: 'min' },
]

const emit = defineEmits(['fiterParams', 'filterClear'])

onBeforeMount(async () => {
  await fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((data) => {
      categories.value = data
    })
})

const filter = () => {
  emit('fiterParams', {
    categories: selectedCat.value,
    price: selectedPrice.value,
    discount: radios.value,
  })
}

const clear = () => {
  (radios.value = 0),
  (selectedPrice.value = ''),
  (selectedCat.value = []),
  emit('filterClear')
}
</script>

<style lang="scss" scoped></style>
