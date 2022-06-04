import { createSlice } from '@reduxjs/toolkit'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
  },
  reducers: {
    romanToDecimal: (state) => {
      state.value = '123456789';
    },
    decimalToRoman: (state) => {
      state.value = '12345';
    }
  },
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer