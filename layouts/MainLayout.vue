<template>
  <v-app>
    <HeaderBar />

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <footer-bar />
  </v-app>
</template>

<script setup >
import { useUserStore } from '~/stores/user.ts'
const userStore = useUserStore()
</script>

<style lang="scss"></style>
