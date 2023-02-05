<template>
  <div>
    <nav>
      <router-link to="/">Currency List</router-link>
      <router-link to="/converter">Converter</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import CurrencyList from './CurrencyList.vue';
import CurrencyConverter from './CurrencyConverter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CurrencyList },
    { path: '/converter', component: CurrencyConverter }
  ]
});

const app = createApp({
  setup() {
    return {
      router
    };
  }
});

app.use(router);
app.mount('#app');
</script>
