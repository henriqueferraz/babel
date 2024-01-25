exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADSCRFTOKEN') {
        return res.render('404')
    }
}

exports.csrfMiddlware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}


