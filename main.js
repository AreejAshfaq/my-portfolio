const http = require('http');
const url = require('url');

// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Create an HTTP server
const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    // Set headers for the response
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // If no guess is provided
    if (!queryObject.guess) {
        res.end('Welcome to the Number Guessing Game! Use ?guess=<number> in the URL to make a guess.');
        return;
    }

    const userGuess = parseInt(queryObject.guess, 10);
    attempts++;

    if (isNaN(userGuess)) {
        res.end('Invalid input! Please provide a number between 1 and 100.');
    } else if (userGuess < 1 || userGuess > 100) {
        res.end('Out of range! Please guess a number between 1 and 100.');
    } else if (userGuess < randomNumber) {
        res.end('Too low! Try again.');
    } else if (userGuess > randomNumber) {
        res.end('Too high! Try again.');
    } else {
        res.end(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`);
    }
});

// Server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
