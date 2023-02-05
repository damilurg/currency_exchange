import { useURL } from '@/common/modules/useURL'
import {
  CURRENCY_CONVERTER_LIMIT,
  DATETIME_FORMAT,
  DEFAULT_CONVERTER_AMOUNT,
  DEFAULT_CONVERTER_FROM_CURRENCY,
  DEFAULT_CONVERTER_TO_CURRENCY,
  JSON_URL,
} from '@/config'
import axios from 'axios'
import { defineStore } from 'pinia'
import moment from 'moment'
import { computed, ref } from 'vue'


export const useCurrenciesStore = defineStore('currencies', () => {
  // ------ Queries params ------ //
  const { getQueryParams, setQueryParams } = useURL()
  const defaultAmount = isNaN(Number(getQueryParams().amount)) ? DEFAULT_CONVERTER_AMOUNT : getQueryParams().amount
  const isNumeric = (value) => !isNaN(value)
  const checkCharCode = (value) => value?.length === 3 ? isNumeric(value) ? '' : value : ''

  // ----- Reactive variables ----- //
  const currencies = ref([])
  const date = ref()
  const fromCurrency = ref(checkCharCode(getQueryParams().from) || DEFAULT_CONVERTER_FROM_CURRENCY)
  const toCurrency = ref(checkCharCode(getQueryParams().to) || DEFAULT_CONVERTER_TO_CURRENCY)
  const fromAmount = ref(defaultAmount || DEFAULT_CONVERTER_AMOUNT)
  const toAmount = ref(0)
  const errorMessage = ref('')
  const searchTerm = ref('')

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

  function getCurrencyValue(value, nominal = false) {
    const result = currencies.value.find(currency => currency.CharCode === value)
    return nominal ? result?.Nominal : result?.Value
  }

  const getRate = (from, to) => {
    return (getCurrencyValue(from) / getCurrencyValue(from, true))
      / (getCurrencyValue(to) / getCurrencyValue(to, true))
  }

  function updateCurrencies() {
    setQueryParams({
      from: fromCurrency.value,
      to: toCurrency.value,
      amount: fromAmount.value,
    })

    if (fromCurrency.value === toCurrency.value) return toAmount.value = fromAmount.value
    return toAmount.value = (fromAmount.value * getRate(fromCurrency.value, toCurrency.value)).toFixed(CURRENCY_CONVERTER_LIMIT)
  }

  function swapCurrencies() {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]
    updateCurrencies()
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
