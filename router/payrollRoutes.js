const express = require('express');
const payrollController = require('../controller/payrollController');

const router = express.Router();

router
    .route('/generateSalary')
    .post(payrollController.addSalary);

module.exports = router;