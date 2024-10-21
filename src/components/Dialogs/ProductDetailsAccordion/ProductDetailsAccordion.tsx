// ProductDetailsAccordion.tsx

import ItemList from "./accordionComponents/ItemList";
import VariantGroup from "./accordionComponents/VariantGroup";

interface ProductDetailsAccordionProps {
  accordionTitle: string;
  namePlaceHolder: string;
  showPrice?: boolean;
  errors?: { nameError: boolean; priceError?: boolean; index: number }[];
  onItemsChange?: (
    items: { name: string; price?: number; image?: string | null }[]
  ) => void;
  onVariantsChange?: (variantGroup: {
    name: string;
    variants: { name: string; price: number }[];
  }) => void;
  isVariant: boolean;
  initialDataName?: string;
  initialDataList: { name: string; price?: number }[];
}

const ProductDetailsAccordion = ({
  isVariant,
  onItemsChange,
  onVariantsChange,
  initialDataName,
  initialDataList = [],
  ...rest
}: ProductDetailsAccordionProps) => {
  return isVariant ? (
    <VariantGroup
      onVariantsChange={onVariantsChange!}
      initialDataName={initialDataName}
      initialDataList={initialDataList as { name: string; price: number }[]}
      {...rest}
    />
  ) : (
    <ItemList
      onItemsChange={onItemsChange!}
      initialDataList={initialDataList}
      {...rest}
    />
  );
};

export default ProductDetailsAccordion;
