/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   express.static(
//     "C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server"
//   )
// );
app.use(
  express.static(
    "C:\\Users\\Dell Inspiron 15\\OneDrive\\Desktop\\CARRENTAL-SQL-main\\server"
  )
);

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'lavu@sql1000',
//   database: 'car'
// });

// const db = mysql.createConnection({
//   host: process.env.Host,
//   user: process.env.User,
//   password: process.env.Password,
//   port: process.env.Port,
//   database: process.env.Database,
// });

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "lavu@sql1000",
  database: "car",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    throw err; // This will stop the application if there's an error
  }
  console.log("Connected to MySQL database");
});

// ------------------------------MIDDELWARE -----------------------------------------------------

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // console.log("No token means no logged in user");
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, "hehe", (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        req.user_id = decoded.user_id; // Store user_id in the request object
        next();
      }
    });
  }
};

// ------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(
    //   null,
    //   "C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server\\images"
    // );
    cb(
      null,
      "C:\\Users\\Dell Inspiron 15\\OneDrive\\Desktop\\CARRENTAL-SQL-main\\server\\images"
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//////////////////////////////////////////////////////////////////

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(
    //   null,
    //   "C:\\Users\\k9abh\\OneDrive\\Documents\\practice-samples\\server\\images"
    // );
    cb(
      null,
      "C:\\Users\\Dell Inspiron 15\\OneDrive\\Desktop\\CARRENTAL-SQL-main\\server\\images"
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); //filedname will get the image name we chose and extname will get the extension of that image
  },
});

const upload1 = multer({
  storage: storage1,
});

app.get("/viewcars", (req, res) => {
  const sql = "SELECT * FROM car";
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/view_convertible", (req, res) => {
  const sql =
    'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Convertible"';
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/view_suv", (req, res) => {
  const sql =
    'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "SUV"';
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/view_hatchback", (req, res) => {
  const sql =
    'SELECT * FROM car C , CarCategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Hatchback"';
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/view_sedan", (req, res) => {
  const sql =
    'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Sedan"';
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/view_offroad", (req, res) => {
  const sql =
    'SELECT * FROM car C , carcategory CC WHERE C.category_id = CC.category_id and CC.category_name = "Off-Road"';
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});
app.get("/getOrderID", (req, res) => {
  const sql =
    "SELECT order_id , fare FROM orders ORDER BY order_id DESC LIMIT 1 ";
  db.query(sql, (err, data) => {
    if (err) return console.log(err, data);
    return res.json(data);
  });
});

app.post("/review-car/:car_id", verifyUser, (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, "hehe", (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        const user_id = decoded.user_id; // Get user_id from decoded token
        const car_id = req.params.car_id;
        console.log("CARID : " + car_id, "USER_ID :" + user_id);
        const {
          value_for_money,
          pickup_dropoff_experience,
          cleanliness,
          drivability,
        } = req.body;

        try {
          updateReview(
            {
              value_for_money,
              pickup_dropoff_experience,
              cleanliness,
              drivability,
            },
            car_id,
            user_id
          );

          const overall_stars =
            (value_for_money +
              pickup_dropoff_experience +
              cleanliness +
              drivability) /
            4;
          updateOverallStars(overall_stars, car_id, user_id);

          console.log("All updates successful");
          res.status(200).send("Review submitted successfully");
        } catch (error) {
          console.error("Error: INTHISLINE", error);
          res.status(500).send("Internal server error");
        }
      }
    });
  }
});

function updateReview(values, car_id, user_id) {
  const checkIfExistsSQL =
    "SELECT * FROM reviews WHERE car_id = ? AND user_id = ?";
  db.query(checkIfExistsSQL, [car_id, user_id], (err, results) => {
    if (err) {
      console.error("Error checking if review exists:", err);
      return;
    }

    if (results.length > 0) {
      // If the review exists, construct an update query
      let updateSQL = "UPDATE reviews SET ";
      let updateValues = [];
      for (const key in values) {
        updateSQL += `${key} = ?, `;
        updateValues.push(values[key]);
      }
      // Remove the trailing comma and space
      updateSQL = updateSQL.slice(0, -2);
      updateSQL += " WHERE car_id = ? AND user_id = ?";
      updateValues.push(car_id, user_id);

      db.query(updateSQL, updateValues, (updateErr) => {
        if (updateErr) {
          console.error("Error updating review:", updateErr);
        } else {
          console.log("Review successfully updated");
        }
      });
    } else {
      // If the review doesn't exist, insert a new one
      let insertSQL = "INSERT INTO reviews(car_id, user_id, ";
      let fields = Object.keys(values).join(", ");
      let placeholders = Object.keys(values).fill("?").join(", ");
      let insertValues = Object.values(values);
      insertSQL += `${fields}) VALUES (?, ?, ${placeholders})`;
      insertValues.push(car_id, user_id);

      db.query(insertSQL, insertValues, (insertErr) => {
        if (insertErr) {
          console.error("Error inserting new review:", insertErr);
        } else {
          console.log("New review successfully inserted");
        }
      });
    }
  });
}

