import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios from '../../axios'

type Status = 'loading' | 'success' | 'error'

type Product = {
    id?: number
    title: string
    price: number
    quantity: number
}

interface ProductSliceState {
    productData: Product[]
    status: Status
    errors: SerializedError[]
}

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    try {
        const { data } = await axios.get('/product-all')
        return data
    } catch (error: any) {
        throw error.response.data
    }
})

export const postAddProduct = createAsyncThunk('product/postAddProduct', async (params: object) => {
    try {
        const { data } = await axios.post('/product-add', params)
        return data
    } catch (error: any) {
        throw error.response.data
    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (params: number) => {
    try {
        await axios.delete(`/product-delete/${params}`)
        return params
    } catch (error: any) {
        throw error.response.data
    }
})

const initialState: ProductSliceState = {
    productData: [],
    status: 'loading',
    errors: []
}

const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.productData = []
            state.status = 'loading'
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.productData = action.payload
            state.status = 'success'
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.status = 'error'
            state.errors = new Array(...state.errors, action.error)
        })

        builder.addCase(postAddProduct.fulfilled, (state, action) => {
            state.productData = new Array(...state.productData, action.payload)
            state.status = 'success'
        })
        builder.addCase(postAddProduct.rejected, (state, action) => {
            state.status = 'error'
            state.errors = new Array(...state.errors, action.error)
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.productData = state.productData.filter(obj => obj.id !== action.payload)
            state.status = 'success'
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'error'
            state.errors = new Array(...state.errors, action.error)
        })
    }
})

export default productSlice.reducer