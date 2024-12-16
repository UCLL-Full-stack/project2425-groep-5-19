import { Army as ArmyPrisma } from '@prisma/client';
import { Unit } from './unit';
import { Faction } from '../types';

export class Army {
    private id?: number;
    private name: string;
    private userId: number;
    private maxCost: number;
    private units: Unit[];
    private faction: Faction;

    constructor(army: {
        id?: number;
        name: string;
        userId: number;
        maxCost: number;
        units: Unit[];
        faction: Faction;
    }) {
        this.id = army.id;
        this.name = army.name;
        this.userId = army.userId;
        this.maxCost = army.maxCost;
        this.units = army.units;
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

    getMaxCost(): number {
        return this.maxCost;
    }

    getUnits(): Unit[] {
        return this.units;
    }

    getFaction(): Faction {
        return this.faction;
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

    
    static from({ id, name, userId, maxCost, faction }: ArmyPrisma, units: Unit[]): Army {
        return new Army({ id, name, userId, maxCost, units, faction: faction as Faction });
    }
}
