import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk('product/getProduct', async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
        let link = "/api/v1/products?page=" + page;
        if (category) {
            link += "&category=" + category;
        }
        if (keyword) {
            link += "&keyword=" + keyword;
        }

        // const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(
        //     keyword)}&page=${page}` : `/api/v1/products?page=${page}`;
        // const link = '/api/v1/products';
        const { data } = await axios.get(link); //we had lot of properties so we destructured the entire result objrct and only took data key-property
        //promise lifecycle actions are crrated by thunk itself
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id, { rejectWithValue }) => {
    try {
        const link = `/api/v1/product/${id}`;
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        resultsPerPage: 4,
        totalPages: 0
        // this product variable will hold the state of the product whose details are to be displayed, it is set to null because -->
        /*
         in my backend the response looks like this:
            res.status(200).json({
                success: true,
                product,
            });
   */
        // so in the begining it is null, but as soon as the user clicks on a product -->
        // it will be updated to the product whose details are to be displayed.

    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultsPerPage = action.payload.resultsPerPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong'
                // state.products=[]
            })
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.product = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong'
                state.product = null
            })

    }
})
export const { removeErrors } = productSlice.actions
export default productSlice.reducer
