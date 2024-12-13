import { Army as ArmyPrisma, Unit as UnitPrisma } from '@prisma/client';
import { Unit } from './unit'; // Assuming Unit is defined in a separate file

export class Army {
    private id?: number;
    private name: string;
    private userId: number;
    private attack: number;
    private defense: number;
    private hitpoints: number;
    private maxCost: number;
    private units: Unit[];

    constructor(army: {
        id?: number;
        name: string;
        userId: number;
        attack?: number;
        defense?: number;
        hitpoints?: number;
        maxCost: number;
        units: Unit[];
    }) {
        this.id = army.id;
        this.name = army.name;
        this.userId = army.userId;
        this.attack = army.attack || 0;
        this.defense = army.defense || 0;
        this.hitpoints = army.hitpoints || 0;
        this.maxCost = army.maxCost;
        this.units = army.units || [];
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
        return this.attack;
    }

    getDefense(): number {
        return this.defense;
    }

    getHitpoints(): number {
        return this.hitpoints;
    }

    getMaxCost(): number {
        return this.maxCost;
    }

    getUnits(): Unit[] {
        return this.units;
    }

    // calculateStats(): void {
    //     this.attack = this.units.reduce((sum, unit) => sum + unit.getAttack(), 0);
    //     this.defense = this.units.reduce((sum, unit) => sum + unit.getDefense(), 0);
    //     this.hitpoints = this.units.reduce((sum, unit) => sum + unit.getHitpoints(), 0);
    // }

    static from({ id, name, userId, attack, defense, hitpoints, maxCost }: ArmyPrisma, units: Unit[]): Army {
        return new Army({ id, name, userId, attack, defense, hitpoints, maxCost, units });
    }
}