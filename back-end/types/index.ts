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
};

export {
    Role,
    Faction,
   
    UserInput,
   
    
    AuthenticationResponse,
};
