import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractBrands, fetchProducts } from "../services/productApi";
import { fetchCategories, fetchProductById } from "../services/productApi";

export const fetchProductsAsync = createAsyncThunk("products/fetchProducts",
 async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      const brands = extractBrands(products);
      return {products, brands};
    }catch(error){
      return rejectWithValue(error.message);
    }
  }
)

export const fetchCategoriesAsync = createAsyncThunk(
    "products/fetchCategories",
    async (_, { rejectWithValue })=>{
      try{
        const categories = await fetchCategories();
        return categories;
      }catch(error){
        return rejectWithValue(error.message);
      }
    }
)

export const fetchProductByIdAsync = createAsyncThunk(
    "products/fetchProductById",
    async (id, {rejectWithValue})=>{
        try{
            const product = await fetchProductById(id)
            return product
        }catch(error){
        return rejectWithValue(error.message);
      }
    }
)


const initialState = {
  items: [],
  categories: [],
  brands: [],
  filteredItems: [],
  selectedProduct: null,
  isLoading: false,
  categoriesLoading: false,
  error: null, 
  filters: {
    category: "",
    brand: "",
    priceRange: [0, 500000],
    rating: 0,
    search: "",
    sortBy: "popularity",
  },
  recentlyViewed: [],
  searchResults: [],
  isInitialized: false,
};



const applyFilters = (items, filters)=>{

    let filtered = [...items]

    if(filters.search){
        const query = filters.search.toLowerCase();

    filtered = filtered.filter(
  (product) =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query)
);
    }

    if(filters.category){
        filtered =filtered.filter(
            (product)=> product.category.toLowerCase() === filters.category.toLowerCase()
        )
    }
     if (filters.brand) {
    filtered = filtered.filter(
      (product) => product.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }

    if (filters.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );
  }

    if (filters.rating > 0) {
    filtered = filtered.filter((product) => product.rating >= filters.rating);
  }

  switch(filters.sortBy){
     case "price-low":
        filtered.sort((a,b)=> a.price - b.price);
        break;

          case "price-high":
        filtered.sort((a,b)=> b.price - a.price);
        break;

          case "rating":
              
              filtered.sort((a,b)=> b.rating - a.rating);
        break;

          case "newest":
             filtered.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
        break;

        case "papularity":
            default :
              filtered.sort((a,b)=> b.reviewCount - a.reviewCount);
              break;
  }
  return filtered;
};

const productSlice = createSlice({
  name : "products",
  initialState,
  reducers:{
    setProducts:(state, action)=>{
      state.items = action.payload;
      state.filteredItems =action.payload;
    },
    setSeleProduct : (state,action)=>{
      state.selectedProduct = action.payload;
    },
    setLoading :(state, action)=>{
      state.error =action.payload
    },
    setError: (state, action)=>{
      state.error= action.payload;
    }, 
    setFilters:(state, action)=>{
      state.filters = {
        ...state.filters,
        ...action.payload
      }
      state.filteredItems = applyFilters(state.items, state.filters)
    },
    clearFilters:(state)=>{
      state.filters ={
        category: "",
        brand: "",
        priceRange:[0,500000],
        rating:0,
        search :"",
        sortBy: "popularity",
      };
      state.filteredItems = state.items;
    },

    searchProducts:(state, action)=>{
      const query = action.payload.toLowerCase();
      state.filters.search = action.payload;
      if(query.length > 0){
        state.searchResults = state.items
        .filter((product)=> product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) 
      )
      .slice(0, 5);
      }else{
        state.searchResults = [];
      }
      state.filteredItems = applyFilters(state.items, state.filters);
    },
    clearSearch : (state) =>{
      state.filters.search = "",
      state.searchResults = [];
    },

    addToRecentlyViewed:(state, action)=>{
      const product = action.payload;
      state.recentlyViewed = [
        product,
        ...state.recentlyViewed.filter((p)=>p.id !== product.id),
      ].slice(0, 10)
    },

  },
  extraReducers: (builder) =>{
    builder
    .addCase(fetchProductsAsync.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchProductsAsync.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.items = action.payload.products;
      state.brands = action.payload.brands;
      state.filteredItems = applyFilters(
        action.payload.products,
        state.filters
      );
      state.isInitialized = true;
    })
    .addCase(fetchProductsAsync.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch products"
    })
    .addCase(fetchCategoriesAsync.pending, (state)=>{
      state.categoriesLoading = true;
    })
    .addCase(fetchCategoriesAsync.fulfilled, (state, action)=>{
      state.categoriesLoading =false;
      state.categories = action.payload;
    })
    .addCase(fetchCategoriesAsync.rejected, (state, action)=>{
      state.categoriesLoading = false;
      state.error = action.payload || "Failed to fetch categories"
    })

    .addCase(fetchProductByIdAsync.pending, (state)=>{
      state.isLoading = true;
    })
  .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
       
        if (!state.items.find((p) => p.id === action.payload.id)) {
          state.items.push(action.payload);
        }
      })

      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export const {
    setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  searchProducts,
  clearSearch,
  addToRecentlyViewed,
} = productSlice.actions;

export default productSlice.reducer;