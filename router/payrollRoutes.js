const express = require('express');
const payrollController = require('../controller/payrollController');

const router = express.Router();

router
    .route('/generateSalary')
    .post(payrollController.addSalary)
    .get(payrollController.getSalary)
router
.route('/deleteSalary')
.post(payrollController.deleteSalary);

module.exports = router;