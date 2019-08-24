import express from 'express';
import contact from './contact';
import message from './message';

const router = express.Router();


router.use('/api/v1', contact);
router.use('/api/v1', message);

router.get('/', (request, response) => {
  response.status(200).send('<h1>SMS Management System</h1>');
});

export default router;
