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

export type CustomerOrderCalculation = {
  id: string;
  productCode: string;
  packages: CustomerOrderPackages[];
};

export interface CustomerOrderPackages {
  numberOfPackages: number;
  numberOfItems: number;
  price: number;
}
