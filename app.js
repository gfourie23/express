const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidate, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.num.split(',');
    let nums = convertAndValidate(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.messages);
    }

    let result = {
        operation: "mean",
        result: findMean(nums)
    }
    return res.semd(result);
});

app.get('median', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidate(numsAsStrings);
       if (nums instanceof Error) {
        throw new ExpressError(nums.message);
       }

       let result = {
        operation: "median",
        result: findMedian(nums)
       }
       return res.send(result);
});

app.gett('/mode', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidate(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    return res.send(result);
});

app.use(function (req, res, next) {
    const err = new ExpressError("'Pass a query key of nums with a comma-separated list of numbers.', 400");
    return next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});

app.listen(3000, function() {
    console.log('Server starting on port 3000');
});