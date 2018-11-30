const express = require("express");
const router = express.Router();
const Game = require("../../controllers/game")

router.post("/api/game/create", async (req, res) => {
    const gameCtrl = new Game();
    try {
        const game = await gameCtrl.create(req.body);
        if (game.created) {
            res.json({
                success: true
            });
        } else {
            res.status(400).json(res);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/api/game/list", async (req, res) => {
    const gameCtrl = new Game();
    try {
        const list = await gameCtrl.list();
        res.json(list)
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;