<template>
  <section v-if="storeCurrencies.errorMessage">
    {{ storeCurrencies.errorMessage }}
    please reload
  </section>
  <section v-else>
    <h1>Currency Converter</h1>
    <div>
        <span>
        {{ storeCurrencies.fromAmount }} {{ storeCurrencies.fromCurrency }} equals
      </span>
      <br>
      <span>
        {{ storeCurrencies.toAmount }} {{ storeCurrencies.toCurrency }}
      </span>
      <br>
      <span>
        {{ storeCurrencies.date }}
      </span>
    </div>
    <section class="">
      <div>
        <select
          v-model="storeCurrencies.fromCurrency"
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
      <button @click="storeCurrencies.swapCurrencies">
        <SwapIcon/>
      </button>
      <div>
        <input
          v-model="storeCurrencies.toAmount"
          type="number"
          readonly
        />
        <select
          v-model="storeCurrencies.toCurrency"
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
      </div>
    </section>
  </section>
</template>

<script setup>
import SwapIcon from '@/components/icons/SwapIcon.vue'
import { useCurrenciesStore } from '@/stores'

const storeCurrencies = useCurrenciesStore()
</script>

<style lang="scss">
select,
input {
  width: 100%;
}
</style>
