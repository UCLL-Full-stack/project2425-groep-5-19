import { Unit as UnitPrisma } from '@prisma/client';
import { Faction } from '../types';

export class Unit {
    private id?: number;
    private name: string;
    
    private points: number;
    
    private attack: number;
    private defense: number;
    private hitpoints: number;
    private faction: Faction;

    constructor(unit: {
        id?: number;
        name: string;
       
        points: number;
        
        attack: number;
        defense: number;
        hitpoints: number;
        faction: Faction;
    }) {
        this.id = unit.id;
        this.name = unit.name;
        
        this.points = unit.points;
        
        this.attack = unit.attack;
        this.defense = unit.defense;
        this.hitpoints = unit.hitpoints;
        this.faction = unit.faction;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    

    getPoints(): number {
        return this.points;
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

    getFaction(): Faction {
        return this.faction;
    }

    static from({ id, name, points,  attack, defense, hitpoints,faction }: UnitPrisma): Unit {
        return new Unit({ id, name, points, attack, defense, hitpoints, faction: faction as Faction });
    }
}
