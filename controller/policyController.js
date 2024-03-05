const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');
const fs = require('fs');


// add salary
exports.addPolicy = catchAsync(async (req, res, next) => {
    const policy_name = await req.body.policy_name;

    if (!req.body.file) {
        return res.status(400).json({ error: 'No file provided' });
    }
    
    const fileData = req.body.file;
    const fileName = Math.floor(Math.random() * 9000000 + 1000000); // Customize the file name
    const buffer = Buffer.from(fileData, 'base64');

    const uploadPath = path.join('uploads/', fileName,'.pdf');
    let file_link = '';
    fs.writeFile(uploadPath, buffer, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        file_link = process.env.IMAGE_URL + fileName + '.pdf';
    });

    const insertQuery = `INSERT INTO policy(policy_name,file_link) VALUES(?,?)`;
        con.query(insertQuery, [policy_name, file_link], (err, result) => {
            if (err) return next(new AppError('Something went wrong! Please try again later!', 400));
            if (result.affectedRows === 0) return next(new AppError('Please fill the Inputs!', 400));

            res.status(201).json({
                status: 'success',
                message: 'Added successfully!'
            });
        });

});

exports.getPolicy = catchAsync(async(req, res,next) => {

    const sql = `SELECT * FROM policy`


    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})
