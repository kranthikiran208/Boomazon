import express from 'express';
import Book from '../models/bookModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const author = req.query.author ? { author: req.query.author } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  
  const books = await Book.find({ ...category,...author, ...searchKeyword });
  res.send(books);
});

router.get('/', async (req, res) => {
  const author = req.query.author ? { author: req.query.author } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  
  const books = await Book.find({ ...author, ...searchKeyword });
  res.send(books);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not Found.' });
  }
});

router.post('/:id/reviews', isAuth, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    book.reviews.push(review);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.reduce((a, c) => c.rating + a, 0) /
      book.reviews.length;
    const updatedBook = await book.save();
    res.status(201).send({
      data: updatedBook.reviews[updatedBook.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Book Not Found' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (book) {
    book.name = req.body.name;
    book.price = req.body.price;
    book.image = req.body.image;
    book.author = req.body.author;
    book.category = req.body.category;
    book.countInStock = req.body.countInStock;
    book.description = req.body.description;
    const updatedBook = await book.save();
    if (updatedBook) {
      return res
        .status(200)
        .send({ message: 'Book Updated', data: updatedBook });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Book.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedBook = await Book.findById(req.params.id);
  if (deletedBook) {
    await deletedBook.remove();
    res.send({ message: 'Book Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    author: req.body.author,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newBook = await book.save();
  if (newBook) {
    return res
      .status(201)
      .send({ message: 'New Book Created', data: newBook });
  }
  return res.status(500).send({ message: ' Error in Creating Book.' });
});

export default router;