function updateOverallStars(overall_stars, car_id, user_id) {
  const checkIfExistsSQL =
    "SELECT * FROM reviews WHERE car_id = ? AND user_id = ?";
  db.query(checkIfExistsSQL, [car_id, user_id], (err, results) => {
    if (err) {
      console.error("Error checking if review exists:", err);
      return;
    }

    // If the review exists, update it
    if (results.length > 0) {
      const updateSQL =
        "UPDATE reviews SET overall_stars = ? WHERE car_id = ? AND user_id = ?";
      db.query(updateSQL, [overall_stars, car_id, user_id], (updateErr) => {
        if (updateErr) {
          console.error("Error updating overall stars:", updateErr);
        } else {
          console.log("Overall stars successfully updated");
        }
      });
    } else {
      // If the review doesn't exist, insert a new one
      const insertSQL =
        "INSERT INTO reviews(car_id, user_id, overall_stars) VALUES (?, ?, ?)";
      db.query(insertSQL, [car_id, user_id, overall_stars], (insertErr) => {
        if (insertErr) {
          console.error("Error inserting new review:", insertErr);
        } else {
          console.log("New review successfully inserted");
        }
      });
    }
  });
}

//insert car

app.post("/addcar", upload1.single("car_image"), (req, res) => {
  const cno = req.body.cno;
  const car_image = req.file.filename;
  console.log(car_image);
  const sql = "UPDATE car SET car_image=? WHERE cno=?";

  db.query(sql, [car_image, cno], (err, data) => {
    if (err) return console.error(err);
    console.log("Car updated successfully:", data);
    return res.status(200).json({ message: "Car updated successfully" });
  });
});

app.get("/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/reviews/:car_id", (req, res) => {
  const car_id = req.params.car_id;
  console.log("Received car_id:", car_id);

  const sql = "SELECT * FROM reviews WHERE car_id=?";
  db.query(sql, [car_id], (err, reviews) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Retrieved reviews:", reviews);

    return res.json(reviews);
  });
});

//rent

app.post("/rent", verifyUser, async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, "hehe", (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        const { car_id, startDate, endDate, dType, fare } = req.body;
        let isStockDecremented = false; // Flag to track if stock is already decremented
        let isStockIncremented = false; // Flag to track if stock is already incremented
        const user_id = decoded.user_id;
        console.log(user_id);
        try {
          // Insert order into the database
          const sqlInsert =
            "INSERT INTO orders(user_id,car_id,s_date,e_date,d_type,fare) VALUES(?,?,?,?,?,?) ";
          db.query(
            sqlInsert,
            [user_id, car_id, startDate, endDate, dType, fare],
            async (err, data) => {
              if (err) {
                console.error("Error inserting order:", err);
                return res.status(500).json({ error: "Internal server error" });
              }

              // Function to update stock and continuously check conditions
              const updateStockAndCheckConditions = async () => {
                const currentDate = new Date();

                // Check if current date is after start date and before end date
                if (
                  currentDate >= new Date(startDate) &&
                  currentDate < new Date(endDate)
                ) {
                  if (!isStockDecremented) {
                    // Check if stock is not already decremented
                    try {
                      await decrementStock(car_id);
                      console.log("Stock decremented");
                      isStockDecremented = true; // Set flag to true once stock is decremented
                    } catch (error) {
                      console.error("Error decrementing stock:", error);
                      return res
                        .status(500)
                        .json({ error: "Internal server error" });
                    }
                  }
                }

                // Check if current date is after end date
                if (currentDate >= new Date(endDate) && !isStockIncremented) {
                  try {
                    await incrementStock(car_id);
                    console.log("Stock incremented");
                    isStockIncremented = true; // Set flag to true once stock is incremented
                  } catch (error) {
                    console.error("Error incrementing stock:", error);
                    return res
                      .status(500)
                      .json({ error: "Internal server error" });
                  }
                }

                // If neither condition is met, check conditions again after a delay
                if (!(isStockDecremented && isStockIncremented)) {
                  setTimeout(
                    updateStockAndCheckConditions,
                    1000 * 60,
                    console.log("triggered")
                  ); // Check every minute
                }
              };
              res.json({ message: "Order placed successfully" });
              // Start checking conditions
              updateStockAndCheckConditions();
            }
          );
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    });
  }
});

