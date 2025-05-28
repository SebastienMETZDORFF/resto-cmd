import { useDispatch, useSelector } from "react-redux";
import { isVoucherAvailable } from "../../app/selectors";
import { cartSlice } from "../cart/cartSlice";

export const Voucher = () => {
  const dispatch = useDispatch();
  const available = useSelector(isVoucherAvailable);

  return (
    <div className="Voucher">
      {available && (
        <button
          onClick={() => dispatch(cartSlice.actions.applyVoucher({ price: 2 }))}
        >
          Ajouter ma promo Super crémeux à 2 euros
        </button>
      )}
    </div>
  );
};
