<template>
  <h1>Currency List</h1>
  <section>
    <input type="text" v-model="storeCurrencies.searchTerm" placeholder="Search currencies..."/>
    <table>
      <thead>
      <tr>
        <th>Currency</th>
        <th>Previous Value</th>
        <th>Currency Title</th>
        <th>Code</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="storeCurrencies.errorMessage">
        {{ storeCurrencies.errorMessage }}
      </template>
      <template v-else>
        <tr v-for="currency in storeCurrencies.filteredCurrencies" :key="currency">
          <td>{{ currency.Value }}</td>
          <td :class="valueIncreased(currency.Value, currency.Previous) ?  'text-green' : 'text-red'">
           ({{ valueIncreased(currency.Value, currency.Previous) ? '+': '' }}{{ difference(currency.Value, currency.Previous) }})
            <span class="icon">
              <template v-if="valueIncreased(currency.Value, currency.Previous)">
              <CaretUp/>
            </template>
            <template v-else>
              <CaretDown/>
            </template>
            </span>
          </td>
          <td>{{ currency.Name }}</td>
          <td>{{ currency.CharCode }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import CaretDown from '@/components/icons/CaretDown.vue'
import CaretUp from '@/components/icons/CaretUp.vue'
import { CURRENCY_DIFFERENCE_LIMIT } from '@/config'
import { useCurrenciesStore } from '@/stores'

const storeCurrencies = useCurrenciesStore()

const valueIncreased = (value1, value2) => (Math.sign(value1 - value2) === 1)
const difference = (value1, value2) => (value1 - value2).toFixed(CURRENCY_DIFFERENCE_LIMIT)
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  max-height: calc(100vh - 120px);
  position: relative;
}
input {
  position: sticky;
  z-index: 1;
  top: 0;
}

table {
  width: 100%;
  max-width: 100%;
  border: 1px solid #0000001f;

  thead {
    text-align: left;

    th {
      position: sticky;
      z-index: 1;
      top: 23px;
      background: #c1f4cd;
      padding: 7px 16px;
    }
  }

  tbody {
    tr {
      border: 0;
      td {
        margin: auto;
        border: none;
        border: 0;
        padding: 7px 16px;
      }
      &:hover {
        td {
          position: relative;
          &::before {
            background: rgba(0,0,0,.03);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            content: '';
          }
        }
      }
    }
  }
}
.icon {
  max-width: 24px;
  max-height: 24px;
  vertical-align: middle;

  svg {
    max-width:  inherit;
    max-height: inherit;

    path {
      fill: currentColor;
    }
  }
}
.text {
  &-red {
    color: red;
  }

  &-green {
    color: green;
  }
}
</style>
