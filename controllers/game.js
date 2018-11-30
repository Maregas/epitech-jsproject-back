const mGame = require('../models/Game');
class Game {
    constructor() {}

    async create(data) {
        let res;
        try {
            let game = await mGame.create({
                name: data.name,
                description: data.description,
                background_image_url: data.url
            });

            res = {
                created: true,
                id: game.dataValues.id
            }
        } catch (err) {
            let error = err.errors[0];
            res = {
                created: false,
                error: error.type,
                text: error.message
            };
        }
        return res;
    }

    async list() {
        try {
            const list = await mGame.findAndCountAll({
                attributes: [
                    'name', 'description', 'background_image_url'
                ]
            });
            console.log(list.rows);
            return list.rows;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
module.exports = Game;