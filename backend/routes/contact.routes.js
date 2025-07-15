import express from 'express';
const contactRouter = express.Router();
import { createContact } from '../controllers/contact.controller.js';

contactRouter.post('/', createContact);

export default contactRouter;