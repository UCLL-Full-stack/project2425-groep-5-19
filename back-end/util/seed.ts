import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    
    await prisma.army.deleteMany();
    await prisma.unit.deleteMany();
    await prisma.complaint.deleteMany();
    await prisma.user.deleteMany();

    
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@warhammer.com',
            role: 'admin',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'player1',
            password: await bcrypt.hash('imperial123', 12),
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@warhammer.com',
            role: 'user',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'player2',
            password: await bcrypt.hash('chaos123', 12),
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@warhammer.com',
            role: 'user',
        },
    });

    const imperiumUnits = [
        { name: 'Space Marine', points: 100, attack: 7, defense: 6, hitpoints: 10, faction: 'Imperium' },
        { name: 'Imperial Guard', points: 50, attack: 4, defense: 4, hitpoints: 6, faction: 'Imperium' },
        { name: 'Terminator', points: 200, attack: 9, defense: 8, hitpoints: 12, faction: 'Imperium' },
        { name: 'Dreadnought', points: 250, attack: 10, defense: 10, hitpoints: 15, faction: 'Imperium' },
        { name: 'Scout Marine', points: 70, attack: 5, defense: 5, hitpoints: 8, faction: 'Imperium' },
        { name: 'Assault Marine', points: 150, attack: 8, defense: 7, hitpoints: 12, faction: 'Imperium' },
        { name: 'Devastator Marine', points: 180, attack: 9, defense: 7, hitpoints: 12, faction: 'Imperium' },
        { name: 'Land Raider', points: 400, attack: 12, defense: 14, hitpoints: 30, faction: 'Imperium' },
    ];

    
    const chaosUnits = [
        { name: 'Chaos Marine', points: 100, attack: 8, defense: 5, hitpoints: 10, faction: 'Chaos' },
        { name: 'Cultist', points: 60, attack: 3, defense: 3, hitpoints: 5, faction: 'Chaos' },
        { name: 'Daemon Prince', points: 300, attack: 12, defense: 10, hitpoints: 20, faction: 'Chaos' },
        { name: 'Chaos Dreadnought', points: 250, attack: 11, defense: 9, hitpoints: 15, faction: 'Chaos' },
        { name: 'Havoc Marine', points: 150, attack: 9, defense: 6, hitpoints: 12, faction: 'Chaos' },
        { name: 'Chaos Terminator', points: 220, attack: 10, defense: 8, hitpoints: 14, faction: 'Chaos' },
        { name: 'Warp Talon', points: 180, attack: 11, defense: 7, hitpoints: 13, faction: 'Chaos' },
        { name: 'Hellbrute', points: 350, attack: 13, defense: 12, hitpoints: 25, faction: 'Chaos' },
    ];

    
    const createdImperiumUnits = await prisma.unit.createMany({ data: imperiumUnits });
    const createdChaosUnits = await prisma.unit.createMany({ data: chaosUnits });

    

    // Create armies
    const army1 = await prisma.army.create({
        data: {
            name: 'Imperial Strike Force',
            userId: user1.id,
            attack: 0,
            defense: 0,
            hitpoints: 0,
            maxCost: 0,
            faction: 'Imperium',
            units: {
                
            },
        },
    });

    const army2 = await prisma.army.create({
        data: {
            name: 'Imperial Vanguard',
            userId: user2.id,
            attack: 0,
            defense: 0,
            hitpoints: 0,
            maxCost: 0,
            faction: 'Imperium',
            units: {
                
            },
        },
    });

    const army3 = await prisma.army.create({
        data: {
            name: 'Chaos Horde',
            userId: user1.id,
            attack: 0,
            defense: 0,
            hitpoints: 0,
            maxCost: 0,
            faction: 'Chaos',
            units: {
                
            },
        },
    });
    



  

    
  

   

};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
