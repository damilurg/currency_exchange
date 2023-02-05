<template>
  <h1>Currency Converter</h1>
  <section v-if="storeCurrencies.errorMessage">
    {{ storeCurrencies.errorMessage }}
    <button @click="reloadPage">please reload page</button>
  </section>
  <div class="flex column fit-width mb-xl">
        <span>
        {{ storeCurrencies.fromAmount }} {{ storeCurrencies.fromCurrency }} equals
      </span>
    <h2 class="mb-md mt-md">
      {{ storeCurrencies.toAmount }} {{ storeCurrencies.toCurrency }}
    </h2>
    <small>
      {{ storeCurrencies.date }}
    </small>
  </div>
  <section class="flex full-width">
    <div class="flex mr-md">
      <select
        v-model="storeCurrencies.fromCurrency"
        class="mb-md"
        @change="storeCurrencies.updateCurrencies()"
      >
        <option
          v-for="currency in storeCurrencies.currencies"
          :key="currency"
          :value="currency.CharCode"
        >
          {{ currency.Name }}
        </option>
      </select>
      <input
        v-model="storeCurrencies.fromAmount"
        type="number"
        @input="storeCurrencies.updateCurrencies()"
      />
    </div>
    <button
      class="mr-md background-transparent button"
      title="Swap Currencies"
      @click="storeCurrencies.swapCurrencies"
    >
      <SwapIcon/>
    </button>
    <div class="flex">
      <select
        v-model="storeCurrencies.toCurrency"
        class="mb-md"
        @change="storeCurrencies.updateCurrencies()"
      >
        <option
          v-for="currency in storeCurrencies.currencies"
          :key="currency"
          :value="currency.CharCode"
        >
          {{ currency.Name }}
        </option>
      </select>
      <input
        v-model="storeCurrencies.toAmount"
        type="number"
        readonly
      />
    </div>
  </section>
</template>

<script setup>
import SwapIcon from '@/components/icons/SwapIcon.vue'
import { useCurrenciesStore } from '@/stores'

const reloadPage = () => (window.location.reload())

const storeCurrencies = useCurrenciesStore()
</script>
