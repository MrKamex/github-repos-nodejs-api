const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;

const fakten = ["Das hier ist Fakt 1","Das hier ist Fakt 2","Das hier ist Fakt 3","Das hier ist Fakt 4","Das hier ist Fakt 5","Das hier ist Fakt 6"]

let current = fakten.map(y => y);

app.get('/', async (req, res) => {
  const username = req.query.username || 'myogeshchavan97';
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/getFact', async (req, res) => {
  try {
	  console.log('Getting a fact');
	 console.log(current);
	 if (current.length) {
		 let result;
		 const index = Math.floor(Math.random() * current.length)
		console.log('index:' + index)
		
		result = current[index];
		current.splice(index,1); 
		res.send(result);
		console.log(current);
console.log("result: " + result);	 
	 } else {
		res.send("Keine Fakten mehr!");	 
	 }
	     
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/resetFacts', async (req, res) => {
  try {
	  console.log("Resetting facts to: ");
	  console.log(fakten);
    current = fakten.map(y => y);
    res.send('OK');
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
