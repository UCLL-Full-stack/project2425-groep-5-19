import express, { NextFunction, Request, Response } from 'express';
import complaintService from '../service/complaint.service';
import { Role } from '../types';

const complaintRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Complaint:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the complaint.
 *         message:
 *           type: string
 *           description: The message describing the complaint.
 *         userId:
 *           type: integer
 *           description: The ID of the user who created the complaint.
 *       example:
 *         id: 1
 *         message: "This is a complaint message"
 *         userId: 123
 *     ComplaintInput:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The message describing the complaint.
 *           example: "This is a new complaint."
 *         userId:
 *           type: integer
 *           description: The ID of the user creating the complaint.
 *           example: 123
 */

/**
 * @swagger
 * /complaints:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all complaints
 *     responses:
 *       200:
 *         description: A list of complaints.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Complaint'
 */
complaintRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role } = request.auth;

        
        if (role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        
        const complaints = await complaintService.getAllComplaints();
        res.status(200).json(complaints);
    } catch (error) {
        next(error);  
    }
});


/**
 * @swagger
 * /complaints/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a complaint by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The complaint ID.
 *     responses:
 *       200:
 *         description: Details of the requested complaint.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Complaint'
 *       404:
 *         description: Complaint not found.
 */
complaintRouter.get('/:id', async (req: Request , res: Response, next: NextFunction) => {
    try {
        
        const id = parseInt(req.params.id, 10);
        const complaint = await complaintService.getComplaintById({ id });
        res.status(200).json(complaint);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /complaints/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComplaintInput'
 *     responses:
 *       201:
 *         description: The created complaint object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Complaint'
 */
complaintRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, userId } = req.body;
        const complaint = await complaintService.createComplaint({ message, userId });
        res.status(201).json(complaint);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /complaints/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a complaint by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The complaint ID.
 *     responses:
 *       204:
 *         description: Complaint deleted successfully.
 *       404:
 *         description: Complaint not found.
 */
complaintRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role } = request.auth;

        
        if (role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        
        const id = parseInt(req.params.id, 10);

        
        await complaintService.deleteComplaintById({ id });

        
        res.status(204).send();
    } catch (error) {
        next(error);  
    }
});


export { complaintRouter };
