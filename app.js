require('./db/connect')
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authenticateUser = require('./middleware/authentication');


const authRouter = require('./routes/auth');
const matchesRouter = require('./routes/matches');
const likesRouter = require('./routes/likes');

//middleware
app.use(express.json())


//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/likes', likesRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();