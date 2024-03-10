/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt library
const app = express();
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors(
  {
    origin : ['http://localhost:5173'],
    methods : ['POST', 'GET'],
    credentials: true
}
));
app.use(cookieParser());
app.use(express.static("C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server"))
// app.use(express.static('C:\\Users\\Dell Inspiron 15\\OneDrive\\Desktop\\car-admin\\server'));


const db = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  port: process.env.Port,
  database: process.env.Database,
});

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'lavu@sql1000',
//   database: 'car'
// });


db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    throw err; // This will stop the application if there's an error
  }
  console.log('Connected to MySQL database');
});


const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server\\images")
  },
  filename: (req,file,cb)=>{
    cb(null,file.fieldname + "_" +Date.now()+ path.extname(file.originalname))
  }
}
);

const upload = multer({
  storage: storage
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // }
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//////////////////////////////////////////////////////////////////

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server\\images")
    // cb(null,"C:\\Users\\Dell Inspiron 15\\OneDrive\\Desktop\\car-admin\\server\\images")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));   //filedname will get the image name we chose and extname will get the extension of that image
  }
})

const upload1 = multer({
  storage:storage1
})


app.get('/viewcars', (req, res) => {
  const sql = 'SELECT * FROM car'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/view_convertible', (req, res) => {
  const sql = 'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Convertible"'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/view_suv', (req, res) => {
  const sql = 'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "SUV"'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/view_hatchback', (req, res) => {
  const sql = 'SELECT * FROM car C , CarCategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Hatchback"'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/view_sedan', (req, res) => {
  const sql = 'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Sedan"'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/view_offroad', (req, res) => {
  const sql = 'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Off-Road"'
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data)
    return res.json(data)
  })
})
app.get('/user', (req, res) => {
  // const sql = 'SELECT * FROM user';
  // connection.query(sql, (err, data) => {
  //   if (err) return res.json(err)
  //   return res.json(data)
  // })
})
  
//insert car

app.post('/addcar', upload1.single('car_image'), (req, res) => {
  const  cno  = req.body.cno;
  const car_image = req.file.filename;
  console.log(car_image);
  const sql = 'UPDATE car SET car_image=? WHERE cno=?';

  db.query(sql, [car_image,cno], (err, data) => {
    if (err) return console.error(err);
    console.log('Car updated successfully:', data);
    return res.status(200).json({ message: 'Car updated successfully' });

  })
})


//rent

app.post("/rent", (req, res) => {
  const sql = 'INSERT INTO orders(`car_id`,`s_date`,`e_date`,`d_type`,`fare`) VALUES(?,?,?,?,?)'
  const values = [
    req.body.car_id,
    req.body.startDate,
    req.body.endDate,
    req.body.dType,
    req.body.fare
  ]
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})



// ---------------------------------------------------------------------------------------

app.get('/see', (req, res, )=>{
  db.query('SELECT * from account', (err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(data);
    }
  })
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token means no logged in user");
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, process.env.token_secret, (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        req.user_id = decoded.user_id; // Store user_id in the request object
        next();
      }
    });
  }
};

// app.get("/", verifyUser , (req, res) => {
//   return res.json({ Status:"Success",name:req.name})
// });

app.get("/", verifyUser , (req, res) => {
  const token = req.cookies.token;
  if(!token){
    return res.json({ Error: "Invalid token" });
  }
  else{
    jwt.verify(token, process.env.token_secret, (err, decoded) => {
      if(err){
        return res.json({ Error : err });
      }
      else{
        const user_id = decoded.user_id; // Get user_id from decoded token
        const sql = "SELECT u.email, a.image, a.phno,u.fullname FROM user u JOIN account a ON u.user_id = a.user_id WHERE u.user_id = ?";
        db.query(sql, [user_id], (err, data) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ Error: "An error occurred while fetching user data" });
          }
          if (data.length === 0) {
            return res.json({ Error: "No user found with that user_id" });
          }
          const userData = data[0];
          return res.json({ Status: "Success", user_id, userData });
        });
      }
    });
  }
});


app.post("/register", (req, res) => {
  const { fullname , email, password , phno } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

  const sql = "INSERT INTO user (fullname , email, password,phno) VALUES (?, ?, ?, ?)";
  const sql1 = "INSERT INTO account (user_id, fullname, phno) VALUES (?, ?, ?)";

  const userValues = [fullname, email, hashedPassword , phno]; 

  db.query(sql, userValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Error: "An error occurred while registering the user" });
    }
    
    // Get the inserted user_id
    const userId = result.insertId;
    
    const accountValues = [userId, fullname, phno];
  
    db.query(sql1, accountValues, (err, result) => {
      if (err) {
        console.error("Database error for account query:", err);
        return res.json({ Error: "An error occurred while querying the Account table" });
      }
      
      console.log("Successfully inserted into account table");
      return res.json({ Status: "Success" });
    });
  });
});


app.post("/login", (req, res) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const { email, password } = req.body;

  const sql = "SELECT * FROM user WHERE email = ?";
  
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Error: "An error occurred while retrieving user data" });
    }
    if (data.length === 0) {
      return res.json({ Error: "No user found with that email" });
    }

    const user = data[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.json({ Error: "Invalid password" });
    }
    const details = {
      user_id: user.user_id
    };
    const token = jwt.sign(details, process.env.token_secret )
    res.cookie('token', token)
    return res.json({ Status: "Success" });
  });
});

app.get("/logout",(req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
})

// ------------------------------------------------------------------------------------------------

app.post('/upload', verifyUser, upload.single('image'), (req, res) => {
  const image = req.file.filename;
  // console.log(image)
  const userid = req.user_id; // contains the user's ID
  const sql = "UPDATE account SET image = ? WHERE user_id = ?";
  
  db.query(sql, [image, userid], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Error: "An error occurred while updating the image for the user" });
    }
    console.log("Successfully updated image for the user");
    return res.json({ Status: "Success" });
  });
});

app.post('/update-account',verifyUser, (req, res) => {
  const userid = req.user_id; // contains the user's ID
  console.log(userid);
  const { gender, phno,address } = req.body;
  let sql = "UPDATE account SET  gender =?,phno=?,address =?  WHERE user_id=?";
  db.query(sql,[gender,phno,address,userid],(err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Error: "An error occurred while updating the address gender for the account table" });
    }
    console.log("Successfully updated gender phno and address for the accounnt");
    return res.json({ Status: "Success" });
  });
}); 

const port = 3000;
app.listen(port, () => {
  console.log(`SERVER app listening on port ${port}`);
});
