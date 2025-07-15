import Contact from '../models/contact.models.js';

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const newContact = await Contact.create({
            name,
            email,
            message,
        });

        res.status(201).json({
            success: true,
            message: 'Submitted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error',
        });
    }
};
