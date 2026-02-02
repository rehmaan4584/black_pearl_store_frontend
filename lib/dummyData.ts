// lib/dummyData.ts

export const dummyProducts = [
  {
    id: 1,
    title: "Classic Blue Jeans",
    description: "Premium denim jeans with perfect fit and comfort",
    type: "JEANS",
    gender: "MEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 1,
        productId: 1,
        size: "M",
        color: "BLUE",
        sku: "JP-M-BLUE-001",
        price: 3500,
        images: [
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
            publicId: "dummy-1",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 50 }
      },
      {
        id: 2,
        productId: 1,
        size: "L",
        color: "DARK_BLUE",
        sku: "JP-L-DBLUE-001",
        price: 3500,
        images: [
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
            publicId: "dummy-2",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 30 }
      }
    ]
  },
  {
    id: 2,
    title: "Casual Denim Shorts",
    description: "Comfortable shorts for summer days",
    type: "SHORTS",
    gender: "MEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 3,
        productId: 2,
        size: "M",
        color: "LIGHT_BLUE",
        sku: "SH-M-LBLUE-001",
        price: 2500,
        images: [
          {
            id: 3,
            url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
            publicId: "dummy-3",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 40 }
      }
    ]
  },
  {
    id: 3,
    title: "Cotton Casual Shirt",
    description: "Soft cotton shirt for everyday wear",
    type: "SHIRTS",
    gender: "MEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 4,
        productId: 3,
        size: "L",
        color: "BLACK",
        sku: "SH-L-BLACK-001",
        price: 2800,
        images: [
          {
            id: 4,
            url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
            publicId: "dummy-4",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 25 }
      },
      {
        id: 5,
        productId: 3,
        size: "M",
        color: "BLUE",
        sku: "SH-M-BLUE-001",
        price: 2800,
        images: [
          {
            id: 5,
            url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
            publicId: "dummy-5",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 35 }
      }
    ]
  },
  {
    id: 4,
    title: "Slim Fit Jeans",
    description: "Modern slim fit design for stylish look",
    type: "JEANS",
    gender: "WOMEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 6,
        productId: 4,
        size: "S",
        color: "DARK_BLUE",
        sku: "JP-S-DBLUE-W001",
        price: 3800,
        images: [
          {
            id: 6,
            url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500",
            publicId: "dummy-6",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 20 }
      }
    ]
  },
  {
    id: 5,
    title: "Summer Knickers",
    description: "Breathable knickers for active lifestyle",
    type: "KNICKERS",
    gender: "UNISEX",
    brand: "Black Pearl",
    variants: [
      {
        id: 7,
        productId: 5,
        size: "M",
        color: "BLACK",
        sku: "KN-M-BLACK-001",
        price: 1800,
        images: [
          {
            id: 7,
            url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
            publicId: "dummy-7",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 60 }
      }
    ]
  },
  {
    id: 6,
    title: "Designer Shirt Collection",
    description: "Premium designer shirt with elegant style",
    type: "SHIRTS",
    gender: "WOMEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 8,
        productId: 6,
        size: "S",
        color: "LIGHT_BLUE",
        sku: "SH-S-LBLUE-W001",
        price: 3200,
        images: [
          {
            id: 8,
            url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
            publicId: "dummy-8",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 15 }
      }
    ]
  },
  {
    id: 7,
    title: "Comfort Fit Shorts",
    description: "Relaxed fit shorts for maximum comfort",
    type: "SHORTS",
    gender: "WOMEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 9,
        productId: 7,
        size: "M",
        color: "BLUE",
        sku: "SH-M-BLUE-W001",
        price: 2200,
        images: [
          {
            id: 9,
            url: "https://images.unsplash.com/photo-1591195851947-d5aa89c2e66b?w=500",
            publicId: "dummy-9",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 45 }
      }
    ]
  },
  {
    id: 8,
    title: "Premium Dark Jeans",
    description: "Luxury denim with superior quality",
    type: "JEANS",
    gender: "MEN",
    brand: "Black Pearl",
    variants: [
      {
        id: 10,
        productId: 8,
        size: "XL",
        color: "BLACK",
        sku: "JP-XL-BLACK-001",
        price: 4200,
        images: [
          {
            id: 10,
            url: "https://images.unsplash.com/photo-1542272454315-7f6d5b926bb8?w=500",
            publicId: "dummy-10",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 12 }
      },
      {
        id: 11,
        productId: 8,
        size: "L",
        color: "DARK_BLUE",
        sku: "JP-L-DBLUE-002",
        price: 4200,
        images: [
          {
            id: 11,
            url: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500",
            publicId: "dummy-11",
            isPrimary: true,
          }
        ],
        inventory: { quantity: 18 }
      }
    ]
  }
];