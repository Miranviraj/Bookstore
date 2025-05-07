const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { authenticateToken } = require("./userAuth");

// Add local book (Admin only)
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "You are not an Admin" });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      language: req.body.language,
      price: req.body.price,
      desc: req.body.desc,
    });

    await book.save();
    res.status(200).json({ message: "Book added Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update local book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const bookid = req.headers.bookid;
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is missing in headers" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        language: req.body.language,
        price: req.body.price,
        desc: req.body.desc,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete local book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const bookid = req.headers.bookid;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book Deleted Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all local books
router.get("/get-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get recent 5 local books
router.get("/recent-books", async (req, res) => {
  try {
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(recentBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single local book by ID
router.get("/get-book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({
      status: "success",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/search-books", async (req, res) => {
  try {
    const query = req.query.q;
    const axios = require("axios");

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    
    const results = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || "Unknown",
      desc: item.volumeInfo.description || "No description",
      url: item.volumeInfo.imageLinks?.thumbnail || "",
      year: item.volumeInfo.publishedDate || "",
      language: item.volumeInfo.language || "",
      price: Math.floor(Math.random() * 50 + 10),
    }));

    res.json(results);
  } catch (err) {
    console.error("Google Books API error:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});


// Admin: Save selected Google Book to local DB
router.post("/import-google-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const { book } = req.body;

    const newBook = new Book({
      url: book.url,
      title: book.title,
      author: book.author,
      year: book.year,
      language: book.language,
      price: book.price,
      desc: book.desc,
    });

    await newBook.save();
    res.status(201).json({ message: "Google Book added to database" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to import book" });
  }
});

module.exports = router;
