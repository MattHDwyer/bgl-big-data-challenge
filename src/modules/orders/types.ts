export type PackagingOptions = {
  id: string;
  productCode: string;
  packagingOptions: PackagingOptionProps[];
};

export interface PackagingOptionProps {
  amount: number;
  price: number;
}

export type CustomerOrder = {
  id: string;
  productCode: string;
  amount: number;
};

export type CustomerOrderInput = {
  productCode: string;
  amount: number;
};
