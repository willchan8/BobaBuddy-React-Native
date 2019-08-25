const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database');
const yelp = require('./yelp');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => { 
    const { location } = req.body;
    yelp.fetchData(location, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(result);
    }
  })
})

app.get('/favorites', (req, res) => {
	db.getFavorite((err, data) => {
		if (err) {
			res.status(500).send();
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/favorites', (req, res) => {
  const { favorite } = req.body;
	db.addFavorite(favorite, (err, data) => {
		if (err) {
			res.status(500).send();
		} else {
      res.status(201).send();
		}
	});
});

app.delete('/favorites', (req, res) => {
  const { id } = req.body;
	db.deleteFavorite(id, (err, data) => {
		if (err) {
			res.status(500).send();
		} else {
			res.status(202).send();
		}
	});
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});