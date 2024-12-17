import { Army as ArmyPrisma } from '@prisma/client';
import { Unit } from './unit';
import { Faction } from '../types';

export class Army {
    private id?: number;
    private name: string;
    private userId: number;
    private attack: number;
    private defense: number;
    private hitpoints: number;
    private maxCost: number;
    private units: Unit[];
    private faction: Faction;

    constructor(army: {
        id?: number;
        name: string;
        userId: number;
        attack: number;
        defense: number;
        hitpoints: number;
        maxCost: number;
        units: Unit[];
        faction: Faction;
    }) {
        this.id = army.id;
        this.name = army.name;
        this.userId = army.userId;
        this.attack = army.attack ;
        this.defense = army.defense ;
        this.hitpoints = army.hitpoints ;
        this.maxCost = army.maxCost;
        this.units = army.units ;
        this.faction = army.faction;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getUserId(): number {
        return this.userId;
    }

    getAttack(): number {
        return this.units.reduce((sum, unit) => sum + unit.getAttack(), 0);
    }
    
    getDefense(): number {
        return this.units.reduce((sum, unit) => sum + unit.getDefense(), 0);
    }

    
    getHitpoints(): number {
        return this.units.reduce((sum, unit) => sum + unit.getHitpoints(), 0);
    }
    getMaxCost(): number {
        return this.maxCost;
    }

    getUnits(): Unit[] {
        return this.units;
    }
    getFaction(): Faction {
        return this.faction;
    }



    static from({ id, name, userId, attack, defense, hitpoints, maxCost, faction }: ArmyPrisma, units: Unit[]): Army {
        return new Army({ id, name, userId, attack, defense, hitpoints, maxCost, units, faction: faction as Faction });
    }
}
