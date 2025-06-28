import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/users', (req, res) => {
  res.status(201).send();
});

export { userRoutes };
