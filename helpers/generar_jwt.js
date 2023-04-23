const jwt = require('jsonwebtoken');
const { message } = require('../helpers/message');



const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET0RPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( message.mss_012 )
            } else {
                resolve( token );
            }
        })

    })
}




module.exports = {
    generarJWT
}


















