export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BillboardColumn = {
  id: string
  label: string;
  createdAt: string;
}

export type CategoryColumn = {
  id: string
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export type ColorColumn = {
  id: string
  name: string;
  value: string;
  createdAt: string;
}

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export type Product = {
  id: string;
  name: string;
  price: string;
  category: CategoryColumn;
  size: SizeColumn;
  color: ColorColumn;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}
