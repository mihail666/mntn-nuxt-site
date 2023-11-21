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

<script setup></script>

<style lang="scss"></style>
