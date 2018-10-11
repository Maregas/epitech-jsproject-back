require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {
	createLogger,
	format,
	transports
} = require('winston');
const mUser = require('./models/User');
const mRank = require('./models/Rank');
const mGame = require('./models/Game');
const mUserRank = require('./models/UserRank');
const logger = createLogger({
	level: 'debug',
	format: format.simple(),
	transports: [new transports.Console()]
});


const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

app.get('/test', async (req, res) => {
	res.send(200, 'Simple route work!');
	// mUser.create({
	// 	nickname: "toto",
	// 	email:"toto@toto.toto",
	// 	password:'toto',
	// });

	// await mGame.create({
	// 	name: "Paladin",
	// 	description: "FPS Multi Joueur différent de Overwatch sur bien des points.",
	// 	background_image_URI: 'https://github.com/Nitratz/Paladins-Champions/blob/master/app/src/main/res/drawable/bg_nav_view.png',
	// });
	console.log('test2');
	await mRank.create({
		name: "Platine 3",
		icon_URI: 'https://github.com/Nitratz/PulsionStats/blob/master/Ranks/rank17.png',
		GameId: 2,
	});
	console.log('test3');
	await mUserRank.create({
		nickname: "toto",
		email: "toto@toto.toto",
		password: 'toto',
		UserId: 1,
		RankId: 1
	});
});


app.listen(port, () => {
	logger.info(`Server running on port: ${port}`);
});