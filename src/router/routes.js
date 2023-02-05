import CurrencyConverter from '@/pages/CurrencyConverter.vue'
import CurrencyList from '@/pages/CurrencyList.vue'

const routes = [
  {
    path: '/',
    component: CurrencyList,
    meta: {
      title: 'Currency List',
    },
  },
  {
    path: '/converter',
    component: CurrencyConverter,
    meta: {
      title: 'Currency Converter',
    },
  }
]

export default routes
