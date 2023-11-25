export interface user {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  name: string
  password: string
  birthDate: Date
  image: string
  country: string
  city: string
  address: string
  select: string;
}

export interface item {
  id: number
  rating: number
  title: string
  brand: string
  description: string
  category: string
  discountPercentage: number
  price: number
  stock: number
  thumbnail: string
  images: any
  image: string
}


