import { useDispatch, useSelector } from "react-redux";
import * as ProductList from "../../common/models";
import { ProductCard } from "../../common/components/ProductCard";
import { addProductThunk } from "../cart/cartSlice";
import { getUnavailableProducts } from "../../app/selectors";
import { getUnavailableThunk } from "./menuSlice";
import { useEffect } from "react";

export const Menu = () => {
  const dispatch = useDispatch();
  const unavailableProducts = useSelector(getUnavailableProducts);

  useEffect(() => {
    dispatch(getUnavailableThunk());
  });

  return (
    <div className="Menu">
      {Object.values(ProductList).map((product) => (
        <ProductCard
          key={product.title}
          unavailable={unavailableProducts?.includes(product.title)}
          product={product}
          onSelect={() => dispatch(addProductThunk(product))}
        />
      ))}
    </div>
  );
};
