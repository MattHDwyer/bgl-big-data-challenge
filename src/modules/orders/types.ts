export type PackagingOptions = {
  id: string;
  productCode: string;
  packagingOptions: PackagingOptionProps[];
};

export interface PackagingOptionProps {
  amount: number;
  price: number;
}
