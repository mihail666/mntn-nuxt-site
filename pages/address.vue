<template>
  <MainLayout>
    <VCard
      class="pa-4 mx-auto"
      max-width="500"
    >
      <form @submit.prevent="submit()">
        <v-text-field
          v-model="state.address"
          :error-messages="v$.address.$errors.map((e) => e.$message)"
          :counter="10"
          label="Address"
          required
          @input="v$.address.$touch"
          @blur="v$.address.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.city"
          :error-messages="v$.city.$errors.map((e) => e.$message)"
          :counter="10"
          label="City"
          required
          @input="v$.city.$touch"
          @blur="v$.city.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.country"
          :error-messages="v$.country.$errors.map((e) => e.$message)"
          :counter="10"
          label="Country"
          required
          @input="v$.country.$touch"
          @blur="v$.country.$touch"
        ></v-text-field>

        <v-checkbox
          v-model="state.checkbox"
          :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
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
    </VCard>
  </MainLayout>
</template>

<script setup lang="ts">
//@ts-ignore
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

let currentAddress = ref(null)
const userStore = useUserStore()
const initialState = {
  checkbox: null,
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
  currentAddress.value =  userStore.userAddress

  state.address = currentAddress.value[0].address,
  state.city = currentAddress.value[0].city,
  state.country = currentAddress.value[0].country
  
})


function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
const submit = () => {
  userStore.userAddress.push(state)
  return navigateTo('/shoppingCart')
}
</script>

<style scoped></style>
