const routers = require('express').Router();
const cookieParser = require('cookie-parser');
const cardRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { celebrateUserLoginSchema, celebrateUserRegisterSchema } = require('../middlewares/celebrateUser');
const { createNewUser, login, logout } = require('../controllers/users');

const { NODE_ENV, JWT_SECRET } = process.env;

routers.use(cookieParser(NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'));

routers.post('/signin', celebrateUserLoginSchema, login);
routers.post('/signup', celebrateUserRegisterSchema, createNewUser);

routers.use(auth);

routers.use('/users', userRouter);
routers.use('/cards', cardRouter);

routers.post('/signout', logout);

routers.use('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = routers;
