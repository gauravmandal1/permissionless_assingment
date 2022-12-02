import express from 'express';
// controllers
import nodemailer from 'nodemailer'; 
import user from '../controllers/user.js';
import mongoose from 'mongoose';

const router = express.Router();




router
  .post('/', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  // .get('/login',user.userLogin)
  .post('/login', user.userLogin)

export default router;
