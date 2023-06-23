import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

type Status = 'loading' | 'success' | 'error'

type Product = {
    id: number
    title: string
    price: number
    quantity: number
}

interface ProductSliceState {
    productData: Product[]
    status: Status
    error: object
}

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    try {
        const { data } = await axios.get('/product-all')
        return data
    } catch (error: any) {
        throw error.response.data
    }
})

const initialState: ProductSliceState = {
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
            state.productData = []
            state.status = 'loading'
            state.error = {}
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.productData = action.payload
            state.status = 'success'
            state.error = {}
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.productData = []
            state.status = 'error'
            state.error = action.error
        })
    }
})

export default productSlice.reducer