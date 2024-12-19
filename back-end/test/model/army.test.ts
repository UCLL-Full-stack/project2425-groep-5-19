import { Army } from '../../model/army';
import { Unit } from '../../model/unit';
import { Faction } from '../../types';

describe('Army domain object tests', () => {
    test('given: valid values for army, when: army is created, then: army is created with those values', () => {
        
       
        const unit1 = new Unit({
            id: 1,
            name: 'Infantry',
            attack: 10,
            defense: 5,
            hitpoints: 20,
            points: 50,
            
            faction: 'Imperium' as Faction,  
        });

        const unit2 = new Unit({
            id: 2,
            name: 'Tank',
            attack: 30,
            defense: 20,
            hitpoints: 100,
            points: 200,
            
            faction: 'Alliance' as Faction,  
        });

        const army = new Army({
            name: 'Alpha Army',
            userId: 1,
            attack: 0, 
            defense: 0, 
            hitpoints: 0, 
            maxCost: 0, 
            units: [unit1, unit2],
            faction: 'Choas' as Faction, 
        });

        // Tests
        expect(army.getName()).toBe('Alpha Army');
        expect(army.getUserId()).toBe(1);
        expect(army.getFaction()).toBe('Alliance');
        expect(army.getUnits()).toContain(unit1);
        expect(army.getUnits()).toContain(unit2);
        expect(army.getAttack()).toBe(40); // 10 (Infantry) + 30 (Tank)
        expect(army.getDefense()).toBe(25); // 5 (Infantry) + 20 (Tank)
        expect(army.getHitpoints()).toBe(120); // 20 (Infantry) + 100 (Tank)
        expect(army.getMaxCost()).toBe(250); // 50 (Infantry) + 200 (Tank)
    });
});




