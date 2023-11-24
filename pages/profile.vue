<template>
  <MainLayout>
    <VCard
      class="pa-4 mx-auto"
      max-width="500"
    >
      <form @submit.prevent="submit()">
        <v-text-field
          v-model="state.name"
          :error-messages="v$.name.$errors.map((e) => e.$message)"
          :counter="10"
          label="Name"
          required
          @input="v$.name.$touch"
          @blur="v$.name.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          label="E-mail"
          required
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.phone"
          :counter="7"
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
          label="Phone Number"
          required
          @input="v$.phone.$touch"
          @blur="v$.phone.$touch"
        ></v-text-field>

        <v-select
          v-model="state.select"
          :items="items"
          :error-messages="v$.select.$errors.map((e) => e.$message)"
          label="Item"
          required
          @change="v$.select.$touch"
          @blur="v$.select.$touch"
        ></v-select>

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

const userStore = useUserStore()

const initialState = {
  name: '',
  email: '',
  select: null,
  checkbox: null,
  phone: ''
}

const state = reactive({
  ...initialState,
})

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

const rules = {
  name: { required },
  email: { required, email },
  select: { required },
  items: { required },
  phone: { required },
  checkbox: { required },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const submit = () => {
  userStore.userInfo.push(state)
  return navigateTo('/shoppingCart')
}
</script>

<style scoped></style>
