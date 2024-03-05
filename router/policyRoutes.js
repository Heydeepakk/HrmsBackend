const express = require('express');
const policyController = require('../controller/policyController');

const router = express.Router();

router
    .route('/generatePolicy')
    .post(policyController.addPolicy)
    .get(policyController.getPolicy)


module.exports = router;