const router = require('express').Router();
const appRoutes = require('./appRoutes');
const authRoutes = require('./authRoutes');
const passport = require('passport');

router.use('/app', passport.authenticate('jwt', { session : false }), appRoutes);
router.use('/auth', authRoutes);

module.exports = router;