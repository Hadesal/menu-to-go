/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsListView from "@components/Views/ItemsListView";
import ItemsGridView from "@components/Views/ItemsGridView";
import EmptyState from "@components/EmptyStateComponet/EmptyState";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";

interface ItemsViewSectionProps {
  filteredItems: RestaurantData[] | ProductData[] | CategoryData[];
  listView: boolean;
  styles: any;
  CardIcon: string;
  editFunction: (item: any) => void;
  deleteFunction: (item: any) => void;
  duplicateFunction?: (item: any) => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

export const ItemsViewSection = ({
  filteredItems,
  listView,
  styles,
  CardIcon,
  editFunction,
  deleteFunction,
  duplicateFunction,
  emptyStateTitle,
  emptyStateMessage,
}: ItemsViewSectionProps) => {
  if (filteredItems?.length > 0) {
    return listView ? (
      <ItemsListView
        CardIcon={CardIcon}
        items={filteredItems}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
        duplicateFunction={duplicateFunction}
        styles={styles}
      />
    ) : (
      <ItemsGridView
        CardIcon={CardIcon}
        items={filteredItems}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
        styles={styles}
      />
    );
  } else {
    return (
      <EmptyState
        emptyStateTitle={emptyStateTitle}
        emptyStateMessage={emptyStateMessage}
      />
    );
  }
};
