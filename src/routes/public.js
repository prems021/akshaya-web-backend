
var express = require("express");
var public_router = express.Router();
const Base62Str = require("base62str").default;
const crypto = require('crypto');
const db = require("../model");
const base62 = Base62Str.createInstanceWithInvertedCharacterSet();

const jwt = require('jsonwebtoken');

// Sample payload





public_router.get("/", function (req, res, next) {
    res.json({ data: "Express waked" });
  });

  public_router.get("/cdb", async function (req, res, next) {
    await db.sequelize.sync({ force: true });
    res.json({ data: "Db created" });
  });
  

  

 

  public_router.post("/user_login", async function (req, res, next) {
    console.log('body',req.body)
    const { email, password } = req.body;
    try {
     
      const user = await db.tbl_Users.findOne({ where: { email } });      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      else
      {
        const d_password = base62.decodeStr(subscriber.password);
        if(password == d_password)
        {      

        const payload = {
          userId: subscriber.id,
          username: subscriber.name
        };        
        // Secret key for signing the token
        const secretKey = 'Nub#44FkgBFT';               
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });        
        console.log('Generated JWT token:', token);

       // const receivedToken = token


        return res.status(200).json({ message: 'Login successful', subscriberId: subscriber.id , token : token });

        }
        else
        {
          return res.status(401).json({ message: 'Invalid password' });
        }

      }  
    
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

    
  });

  public_router.post("/registration", async function (req, res, next) {
    console.log('body',req.body)
    const { name, email, password, pin } = req.body;
  
    const hashedPassword = base62.encodeStr(password);
      
    try {
      // Check if the email is already registered
      const existingSubscriber = await db.subscribers.findOne({ where: { email } });
      if (existingSubscriber) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      else
      {
        const subscriber = await db.subscribers.create({
          name,
          email,
          password: hashedPassword,
          pin,
          operating_status: 'A', // Assuming new subscribers are active by default
        });
        if(subscriber)
        {
          res.status(200).json({ message: 'Registration successful', subscriberId: subscriber.id });
        }
        else
        {
           res.status(500).json({ message: 'Internal server error' });
        }
      }

    }
    catch(err)
    {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  
public_router.get("/crypto", function (req, res, next) {  

//const key = 'VGVzdFNhbXBsZUtleQ==';
//const data = 'Sensitivedata';

const algorithm = 'aes-256-cbc';
const password = 'Password$$4key';
crypto.scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  crypto.randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update('Sachin the best', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
    res.json({ "data":encrypted,"key":key });

  });
});  
});


public_router.get("/dcrypto", function (req, res, next) {

const algorithm = 'aes-256-cbc';
const password = 'Password$$4key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = crypto.createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.
const encrypted =
  '3ef3bab179a8aa4dd6fc978fd7464f2c';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted.toString());
res.json({ "data":decrypted,"key":key });

})


module.exports = public_router;