async function decrementStock(car_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE car SET stock=stock-1 WHERE car_id=?";
    db.query(sql, [car_id], (err) => {
      if (err) {
        console.error("Error decrementing stock:", err);
        reject(err);
      } else {
        console.log("Stock decremented2");
        resolve();
      }
    });
  });
}
async function incrementStock(car_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE car SET stock=stock+1 WHERE car_id=?";
    db.query(sql, [car_id], (err) => {
      if (err) {
        console.error("Error incrementing stock:", err);
        reject(err);
      } else {
        console.log("Stock incremented2");
        resolve();
      }
    });
  });
}

// ---------------------------------------------------------------------------------------

app.post("/payments", verifyUser, (req, res) => {
  const { order_id, status, price } = req.body;
  console.log("INSIDE PAYMENTS");
  const sql = "INSERT INTO payments (order_id , status,price) VALUES (?,?,?)";
  db.query(sql, [order_id, status, price], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
      console.log(data);
      console.log("SUCESS--------------------------------");
    }
  });
});

app.delete("/cancel_orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  const sql = "DELETE FROM orders WHERE order_id = ?";
  db.query(sql, [orderId], (err, data) => {
    if (err) return console.error("Database error:", err);
    else {
      return console.log(
        data,
        "\n ---------------------SUCESS OF ORDER CANCEL"
      );
    }
  });
});

app.get("/", verifyUser, (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, "hehe", (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        const user_id = decoded.user_id; // Get user_id from decoded token
        const sql =
          "SELECT u.email, a.image, a.phno,u.fullname,a.gender,a.address FROM user u JOIN account a ON u.user_id = a.user_id WHERE u.user_id = ?";
        db.query(sql, [user_id], (err, data) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({
              Error: "An error occurred while fetching user data",
            });
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
  const { fullname, email, password, phno } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

  const sql =
    "INSERT INTO user (fullname , email, password,phno) VALUES (?, ?, ?, ?)";
  const sql1 = "INSERT INTO account (user_id, fullname, phno) VALUES (?, ?, ?)";

  const userValues = [fullname, email, hashedPassword, phno];

  db.query(sql, userValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        Error: "An error occurred while registering the user",
      });
    }

    // Get the inserted user_id
    const userId = result.insertId;

    const accountValues = [userId, fullname, phno];

    db.query(sql1, accountValues, (err, result) => {
      if (err) {
        console.error("Database error for account query:", err);
        return res.json({
          Error: "An error occurred while querying the Account table",
        });
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
      return res.json({
        Error: "An error occurred while retrieving user data",
      });
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
      user_id: user.user_id,
    };
    const token = jwt.sign(details, "hehe");
    res.cookie("token", token);
    return res.json({ Status: "Success" });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// ------------------------------------------------------------------------------------------------

app.post("/upload", verifyUser, upload.single("image"), (req, res) => {
  const image = req.file.filename;
  // console.log(image)
  const userid = req.user_id; // contains the user's ID
  console.log(userid);
  const sql = "UPDATE account SET image = ? WHERE user_id = ?";

  db.query(sql, [image, userid], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        Error: "An error occurred while updating the image for the user",
      });
    }
    console.log("Successfully updated image for the user");
    return res.json({ Status: "Success" });
  });
});

app.post("/update-account", verifyUser, (req, res) => {
  const userid = req.user_id; // contains the user's ID
  console.log(userid);
  const { gender, phno, address } = req.body;
  let sql = "UPDATE account SET  gender =?,phno=?,address =?  WHERE user_id=?";
  db.query(sql, [gender, phno, address, userid], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        Error:
          "An error occurred while updating the address gender for the account table",
      });
    }
    console.log(
      "Successfully updated gender phno and address for the accounnt"
    );
    return res.json({ Status: "Success" });
  });
});

app.get("/users_order", verifyUser, (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Invalid token" });
  } else {
    jwt.verify(token, "hehe", (err, decoded) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        const user_id = decoded.user_id; // Get user_id from decoded token
        let sql =
          "SELECT c.color,c.c_type,c.cno,c.model,c.capacity,c.car_image,c.car_id,cc.category_name,o.order_id,o.s_date,o.e_date,o.d_type FROM orders as o,account as a,car as c,CarCategory as cc WHERE o.user_id = a.user_id and c.car_id = o.car_id and cc.category_id = c.category_id and a.user_id =?";
        db.query(sql, [user_id], (err, data) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({
              Error: "An error occurred while getting users order details",
            });
          }
          if (data.length === 0) {
            return res.json({ Error: "No user order found with that user_id" });
          }
          const userData = data;
          return res.json({ Status: "Success", userData });
        });
      }
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`SERVER app listening on port ${port}`);
});
