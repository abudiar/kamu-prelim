const router = require('express').Router();
const { Err } = require('../middlewares');

// Main page
router.get('/', (req, res) => {
    res.status(200).json({ message: `I reckon you ain't supposed to be here >:c` })
});

// User page
router.use('/', require('./userRoutes'));

// Setup 404 handler
router.use('*', (req, res) => {
    throw new Err({
        status: 404,
        name: 'NotFound',
        message: 'File/Directory Not Found'
    });
});

// Error handler
router.use(Err.handler);

module.exports = router;