

const  errorResponse = require('./helper');
const jwt = require('jsonwebtoken');
const db = require("../model");

const apiAuth = async (req, res, next) => { 
  if(!(req.headers && req.headers.authorization))
  {
    return errorResponse(req, res, 'Token is not provided', 401);
  }
  const token = req.headers['authorization'];
 
  try {

                const secretKey = 'Nub#44FkgBFT'; 
            jwt.verify(token, secretKey, async (err, decoded) => {
              if (err) {
                console.error('Invalid token:', err);
                return errorResponse(req,res,'Incorrect token is provided, try re-login',401,);
              } else {

                console.log('Decoded token:', decoded);
                const user = await db.tbl_Users.findByPk(decoded.user.userId);  

                if (!user) {        
                  return errorResponse(req, res, 'User is not found in system', 401);
                } else {     
                  if(user.name_of_user === decoded.user.name_of_user && user.contact_no === decoded.user.contact_no && user.status === 9)
                  {
                    return next();
                  }
                  else
                  {
                    return errorResponse(req, res, 'User is not Active in system', 401);
                  }
                }
                
              }
            });

     } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided, try re-login',
      401,
    );
  }
};

module.exports = apiAuth;
// export default apiAuth;