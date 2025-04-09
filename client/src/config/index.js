export const registerFormControlls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControlls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const productFormFields = [
  {
    label: "Product Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    type: "dropdown",
    placeholder: "Select category",
    options: ["Men", "Women", "Kids", "Accessories", "Footwear"],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Stock Quantity",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter stock quantity",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "input",
    type: "text",
    placeholder: "Enter brand name",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter discount percentage",
  },
  {
    label: "Availability",
    name: "availability",
    componentType: "select",
    type: "dropdown",
    placeholder: "Select availability status",
    options: ["In Stock", "Out of Stock", "Pre-order"],
  },
];

// export const shoppingMenuItems = [
//   {
//     id: 1,
//     name: "Electronics",
//     subcategories: [
//       { id: 101, name: "Mobiles" },
//       { id: 102, name: "Laptops" },
//       { id: 103, name: "Headphones" },
//       { id: 104, name: "Smartwatches" }
//     ]
//   },
//   {
//     id: 2,
//     name: "Fashion",
//     subcategories: [
//       { id: 201, name: "Men's Clothing" },
//       { id: 202, name: "Women's Clothing" },
//       { id: 203, name: "Footwear" },
//       { id: 204, name: "Accessories" }
//     ]
//   },
//   {
//     id: 3,
//     name: "Home & Kitchen",
//     subcategories: [
//       { id: 301, name: "Furniture" },
//       { id: 302, name: "Home Decor" },
//       { id: 303, name: "Kitchen Appliances" },
//       { id: 304, name: "Storage & Organization" }
//     ]
//   },
//   {
//     id: 4,
//     name: "Beauty & Health",
//     subcategories: [
//       { id: 401, name: "Skincare" },
//       { id: 402, name: "Haircare" },
//       { id: 403, name: "Makeup" },
//       { id: 404, name: "Wellness" }
//     ]
//   },
//   {
//     id: 5,
//     name: "Sports & Outdoors",
//     subcategories: [
//       { id: 501, name: "Fitness Equipment" },
//       { id: 502, name: "Outdoor Gear" },
//       { id: 503, name: "Cycling" },
//       { id: 504, name: "Camping & Hiking" }
//     ]
//   },
//   {
//     id: 6,
//     name: "Toys & Baby Products",
//     subcategories: [
//       { id: 601, name: "Toys" },
//       { id: 602, name: "Baby Care" },
//       { id: 603, name: "Educational Games" },
//       { id: 604, name: "Baby Clothing" }
//     ]
//   }
// ];

export const shoppingMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home"
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing"
  },
  {
    id: "clothing",
    label: "CLothing",
    path: "/shop/listing"
  },
  {
    id: "home-appliances",
    label: "Home Appliances",
    path: "/shop/listing"
  },
  {
    id: "books",
    label: "Books",
    path: "/shop/listing"
  },
  {
    id: "toys",
    label: "Toys",
    path: "/shop/listing"
  },
]


export const filterOptions = {
  category: [
    {id: 'men', label: 'Men'},
    {id: 'women', label: 'Women'},
    {id: 'kids', label: 'Kids'},
    {id: 'accessories', label: 'Accessories'},
    {id: 'footwear', label: 'Footwear'},
  ],
  brand: [
    {id: "nike", label: "Nike"},
    {id: "adidas", label: "Adidas"},
    {id: "puma", label: "Puma"},
    {id: "levi", label: "Levi"},
    {id: "h&n", label: "H&N"},
    {id: "others", label: "Others"}
  ]
}

export const sortByOptions = [
  { id: 1, label: "Price: Low to High" },
  { id: 2, label: "Price: High to Low" },
  { id: 3, label: "Newest First" },
  { id: 4, label: "Oldest First" },
  { id: 5, label: "Best Sellers" },
  { id: 6, label: "Customer Ratings" },
  { id: 7, label: "Discount: High to Low" },
  {id: 8, label: "Title: A to Z"},
  {id: 9, label: "Title: Z to A"}
];

