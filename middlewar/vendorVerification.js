function vendorVerification(req, res, next) {
    console.log('mmm',req.session.vendorOnlyId)
    if (!req.session.vendorOnlyId) {
        res.json({
            status: 'fail'
        })
    } else {
        next()
    }
}

module.exports = vendorVerification
