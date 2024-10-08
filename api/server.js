import express from 'express';
import publicRouter from './routes/public.js';
import privateRouter from './routes/private.js'
import auth from "./middleware/auth.js"
const app = express();
app.use(express.json());

app.use('/', publicRouter);
app.use('/', auth, privateRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
