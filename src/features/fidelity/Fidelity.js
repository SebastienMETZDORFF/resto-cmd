import { useGetFidelityQuery } from "../../services/fidelityApi";

export const Fidelity = () => {
  const { data: fidelity, isLoading } = useGetFidelityQuery();

  return (
    !isLoading && (
      <div className="FidelityPoints">
        Vos points de fidélité s&#39;élèvent à {fidelity?.amount} points
      </div>
    )
  );
};
