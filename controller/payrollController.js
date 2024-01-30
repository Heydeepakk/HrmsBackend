const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

// add salary
exports.addSalary = catchAsync(async(req, res, next) => {
  
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



    const sql = `INSERT INTO payroll(emp_id,emp_name,ctc,basic_salary,basic_salary_percentage,hra,hra_percentage,medical,convenience,other_allowance,pf,esi) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    con.query(sql,[emp_id,emp_name,ctc,basic_salary,basic_salary_percentage,hra,hra_percentage,medical,convenience,other_allowance,pf,esi], (err, result) => {
        
        if(err) return next(new AppError('Something went wrong! Please try again later!', 400))
        if(result.affectedRows == 0) return next(new AppError('Please fill the Inputs!', 400))

        res.status(201).json({
            status : 'success',
            message : 'Salary Generated successfully!'
        })
    })
});
