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
  
  const UnitService = {
    getAllUnits,
    getUnitById,
  };
  
  export default UnitService;
  