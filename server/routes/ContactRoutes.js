import { Router } from "express";
import { getAllContacts, getContactsForDmList, searchContacts } from "../controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes=Router();
contactsRoutes.post("/search", verifyToken,searchContacts);

contactsRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDmList);
contactsRoutes.get("/get-all-contacts", verifyToken, getAllContacts);

export default contactsRoutes;