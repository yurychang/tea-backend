function memberVerification(req, res, next) {
    if (!req.session.memberId) {
        res.json({
            status: 'fail'
        })
    } else {
        next()
    }
}

module.exports = memberVerification
