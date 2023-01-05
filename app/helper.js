class Helper {
    static formatMyAPIRes = (res, resStatus, apiStatus, data, apiMessage) => {
        return res.status(resStatus).send({ apiStatus, data, apiMessage })
    }
    static handlingMyFunction = async (req, res, fun, message) => {
        try {
            let result = await fun(req)
            return this.formatMyAPIRes(res, 200, true, result, message)
        } catch (e) {
            console.log(e)
            return this.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
}
module.exports = Helper