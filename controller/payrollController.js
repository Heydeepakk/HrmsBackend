const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

// add salary
exports.addSalary = catchAsync(async (req, res, next) => {
    const emp_id = await req.body.emp_id;
    const emp_name = await req.body.emp_name;
    const ctc = await req.body.ctc;
    const basic_salary = await req.body.basic_salary;
    const basic_salary_percentage = await req.body.basic_salary_percentage;
    const hra = await req.body.hra;
    const hra_percentage = await req.body.hra_percentage;
    const medical = await req.body.medical;
    const convenience = await req.body.convenience;
    const other_allowance = await req.body.other_allowance;
    const pf = await req.body.pf;
    const esi = await req.body.esi;
    const kra = await req.body.kra;
    const monthly_salary = await req.body.monthly_salary;

    const checkExistingQuery = "SELECT * FROM payroll WHERE emp_id = ?";
    con.query(checkExistingQuery, [emp_id], (checkErr, checkResult) => {
        if (checkErr) {
            return next(new AppError('Something went wrong while checking existing emp_id!', 500));
        }

        if (checkResult.length > 0) {
            return next(new AppError('Employee with the provided EMP ID already exists!', 400));
        }
        const insertQuery = `INSERT INTO payroll(emp_id,emp_name,ctc,basic_salary,basic_salary_percentage,hra,hra_percentage,medical,convenience,other_allowance,pf,esi,kra,monthly_salary) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        con.query(insertQuery, [emp_id, emp_name, ctc, basic_salary, basic_salary_percentage, hra, hra_percentage, medical, convenience, other_allowance, pf, esi,kra,monthly_salary], (err, result) => {
            if (err) return next(new AppError('Something went wrong! Please try again later!', 400));
            if (result.affectedRows === 0) return next(new AppError('Please fill the Inputs!', 400));

            res.status(201).json({
                status: 'success',
                message: 'Salary Generated successfully!'
            });
        });
    });
});

exports.getSalary = catchAsync(async(req, res,next) => {

    const sql = `SELECT * FROM payroll`

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

exports.deleteSalary = catchAsync(async(req, res,next) => {
    const emp_id = await req.body.emp_id;
console.log( req.body.emp_id)
    const sql = `DELETE FROM payroll WHERE emp_id='${emp_id}';`

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'Salary deleted successfully',
            data: result
        })
    })
})