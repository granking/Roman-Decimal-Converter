import { createSlice } from '@reduxjs/toolkit'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
    romanNumeralInputError: false,
    decimalNumberInputError: false,
  },
  reducers: {
    romanToDecimal: (state, action) => {
      const roman = action.payload.toUpperCase();
      if (!/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(roman)) {
        state.romanNumeralInputError = true;
        return
      }

      const romanToDecimal = new Map()

      romanToDecimal.set('I',1);
      romanToDecimal.set('V',5);
      romanToDecimal.set('X',10);
      romanToDecimal.set('L',50);
      romanToDecimal.set('C',100);
      romanToDecimal.set('D',500);
      romanToDecimal.set('M',1000);

      let decimal = 0;
      state.romanNumeralInputError = false;

      for (let i = 0; i < roman.length; i++) {
        let initialValue = romanToDecimal.get(roman[i]);
        let finalValue = romanToDecimal.get(roman[i + 1]);
        if (initialValue < finalValue) {
          decimal += finalValue - initialValue;
          i++;
        }else{
          decimal += romanToDecimal.get(roman[i]);
        }
      }
      state.value = decimal;
    },


    decimalToRoman: (state, action) => {
      let decimal = action.payload;
      if(!/^[0-9]+$/.test(decimal)){
        state.decimalNumberInputError = true;
        return;
      }

      if (decimal >= 4000){
        state.decimalNumberInputError = true;
        return;
      }

      const decimalToRoman = new Map();

      decimalToRoman.set('M', 1000);
      decimalToRoman.set('CM', 900);
      decimalToRoman.set('D', 500);
      decimalToRoman.set('CD', 400);
      decimalToRoman.set('C', 100);
      decimalToRoman.set('XC', 90);
      decimalToRoman.set('L', 50);
      decimalToRoman.set('XL', 40);
      decimalToRoman.set('X', 10);
      decimalToRoman.set('IX', 9);
      decimalToRoman.set('V', 5);
      decimalToRoman.set('IV', 4);
      decimalToRoman.set('I', 1);

      let roman = '';
      state.decimalNumberInputError = false;
      decimalToRoman.forEach((item, key) => {
        let result = Math.floor(decimal / item);
        decimal -= result * item;
        roman += key.repeat(result);
      })
      state.value = roman;
    },
    resetErrors: (state) => {
      state.romanNumeralInputError = false;
      state.decimalNumberInputError = false;
    },
  },
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer