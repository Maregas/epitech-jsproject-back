const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send(200, 'Simple route work!');
});


app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});