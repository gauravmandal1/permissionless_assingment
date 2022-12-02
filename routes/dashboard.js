import express from 'express';
// controllers
import dashboard from '../controllers/dashboard.js';

const router = express.Router();

router
  .get('/', dashboard.getMail)

export default router;
