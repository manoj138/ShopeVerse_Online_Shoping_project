import axios from "axios";

const BASE_URL = "https://dummyjson.com";

const transformProduct = (product, index) => {
    const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
    const originalPrice = discount > 0 ? Math.round((product.price * 100) / (100 - discount)) : product.price;

    return {
        id: product.id,
        name: product.title,
        slug: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),

        description: product.description,
        price: Math.round(product.price * 83),
        originalPrice: Math.round(originalPrice * 83),
        discount,
        category: product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, " "),
        subcategory: product.tags?.[0] || product.category,
        brand: product.brand || "Generic",

        images: product.images || [product.thumbnail],

        rating: product.rating || 4.0,

        reviewCount: product.reviews?.length || Math.floor(Math.random() * 500) + 50,

        stock: product.stock || 50,

        sizes: product.category === "mens-shirts" || product.category === "womens-dresses" || product.category === "tops" ? ["S", "M", "L", "XL", "XXL"] : [],

        colors: product.category === "smartPhones" || product.category === "laptops" ? ["Black", "Silver", "Gold"] : [],

        features : product.tags || [],

        specifications : {
            Brand : product.brand || "Generic",
            category : product.category,
            "Availability Status" : product.availabiltyStatus || "In Stok",
            Shipping: product.shippingInformation || "Free Shipping",
        },
        isFeatured : index < 8,

        isNew : product.meta?.createdAt ? new Date(product.meta?.createdAt) > new Date(Date.now()-30 * 24 * 60 * 60 * 1000) : index % 3 === 0,

        createdAt: product.meta?.createdAt || new Date().toISOString().split("T")[0],
    }
}
const categoryIcons = {
  beauty: "💄",
  fragrances: "🌸",
  furniture: "🪑",
  groceries: "🛒",
  "home-decoration": "🏠",
  "kitchen-accessories": "🍳",
  laptops: "💻",
  "mens-shirts": "👔",
  "mens-shoes": "👞",
  "mens-watches": "⌚",
  "mobile-accessories": "📱",
  motorcycle: "🏍️",
  "skin-care": "🧴",
  smartphones: "📱",
  "sports-accessories": "⚽",
  sunglasses: "🕶️",
  tablets: "📱",
  tops: "👚",
  vehicle: "🚗",
  "womens-bags": "👜",
  "womens-dresses": "👗",
  "womens-jewellery": "💍",
  "womens-shoes": "👠",
  "womens-watches": "⌚",
};
const transfromCategory = (category, index) =>{
    const slug = typeof category === "string" ? category : category.slug;

    const name = typeof category === "string" ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ") : category.name;

    return{
        id:index +1,
        name,
        slug,
        icon : categoryIcons[slug] || "📦",
        count : Math.floor(Math.random() * 100) +20
    }
};

export const fetchProducts = async ()=>{
    try{
        const response = await axios.get(`${BASE_URL}/products?limit=100`);


        return response?.data?.products.map(transformProduct);
    }catch(error){
        console.log("Error fetching products : ", error);
        throw error
    }
}
console.log("🚀 ~ fetchProducts ~ fetchProducts:", fetchProducts())

export const fetchProductById = async (id) =>{
    try{
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if(!response.ok){
            throw new Error("Failed to fetch product")
        }
        const product = await response.json();
        return transformProduct(product, 0);
    }catch(error){
        console.log("Error fetching Product : ", error);
        throw error;
    }
}

export const fetchCategories = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/products/categories`)
        if(!response.ok){
            throw new Error("Failed to fetch categories")
        }
        const categories = await response.json();
        return categories.map(transfromCategory)
    }catch(error){
        console.error("Error fetching Categories:", error);
        throw error
        
    }
}

export const searchProducts = async(query)=>{
    try{
       const response= await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
       if(!response.ok){
        throw new Error("Failed to search products")
    }
    const data = await response.json();
    return data.products.map(transformProduct)
    }catch(error){
        console.error("Error fetching products by category", error);
        throw error
    }
}

export const extractBrands = (products)=>{
    const brandMap = new Map()
    products.forEach((product) => {
        if (product.brand && !brandMap.has(product.brand)){
               brandMap.set(product.brand, {
        id: brandMap.size + 1,
        name: product.brand,
        slug: product.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        logo: "🏷️",
      });
        }
    });
    return Array.from(brandMap.values());
}