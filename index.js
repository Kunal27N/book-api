import express from "express";

const app = express();
const port = 8080;

// Middleware to parse JSON request bodies
app.use(express.json());

const books = [
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic Fiction"
    },
    {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Literary Fiction"
    },
    {
        "id": 3,
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "genre": "Fantasy"
    },
    {
        "id": 4,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "genre": "Coming-of-Age Fiction"
    },
    {
        "id": 5,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Romance"
    }
];

// GET all books
app.get("/all", (req, res) => {
    res.json(books);
});

// GET a specific book by title
app.get("/book/:title", (req, res) => {
    const title = req.params.title;
    const book = books.find(b => b.title === title);
    if (!book) {
        res.status(404).json({ message: "Book not found" });
    } else {
        res.json(book);
    }
});

// POST a new book
app.post("/newBook", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    };
    books.push(newBook);
    res.json(newBook);
});

// PATCH a book by ID (partial update)
app.patch("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    // Update the book with the provided fields
    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;
    if (req.body.genre) book.genre = req.body.genre;

    res.json(book);
});

// PUT a book by ID (complete update)
app.put("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    // Replace the book with a new one
    const updatedBook = {
        id: id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    };

    books[bookIndex] = updatedBook;

    res.json(updatedBook);
});

// DELETE a book by ID
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    // Remove the book from the array
    const deletedBook = books.splice(bookIndex, 1);

    res.json({ message: "Book deleted", book: deletedBook });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
