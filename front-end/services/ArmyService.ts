const getAllArmies = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/armies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  
  const getArmyById = (armyId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/armies/${armyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createArmy = async ({ name, faction, userId }: { name: string; faction: "Imperium" | "Chaos"; userId: number }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/armies/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, faction, userId }),
    });
};

const getUnitsByFaction = async (faction: "Imperium" | "Chaos") => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/faction/${faction}`);
};

const addUnitToArmy = async (unitId: number, armyId: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/add-to-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
  });
};


const removeUnitFromArmy = async (unitId: number, armyId: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/${unitId}/remove-from-army/${armyId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
  });
};


  
  const ArmyService = {
    getAllArmies,
    getArmyById,
    createArmy,
    getUnitsByFaction,

    addUnitToArmy,
    removeUnitFromArmy
  };
  
  export default ArmyService;
  