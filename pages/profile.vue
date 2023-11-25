<template>
  <MainLayout>
    <v-card
      class="pa-4 mx-auto"
      max-width="500"
    >
      <form @submit.prevent="submit()">
        <v-text-field
          v-model="state.name"
          :counter="10"
          label="Name"
          required
          @input="v$.name.$touch"
          @blur="v$.name.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.email"
          label="E-mail"
          required
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.phone"
          :counter="7"
          label="Phone Number"
          required
          @input="v$.phone.$touch"
          @blur="v$.phone.$touch"
        ></v-text-field>

        <v-select
          v-model="state.select"
          :items="items"
          label="Item"
          required
          @change="v$.select.$touch"
          @blur="v$.select.$touch"
        ></v-select>

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
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

let currentInfo = ref<any>([])
const userStore = useUserStore()

const initialState = {
  name: '',
  email: '',
  select: '',
  checkbox: false,
  phone: '',
  items: '',
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

watchEffect(() => {
  ;(currentInfo.value = userStore.userInfo[0]),
    (state.name = currentInfo.value.name),
    (state.email = currentInfo.value.email),
    (state.phone = currentInfo.value.phone),
    (state.select = currentInfo.value.select)
})

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    //@ts-ignore
    state[key] = value
  }
}

const submit = () => {
  if (userStore.userInfo.length > 0) {
    userStore.userInfo.splice(0, 1)
  }
  //@ts-ignore
  userStore.userInfo.push(state)
}
</script>

<style scoped></style>
