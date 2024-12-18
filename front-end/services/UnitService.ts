import { Unit } from "@types";

const getToken = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const token = JSON.parse(loggedInUser)?.token;
    return token;
  } else {
    console.error("User not logged in or no token found");
    return null;
  }
};

const getAllUnits = () => {

  const token = getToken();
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/units", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  
    },
  });
};

const getUnitById = (unitId: string) => {
  const token = getToken();
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/units/${unitId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  
    },
  });
};

const updateUnitStats = (unitId: number, updatedStats: Partial<Unit>) => {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/update-stats`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
      },
      body: JSON.stringify(updatedStats),
  });
};

const getUnitsByFaction = async (faction: "Imperium" | "Chaos") => {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/faction/${faction}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
      },
  });
};

const addUnitToArmy = async (unitId: number, armyId: number) => {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/add-to-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add unit to the army.");
  }

  return response.json(); 
};

const removeUnitFromArmy = async (unitId: number, armyId: number) => {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/remove-from-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
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
  