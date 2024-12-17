import { Unit } from "@types";

const getAllUnits = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/units", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  
  const getUnitById = (unitId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/units/${unitId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateUnitStats = (unitId: number, updatedStats: Partial<Unit>) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/update-stats`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStats),
    });
};
  
  const UnitService = {
    getAllUnits,
    getUnitById,
    updateUnitStats
  };
  
  export default UnitService;
  