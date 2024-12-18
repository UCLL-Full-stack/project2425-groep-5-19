import { Unit } from "@types";

const getAllUnits = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/units", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,  
    },
  });
};

const getUnitById = (unitId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/units/${unitId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,  
    },
  });
};

const updateUnitStats = (unitId: number, updatedStats: Partial<Unit>) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/update-stats`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,  
      },
      body: JSON.stringify(updatedStats),
  });
};

const getUnitsByFaction = async (faction: "Imperium" | "Chaos") => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/faction/${faction}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,  
      },
  });
};

const addUnitToArmy = async (unitId: number, armyId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/add-to-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,  
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add unit to the army.");
  }

  return response.json(); 
};

const removeUnitFromArmy = async (unitId: number, armyId: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/remove-from-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,  
      },
  });
};

  
  const UnitService = {
    getAllUnits,
    getUnitById,
    updateUnitStats,


    getUnitsByFaction,

    addUnitToArmy,
    removeUnitFromArmy
  };
  
  export default UnitService;
  