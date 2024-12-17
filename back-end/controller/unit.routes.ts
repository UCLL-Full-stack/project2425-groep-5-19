/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Unit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the unit.
 *         name:
 *           type: string
 *           description: Name of the unit.
 *         type:
 *           type: string
 *           description: Type of the unit (e.g., infantry, cavalry).
 *         attack:
 *           type: integer
 *           description: Unit's attack points.
 *         defense:
 *           type: integer
 *           description: Unit's defense points.
 *         hitpoints:
 *           type: integer
 *           description: Unit's hit points.
 *         points:
 *           type: integer
 *           description: Points value of the unit for scoring or balance purposes.
 *         faction:
 *           type: string
 *           description: Faction to which the unit belongs (e.g., Alliance, Horde).
 *     UnitInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the unit.
 *         type:
 *           type: string
 *           description: Type of the unit (e.g., infantry, cavalry).
 *         attack:
 *           type: integer
 *           description: Unit's attack points.
 *         defense:
 *           type: integer
 *           description: Unit's defense points.
 *         hitpoints:
 *           type: integer
 *           description: Unit's hit points.
 *         points:
 *           type: integer
 *           description: Points value of the unit for scoring or balance purposes.
 *         faction:
 *           type: string
 *           description: Faction to which the unit belongs (e.g., Alliance, Horde).
 *   responses:
 *     UnitNotFound:
 *       description: Unit not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Unit not found."
 *     ValidationError:
 *       description: Validation error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Validation failed. Check input data."
 */


import express, { NextFunction, Request, Response } from 'express';
import unitService from '../service/unit.service';
import { Faction, UnitInput } from '../types';

const unitRouter = express.Router();



/**
 * @swagger
 * /units:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all units
 *     responses:
 *       200:
 *         description: A list of units.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 */
unitRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const units = await unitService.getAllUnits();
        res.status(200).json(units);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /units/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a unit by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unit ID.
 *     responses:
 *       200:
 *         description: Details of the requested unit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         $ref: '#/components/responses/UnitNotFound'
 */
unitRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const unit = await unitService.getUnitById({ id });
        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /units/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitInput'
 *     responses:
 *       200:
 *         description: The created unit object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
unitRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unitInput: UnitInput = req.body;
        const unit = await unitService.createUnit(unitInput);
        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /units/{unitId}/add-to-army/{armyId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a unit to an army
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unit ID.
 *       - in: path
 *         name: armyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The army ID.
 *     responses:
 *       200:
 *         description: The updated unit with the new army association.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         $ref: '#/components/responses/UnitNotFound'
 */
unitRouter.put('/:unitId/add-to-army/:armyId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unitId = parseInt(req.params.unitId, 10);
        const armyId = parseInt(req.params.armyId, 10);
        const unit = await unitService.addUnitToArmy(unitId, armyId);
        res.status(200).json(unit);
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred.";

       
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        
        ;

        
        res.status(400).json({ message: errorMessage });
    }
});

/**
 * @swagger
 * /units/{unitId}/remove-from-army/{armyId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a unit from a specific army
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unit ID.
 *       - in: path
 *         name: armyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The army ID from which the unit will be removed.
 *     responses:
 *       200:
 *         description: The updated unit after removal from the army.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         $ref: '#/components/responses/UnitNotFound'
 */
unitRouter.put('/:unitId/remove-from-army/:armyId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unitId = parseInt(req.params.unitId, 10);
        const armyId = parseInt(req.params.armyId, 10);

        const unit = await unitService.removeUnitFromArmy(unitId, armyId);
        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /units/{unitId}/update-stats:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update the stats of a unit (attack, defense, hitpoints, points)
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unit ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attack:
 *                 type: integer
 *               defense:
 *                 type: integer
 *               hitpoints:
 *                 type: integer
 *               points:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated unit object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         $ref: '#/components/responses/UnitNotFound'
 */
unitRouter.put('/:unitId/update-stats', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unitId = parseInt(req.params.unitId, 10);
        const updatedStats = req.body;
        const unit = await unitService.updateUnitStats(unitId, updatedStats);
        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /units/faction/{faction}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all units by faction
 *     parameters:
 *       - in: path
 *         name: faction
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Imperium, Chaos]
 *         description: The faction of the units.
 *     responses:
 *       200:
 *         description: A list of units belonging to the specified faction.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 *       404:
 *         $ref: '#/components/responses/UnitNotFound'
 */
unitRouter.get('/faction/:faction', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { faction } = req.params;

        
        if (faction !== 'Imperium' && faction !== 'Chaos') {
            return res.status(400).json({ message: 'Invalid faction specified.' });
        }

        
        const units = await unitService.getUnitsByFaction(faction as Faction);
        
        if (!units.length) {
            return res.status(404).json({ message: 'No units found for this faction.' });
        }

        res.status(200).json(units);
    } catch (error) {
        next(error);
    }
});


export { unitRouter };

