<template>
  <div>
    <input v-model="searchTerm" placeholder="Search currencies..." />
    <table>
      <thead>
      <tr>
        <th>Code</th>
        <th>Currency</th>
        <th>Previous</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(currency, index) in filteredCurrencies" :key="index">
        <td>{{ currency.CharCode }}</td>
        <td>{{ currency.Name }}</td>
        <td :class="{ 'green': currency.Previous > 0, 'red': currency.Previous < 0 }">
          {{ currency.Previous }}
          <template v-if="currency.Previous > 0">▲</template>
          <template v-if="currency.Previous < 0">▼</template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useState } from 'vue'
import { useStore } from 'pinia'

export default {
  setup() {
    const [searchTerm, setSearchTerm] = useState('')
    const { state } = useStore()

    const filteredCurrencies = state.currencies.filter(currency => {
      return currency.CharCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.Name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return {
      searchTerm,
      setSearchTerm,
      filteredCurrencies
    }
  }
}
</script>

<style>
.green {
  color: green;
}

.red {
  color: red;
}
</style>
