// server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/Userrouter.js";
import passport from "passport";
import session from 'express-session';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
import multer from "multer";
import xlsx from "xlsx";
import db from "./db/DB.js";

const app = express();
app.use(cors());
app.use(express.json());



//Google authentication  
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failed" }),
  (req, res) => {
    // Issue JWT
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirect with token to React
    res.redirect(`http://localhost:5173/home?token=${token}`);
  }
);

app.get("/profile", (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});


//Upload excel file 

const upload = multer({ dest: "uploads/" });

// Upload and insert Excel data
// app.post("/upload", upload.single("file"), (req, res) => {
//   const workbook = xlsx.readFile(req.file.path);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const rows = xlsx.utils.sheet_to_json(sheet);

//   rows.forEach((row) => {
//     const { NAME, EMAIL } = row;
//     console.log("Row:  "+ row);
//     db.query("INSERT INTO excelusers (name, email) VALUES (?, ?)", [NAME, EMAIL]);
//   });

//   console.log("Uploaded file:", req.file);
// console.log("Rows:", rows);
//   res.send({ status: "success" });
// });



app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    let inserted = 0;

    // 1️⃣ Insert into `files` table first
    db.query(
      "INSERT INTO lists_segments (name, type, profiles) VALUES (?, ?, ?)",
      [req.file.originalname, "file", 0],
      (err, result) => {
        if (err) return res.status(500).json({ error: "File insert failed" });

        const fileId = result.insertId;
        console.log("FileId:  ",fileId);

        // 2️⃣ Insert profiles into `excelusers`
        rows.forEach((row) => {
          const name = row.Name || row.name ||row.NAME ||"";
          const email = row.Email || row.email || row.EMAIL ||"";
          if (name && email) {
            console.log(name)
            db.query(
              "INSERT INTO excelusers (name, email, file_id) VALUES (?, ?, ?)",
              [name, email, fileId]
            );
            inserted++;
          }
        });

        // 3️⃣ Update profiles count in `files`
        db.query("UPDATE lists_segments SET profiles=? WHERE id=?", [inserted, fileId]);

        res.json({ status: "success", fileId, inserted });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});




// Fetch data from SQL
app.get("/data", (req, res) => {
  db.query("SELECT * FROM excelusers", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/files", (req, res) => {
  db.query("SELECT * FROM lists_segments ORDER BY created_at DESC", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get profiles for a file
app.get("/profiles/:fileId", (req, res) => {
  db.query(
    "SELECT * FROM excelusers WHERE file_id=?",
    [req.params.fileId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// User routes
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
