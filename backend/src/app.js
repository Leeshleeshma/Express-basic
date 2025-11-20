import express, { Router } from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/leeshma", (req, res) => {
  res.status(200).send("leeshma is awesome!");
});

app.get("/math/circle/:radius", (req, res) => {
  const radius = parseFloat(req.params.radius);
  const area = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius;
  res.status(200).send(`Area: ${area.toFixed(2)}, Circumference: ${circumference.toFixed(2)}`);
});

app.get("/math/rectangle/:width/:length", (req, res) => {
  const length = req.params.length;
  const width = req.params.width;
  const area = length * width;
  const perimeter = 2 * (length + width);
  res.status(200).send(`Area: ${area}, Perimeter: ${perimeter}`);
});

app.get('/math/power/:base/:exponent', (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);
  const rootQuery = req.query.root;
  const result = Math.pow(base, exponent);

  const response = { result };

  if (rootQuery === 'true') {
    response.root = Math.sqrt(base);
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

app.get('/quotebook/categories', (req, res) => {
  const responseText = categories
    .map(cat => `A possible category is ${cat}`)
    .join('\n');

  res.type('text/plain'); 
  res.send(responseText);
});

app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;
  
  if (!categories.includes(category)) {
    return res.type('json').status(400).send({
      'error': `no category listed for ${category}`
    });
  }

  let quotesArray;
  if (category === 'successQuotes') {
    quotesArray = successQuotes;
  } else if (category === 'perseveranceQuotes') {
    quotesArray = perseveranceQuotes;
  } else if (category === 'happinessQuotes') {
    quotesArray = happinessQuotes;
  }
  
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  const randomQuote = quotesArray[randomIndex];

  res.json(randomQuote);
});

function categoryExists(category) {
  switch(category) {
        case 'successQuotes': return successQuotes;
        case 'perseveranceQuotes': return perseveranceQuotes;
        case 'happinessQuotes': return happinessQuotes;
        default: return null;
    }
}

app.post('/quotebook/quote/new', (req, res) => {
  const { category, quote, author } = req.body;
  const quotesArray = categoryExists(category);
  quotesArray.push({ quote, author });
  res.type('text').send('Success! New quote added');
});