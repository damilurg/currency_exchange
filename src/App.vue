<template>
  <section class="background-blue">
    <nav class="flex">
      <router-link
        v-for="route in routes"
        :key="route"
        :to="route.path"
        class="pa-md text"
      >
        {{ route.meta.title }}
      </router-link>
    </nav>
  </section>
  <router-view />
</template>

<script setup>
import { useCurrenciesStore } from '@/stores'
import routes from '@/router/routes'

const storeCurrencies = useCurrenciesStore()

storeCurrencies.getCurrencies()
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';
</style>
