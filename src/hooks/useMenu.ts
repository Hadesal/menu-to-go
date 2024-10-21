import { useState } from "react";

const useMenu = (itemsLength: number) => {
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(new Array(itemsLength).fill(null));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  return { anchorEls, handleMenuClick, handleMenuClose };
};

export default useMenu;