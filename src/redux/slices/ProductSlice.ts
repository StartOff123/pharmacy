import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

interface User {
    id: number,
    title: string,
    price: string,
    quantity: number
}

export const getAllProducts = createAsyncThunk<User, {id: number} & Partial<User>>('product/getAllProducts', async () => {
    try {
        const { data } = await axios.get('/product-all')
        return data
    } catch (error: any) {
        throw error.response.data
    }
})

const initialState = {
    productData: [],
    status: 'loading',
    error: {}
}

const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.productData = [],
                state.status = 'loading',
                state.error = {}
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.productData = action.payload,
                state.status = 'loaded',
                state.error = {}
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.productData = [],
                state.status = 'error',
                state.error = action.error
        })
    }
})

export default productSlice.reducer