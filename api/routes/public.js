import express from "express";

const router = express.Router();

router.post('/signup', (req, res) => {
     const user = req.body;
     console.log(user);
    res.status(201).json(user);
});


export default router;