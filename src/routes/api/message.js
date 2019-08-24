import express from 'express';
import MessageController from '../../controller/MessageController';
import { validateMessage, invalid } from '../../helpers/validator';


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
 *   Message:
 *     type: object
 *     properties:
 *       sender:
 *         type: integer
 *         example: 987654321
 *       receiver:
 *         type: integer
 *         example: 987654322
 *       message:
 *         type: string
 *         example: This is just a test nessage
 *   Examples:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Message'
 *
 */

/**
 * @swagger
 *
 * /message:
 *   post:
 *     description: Create a new message
 *     produces:
 *       - application/json
 *     tags:
 *       - Message
 *     parameters:
 *       - in: body
 *         name: message details
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       201:
 *         description: Returns the created message
 *         schema:
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */
router.post('/message', validateMessage, invalid, MessageController.addMessage);


/**
 * @swagger
 *
 * /message/{phoneNumber}/received:
 *   get:
 *     description: Send example to received message
 *     produces:
 *       - application/json
 *     tags:
 *       - Message
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
 *       200:
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
router.get('/message/:phoneNumber/received', MessageController.receivedMessage);
/**
 * @swagger
 *
 * /message/{phoneNumber}/sent:
 *   get:
 *     description: Send example to set message
 *     produces:
 *       - application/json
 *     tags:
 *       - Message
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
 *       200:
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
 * */

router.get('/message/:phoneNumber/sent', MessageController.sentMessage);


/**
 * @swagger
 *
 * /message/{messageId}:
 *   get:
 *     description: Fetches a single message and updates as read
 *     produces:
 *       - application/json
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: messageId
 *         schema:
 *          properties:
 *            messageId:
 *              type: integer
 *              format: int64
 *              example: 123456789
 *     responses:
 *       200:
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
 * */

router.get('/message/:messageId', MessageController.getAMessage);


export default router;
