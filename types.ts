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