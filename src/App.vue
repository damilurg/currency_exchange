<template>
  <nav>
    <router-link to="/">Currency List</router-link>
    <router-link to="/converter">Currency Converter</router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { useCurrenciesStore } from '@/stores'

const storeCurrencies = useCurrenciesStore()

storeCurrencies.getCurrencies()
</script>
