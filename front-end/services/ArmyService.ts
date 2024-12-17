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
  
  const ArmyService = {
    getAllArmies,
    getArmyById,
  };
  
  export default ArmyService;
  