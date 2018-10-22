const express = require('express');
const router = express.Router();
const User = require('../../controllers/user');


router.post("/api/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.json({
        success: true,
        msg: "User disconnected"
    });
});

router.post("/api/account", async (req, res) => {
    const userId = req.userId;
    const user = new User();
    try {
        const edit = await user.edit(req.body, userId);
        if (edit.edited) {
            res.json({
                success: true
            });
        } else {
            res.status(400).json(edit);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete("/api/account", async (req, res) => {
    const userId = req.userId;
    const user = new User();

    await user.delete(userId);
    res.json({
        success: true
    });
});

module.exports = router;