import express from 'express';
import ContactController from '../../controller/ContactController';
import { validateContact, invalid } from '../../helpers/validator';


const router = express.Router();

/**
 * @swagger
 * parameters:
 *   id:
 *    in: path
 *    name: id
 *    required: true
 *    type: integer
 *    description: Example ID
 *    example: 1
 *   phoneNumber:
 *    in: path
 *    name: id
 *    required: true
 *    type: integer
 *    description: phone number
 *    example:
 */

/**
 * @swagger
 * definitions:
 *   ExampleModel:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         example: This is a message
 *       status:
 *         type: string
 *         enum:
 *         - Sent
 *         - Failed
 *         example: Sent
 *   Examples:
 *     type: array
 *     items:
 *       $ref: '#/definitions/ExampleModel'
 *
 */

/**
 * @swagger
 * definitions:
 *   Contact:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: hope-uwa
 *       phoneNumber:
 *         type: integer
 *         format: int64
 *   Examples:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Contact'
 *
 */

/**
 * @swagger
 *
 * /contact:
 *   post:
 *     description: Send example to another contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: body
 *         name: contact-details
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */
router.post('/contact', validateContact, invalid, ContactController.addContact);

/**
 * @swagger
 *
 * /contact/{phoneNumber}:
 *   get:
 *     description: Add a contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *          properties:
 *            phoneNumber:
 *              type: integer
 *              format: int64
 *              example: 123456789
 *     responses:
 *       201:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *             success:
 *               type: string
 *               example: true
 *       400:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            success:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */
router.get('/contact/:phoneNumber', ContactController.getContact);


/**
 * @swagger
 *
 * /contact/{phoneNumber}:
 *   delete:
 *     description: Deletes a contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *          properties:
 *            message:
 *              type: string
 *              example: The is a message
 *     responses:
 *       200:
 *         description: deletes the created contact
 *         schema:
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */
router.delete('/contact/:phoneNumber', ContactController.deleteContact);


export default router;
