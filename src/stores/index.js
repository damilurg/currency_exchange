import { useURL } from '@/common/modules/useURL'
import {
  DATETIME_FORMAT,
  DEFAULT_CONVERTER_AMOUNT, DEFAULT_CONVERTER_FROM_CURRENCY, DEFAULT_CONVERTER_TO_CURRENCY,
  DIVISION,
  JSON_URL,
  MULTIPLICATION
} from '@/config'
import axios from 'axios'
import { defineStore } from 'pinia'
import moment from 'moment'
import { computed, ref } from 'vue'
import { mathFunctions } from '@/common/modules/useMathFunctions'


export const useCurrenciesStore = defineStore('currencies', () => {
  // ------ Queries params ------ //
  const { getQueryParams, setQueryParams } = useURL()
  const defaultAmount = isNaN(Number(getQueryParams().amount)) ? DEFAULT_CONVERTER_AMOUNT : getQueryParams().amount

  // ----- Reactive variables ----- //
  const currencies = ref([])
  const date = ref()
  const fromCurrency = ref(DEFAULT_CONVERTER_FROM_CURRENCY)
  const toCurrency = ref(DEFAULT_CONVERTER_TO_CURRENCY)
  const fromAmount = ref(defaultAmount || DEFAULT_CONVERTER_AMOUNT)
  const toAmount = ref(0)
  const errorMessage = ref('')
  const searchTerm = ref('')
  const isSwapCurrencies = ref(false)

  async function getCurrencies() {
    try {
      const { data } = await axios.get(JSON_URL)
      currencies.value = Object.values(data.Valute)
      date.value = moment.utc(data.Date).local().format(DATETIME_FORMAT)
      updateCurrencies()
    } catch (error) {
      const { message } = error
      errorMessage.value = message
    }
  }

  function getCurrencyValue(valute, nominal = false) {
    const result = currencies.value.find(currency => currency.CharCode === valute)
    return nominal ? result?.Nominal : result?.Value
  }

  function updateCurrencies(updateNominal = false) {
    const params = {
      from: fromCurrency.value,
      to: toCurrency.value,
      amount: fromAmount.value,
      swap: +updateNominal,
    }
    const rate = getCurrencyValue(fromCurrency.value) / getCurrencyValue(toCurrency.value)

    const getAmount = fromAmount.value * rate
    const getNominal = getCurrencyValue(updateNominal ? toCurrency.value : fromCurrency.value, true)

    setQueryParams(params)

    return toAmount.value = mathFunctions[updateNominal ? MULTIPLICATION : DIVISION](getAmount, getNominal)
  }

  function swapCurrencies() {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]
    updateCurrencies(isSwapCurrencies.value = !isSwapCurrencies.value)
  }


  const filteredCurrencies = computed(() => {
    return currencies.value.filter(currency => {
      return currency.Name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        currency.CharCode.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
  })

  return {
    currencies,
    fromAmount,
    errorMessage,
    toAmount,
    fromCurrency,
    toCurrency,
    searchTerm,
    date,
    getCurrencies,
    updateCurrencies,
    swapCurrencies,
    filteredCurrencies,
  }
})
