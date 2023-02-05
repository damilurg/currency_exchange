import { CURRENCY_CONVERTER_LIMIT, DIVISION, MULTIPLICATION } from '@/config';

export const mathFunctions = {
  [MULTIPLICATION]: (a, b) => (a * b).toFixed(CURRENCY_CONVERTER_LIMIT),
  [DIVISION]: (a, b) => (a / b).toFixed(CURRENCY_CONVERTER_LIMIT),
}
