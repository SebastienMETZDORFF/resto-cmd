import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListQuantityProductPerName } from "../../app/selectors";
import * as ProductList from "../../common/models";

const TIME_TO_RESET_ORDER = 120000;
let timeOutInstance = null;

export const resetOrderThunk = createAsyncThunk(
  "cart/resetOrderThunk",
  async () => {
    timeOutInstance && clearTimeout(timeOutInstance);

    return new Promise((resolve, reject) => {
      timeOutInstance = setTimeout(() => {
        reject();
      }, TIME_TO_RESET_ORDER);
    });
  }
);

export const addProductThunk = createAsyncThunk(
  "cart/addProductThunk",
  async (product, thunkApi) => {
    thunkApi.dispatch(cartSlice.actions.addProduct(product));
    thunkApi.dispatch(resetOrderThunk());

    // Promise retournée par notre thunk
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const state = thunkApi.getState();
        const numberProductPerName = getListQuantityProductPerName(state);
        const numberForSpecialOffer = numberProductPerName.find(
          (item) => item.title === "Poulet Croquant"
        )?.quantity;

        if (numberForSpecialOffer && numberForSpecialOffer % 2 === 0) {
          if (
            window.confirm(
              "Voulez-vous ajouter une troisième fois ce produit à moitié prix ?"
            )
          ) {
            resolve();
          } else {
            reject();
          }
        } else {
          reject();
        }
      }, 5000);
    });
  }
);

export const cartSlice = createSlice({
  name: "list",
  initialState: {},
  reducers: {
    addProduct: (currentState, action) => {
      const listWithNewProduct = [...currentState, action.payload];
      return listWithNewProduct;
    },
    removeProduct: (currentState, action) => {
      const list = [...currentState.list].filter(
        (item, index) => index !== action.payload
      );
      return list;
    },
    applyVoucher: (currentState, action) => {
      const withVoucherList = currentState.map((item) =>
        item.title === "Super Crémeux"
          ? { ...item, price: action.payload.price }
          : item
      );
      return withVoucherList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductThunk.fulfilled, (state) => {
      const specialOffer = ProductList.PouletCroquant;

      return [
        ...state,
        {
          ...specialOffer,
          price: Math.round((ProductList.PouletCroquant.price / 2) * 100) / 100,
        },
      ];
    });

    builder.addCase(resetOrderThunk.rejected, () => {
      return [];
    });
  },
});
