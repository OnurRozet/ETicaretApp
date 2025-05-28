const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database/db.mongoose');

app.use(express.json());
app.use(cors());

const authRouter = require('./routers/auth.router');

app.use('/api/auth', authRouter);
app.use('/api/category', require('./routers/category.router'));

connection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${port} portundan sistem ayağa kalktı`);
});

