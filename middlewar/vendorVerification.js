function vendorVerification(req, res, next) {
    console.log('mmm',req.session.vendorOnlyId)
    if (!req.session.vendorOnlyId) {
        res.json({status: 400,messgae: 'session is not found'})
    } else {
        next()
    }
}

module.exports = vendorVerification
