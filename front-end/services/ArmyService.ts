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




  
  const ArmyService = {
    getAllArmies,
    getArmyById,
    createArmy,
    
  };
  
  export default ArmyService;
  