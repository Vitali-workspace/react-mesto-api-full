const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/validationLink');

const {
  getAllUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getMyUser,
} = require('../controllers/users');


router.get('/users', getAllUsers);
router.get('/users/me', getMyUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys(
    { userId: Joi.string().hex().length(24).required() },
  ),
}), getUserId);


router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);


router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys(
    { avatar: Joi.string().pattern(regUrl).required() },
  ),
}), updateAvatar);

module.exports = router;
