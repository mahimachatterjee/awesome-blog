const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5001;
const SECRET_KEY = "mahima"; // Replace with a secure secret key for JWT

app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{res.send("shinchan")})  ///server testing .
// Middleware for authenticating token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token is missing" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = decoded; // Attach the decoded user to the request
    next();
  });
};

// Register endpoint
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create blog
app.post("/api/blogs", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: { select: { email: true } } },
    });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log( `Server is running on http://localhost:${PORT}`);
});

