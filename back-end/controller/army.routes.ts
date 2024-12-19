/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Army:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the army.
 *         name:
 *           type: string
 *           description: The name of the army.
 *         userId:
 *           type: integer
 *           description: The ID of the user who owns the army.
 *         attack:
 *           type: integer
 *           description: The attack power of the army.
 *         defense:
 *           type: integer
 *           description: The defense power of the army.
 *         hitpoints:
 *           type: integer
 *           description: The hit points of the army.
 *         maxCost:
 *           type: number
 *           format: float
 *           description: The maximum cost of the army.
 *         units:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Unit'
 *           description: The list of units in the army.
 *         faction:
 *           type: string
 *           description: The faction to which the army belongs.
 *           example: "Alliance"  # You can adjust the example here to match your system's factions.
 *     ArmyInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the army.
 *           example: "Elite Warriors"
 *         userId:
 *           type: integer
 *           description: The ID of the user creating the army.
 *           example: 1
 *         units:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Unit'
 *           description: The list of units in the army.
 *         faction:
 *           type: string
 *           description: The faction to which the army belongs.
 *           example: "Alliance"  # You can adjust the example here to match your system's factions.
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
 *         cost:
 *           type: integer
 *           description: Cost of the unit.
 *   responses:
 *     ArmyNotFound:
 *       description: Army not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Army not found."
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
import armyService from '../service/army.service';
import { ArmyInput, Role } from '../types';

const armyRouter = express.Router();

/**
 * @swagger
 * /armies:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all armies
 *     responses:
 *       200:
 *         description: A list of armies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Army'
 */
armyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role, username } = request.auth;

        if (role === 'admin') {
            
            const armies = await armyService.getAllArmies();
            return res.status(200).json(armies);
        }

        
        const armies = await armyService.getArmiesByUser({ username });  
        return res.status(200).json(armies);
    } catch (error) {
        next(error);  
    }
});



/**
 * @swagger
 * /armies/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an army by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The army ID.
 *     responses:
 *       200:
 *         description: Details of the requested army.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Army'
 *       404:
 *         description: Army not found.
 */
armyRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const army = await armyService.getArmyById({ id });
        res.status(200).json(army);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /armies/create:
 *   post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new army
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArmyInput'
 *      responses:
 *         200:
 *            description: The created army object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Army'
 */
armyRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const armyInput = <ArmyInput>req.body;
        const army = await armyService.createArmy(armyInput);
        res.status(200).json(army);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /armies/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an army by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The army ID.
 *     responses:
 *       204:
 *         description: Army deleted successfully.
 *       404:
 *         description: Army not found.
 */
armyRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        await armyService.deleteArmyById({ id });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /armies/user/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all armies for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A list of armies for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Army'
 *       404:
 *         description: No armies found for the user.
 */
armyRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const armies = await armyService.getArmiesByUserId({ userId });
        res.status(200).json(armies);
    } catch (error) {
        next(error);
    }
});

export { armyRouter };
