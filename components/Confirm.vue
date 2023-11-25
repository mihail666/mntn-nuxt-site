<template>
  <v-fade-transition
    hide-on-leave
    class="w-100"
  >
    <v-card
      v-if="modelValue"
      append-icon="$close"
      elevation="16"
      max-width="500"
      class="mx-auto"
      title="Send a receipt"
    >
      <template v-slot:append>
        <v-btn
          icon="$close"
          variant="text"
          @click="$emit('close')"
        ></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-12 text-center">
        <v-icon
          class="mb-6"
          color="success"
          icon="mdi-check-circle-outline"
          size="128"
        ></v-icon>

        <div class="text-h4 font-weight-bold">This order was sent</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn
          class="text-none"
          color="medium-emphasis"
          min-width="92"
          rounded
          variant="outlined"
          @click="close"
        >
          Close
        </v-btn>
      </div>
    </v-card>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const props = defineProps(['modelValue'])
const { modelValue } = toRefs(props)

const close = () => {
  navigateTo('/')

  setTimeout(() => {
    (userStore.cart = []),
    (userStore.checkout = [])
  }, 100)
}
</script>

<style scoped></style>
