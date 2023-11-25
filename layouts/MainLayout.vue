<template>
  <v-app>
    <HeaderBar />

    <v-main>
      <v-container class="position-relative">
        <slot />
      </v-container>
    </v-main>

    <FooterBar />
  </v-app>
</template>

<script setup>
import { useUserStore } from '~/stores/user.ts'
const userStore = useUserStore()
</script>

<style lang="scss"></style>
