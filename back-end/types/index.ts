type Role = 'admin' | 'user';
type Faction = 'Imperium' | 'Chaos';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};


type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
    id: number;
};

type Unit = {
    name: string;          
    type: string;         
    attack: number;        
    defense: number;       
    hitpoints: number;     
    cost: number;          
};

type ArmyInput = {
    name: string;               
    userId: number;            
    attack: number;             
    defense: number;           
    hitpoints: number;          
    maxCost: number;           
    units: Unit[];
    faction: Faction
};

type UnitInput = {
    name: string;        
    type: string;       
    points: number;     
     
    attack: number;      
    defense: number;     
    hitpoints: number;   
    faction: Faction;    
}
export {
    Role,
    Faction,
   ArmyInput,
    UserInput,
   UnitInput,
    
    AuthenticationResponse,
};
