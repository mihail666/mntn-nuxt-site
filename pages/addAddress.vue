<template>
  <MainLayout>
    <v-card
      class="pa-4 mx-auto"
      max-width="500"
    >
      <form @submit.prevent="submit()">
        <v-text-field
          v-model="state.address"
          :counter="10"
          label="Address"
          required
          @input="v$.address.$touch"
          @blur="v$.address.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.city"
          :counter="10"
          label="City"
          required
          @input="v$.city.$touch"
          @blur="v$.city.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.country"
          :counter="10"
          label="Country"
          required
          @input="v$.country.$touch"
          @blur="v$.country.$touch"
        ></v-text-field>

        <v-checkbox
          v-model="state.checkbox"
          label="Do you agree?"
          required
          @change="v$.checkbox.$touch"
          @blur="v$.checkbox.$touch"
        ></v-checkbox>

        <v-btn
          class="me-4"
          type="submit"
          @click="v$.$validate"
        >
          submit
        </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-card>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

let currentAddress = ref<any>([])
const userStore = useUserStore()
const initialState = {
  checkbox: false,
  address: '',
  city: '',
  country: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  address: { required },
  city: { required },
  country: { required },
  checkbox: { required },
}

const v$ = useVuelidate(rules, state)

watchEffect(() => {
  if (userStore.address.length) {
      (currentAddress.value = userStore.address[0]),
      (state.address = currentAddress.value.address),
      (state.city = currentAddress.value.city),
      (state.country = currentAddress.value.country)
  }
})

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    //@ts-ignore
    state[key] = value
  }
}
const submit = () => {
  if (userStore.address.length > 0) {
    userStore.address.splice(0, 1)
  }
  //@ts-ignore
  userStore.address.push(state)
  return navigateTo('/checkout')
}
</script>

<style scoped></style>
