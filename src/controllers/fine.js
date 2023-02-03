const Fines = require('../models/fine')
const Drivers = require('../models/drivers')
const officers = require('../models/officers')
const transaction = require('../models/transaction')



// cerating officer fine function 
const Fine = async (request, response, next) => {
    const content = await request.body

    try {
        // taking the login user id
        const officersID = await officers.findById(content.officersId)
        const token = await request.cookies.accessToken;
        if (!token) {
            return response.status(401).json({
                message: 'Unauthorized, please login to your account. you must be logged in to perform this operation'
            })
        }


        // making fine 
        const FineDriver = await new Fines.create({
            officerId: content.officerId,
            ...content
        })
        const drivers = await new Drivers.create({ 
            FineID: content.FineID =  FineDriver._id , ...content
        });
        const Trnsaction = new transaction.create({
            finedId : content.finedId = FineDriver._id, ...content
        })

        officersID.fines = officersID.fines.concat(FineDriver._id)
        officersID.transactions = officersID.transactions.concat(FineDriver._id)
        officersID.save();
        

        // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded)
        // const officerId = decoded.id;
        // const officer = await offesers.findById(officerId)


        


    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: error.message});
    }

}

module.exports = {Fine}