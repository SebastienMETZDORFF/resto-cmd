import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { SuperCremeux } from "../../common/models";

export const Cart = () => {
  const store = useStore();

  const [list, setList] = useState(store.getState().list);

  const totalCommand = list.reduce(
    (prv, cur) => Math.round(prv + cur.price),
    0
  );

  useEffect(() => {
    store.subscribe(() => setList(store.getState().list));
  }, [store]);

  return (
    <div className="Selection">
      <h1>Choisir son menu</h1>
      <div className="CartNavBar">
        <button
          onClick={() =>
            store.dispatch({ type: "ADD_PRODUCT", payload: SuperCremeux })
          }
        >
          Ajouter un super crémeux
        </button>
      </div>
      {list?.map((item, index) => (
        <span key={item} className="SelectedProduct">
          {item.title} {item.price} €
        </span>
      ))}
      {list.length === 0 ? (
        <div className="TotalCommand">Aucun produit sélectionné</div>
      ) : (
        <div className="TotalCommand">Total : {totalCommand} €</div>
      )}
    </div>
  );
};
