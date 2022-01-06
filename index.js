import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import foodRoute from './src/pages/food.js';
import resturantRoute from './src/pages/resturant.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());

app.use(cors());
app.use('/food', foodRoute);
app.use('/resturant', resturantRoute);

app.get('/', (req, res) => {
  res.json({
    message: 'Its working',
    'api entry': 2,
    'path 1': '/food',
    'path 2': '/resturant',
  });
});
app.listen(port, () => {
  console.log('running at http://localhost:3000');
});
