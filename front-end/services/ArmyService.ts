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

  const createArmy = async (army: { name: string; faction: "Imperium" | "Chaos" }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/armies/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(army),
    });
};
  
  const ArmyService = {
    getAllArmies,
    getArmyById,
    createArmy
  };
  
  export default ArmyService;
  