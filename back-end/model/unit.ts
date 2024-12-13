import { Unit as UnitPrisma } from '@prisma/client';

export class Unit {
    private id?: number;
    private name: string;
    private type: string;
    private points: number;
    private armyId: number;
    private attack: number;
    private defense: number;
    private hitpoints: number;

    constructor(unit: {
        id?: number;
        name: string;
        type: string;
        points: number;
        armyId: number;
        attack: number;
        defense: number;
        hitpoints: number;
    }) {
        this.id = unit.id;
        this.name = unit.name;
        this.type = unit.type;
        this.points = unit.points;
        this.armyId = unit.armyId;
        this.attack = unit.attack;
        this.defense = unit.defense;
        this.hitpoints = unit.hitpoints;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getPoints(): number {
        return this.points;
    }

    getArmyId(): number {
        return this.armyId;
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

    static from({ id, name, type, points, armyId, attack, defense, hitpoints }: UnitPrisma): Unit {
        return new Unit({ id, name, type, points, armyId, attack, defense, hitpoints });
    }
}
