const router = require("express").Router();
const Book = require('../models/Book')
const Author = require('../models/Author')

router.get('/books', (req, res, next) => {
	// get all the books from the db
	Book.find()
		.then(booksFromDB => {
			console.log(booksFromDB)
			res.render('books', { books: booksFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.get('/books/edit/:id', (req, res, next) => {
	// get this book from the db
	const id = req.params.id
	Book.findById(id)
		.then(bookFromDB => {
			res.render('edit', { book: bookFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/books/edit/:id', (req, res, next) => {
	const { title, author, description, rating } = req.body
	const id = req.params.id
	// update this book in the db
	// if this should return the updated book -> add {new: true} 
	Book.findByIdAndUpdate(id, {
		title,
		description,
		author,
		rating
	}, { new: true })
		.then(updatedBook => {
			console.log(updatedBook)
			// redirect to the detail page of the updated book	
			res.redirect(`/books/${updatedBook._id}`)
		})
		.catch(err => {
			next(err)
		})
});


router.get('/books/add', (req, res, next) => {
	// get all the authors from the db
	Author.find()
		.then(authorsFromDB => {
			console.log(authorsFromDB)
			res.render('add', { authors: authorsFromDB })
		})
});

// this displays the details of a specific book
router.get('/books/:id', (req, res, next) => {
	// console.log('books id')
	const id = req.params.id
	// console.log(id)
	// populate(<name of the field>) replaces the id with the full object
	Book.findById(id)
		.populate('author')
		.then(bookFromDB => {
			console.log(bookFromDB)
			res.render('book', { book: bookFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/books', (req, res, next) => {
	// create the book in the db
	const { title, description, rating, author } = req.body
	console.log(title, description, rating, author)
	Book.create({
		title: title,
		author: author,
		description: description,
		rating: rating,
	})
		.then(createdBook => {
			console.log(createdBook)
			res.redirect(`/books/${createdBook._id}`)
			// res.render('book', { book: createdBook })
		})
		.catch(err => {
			next(err)
		})
});

router.get('/books/delete/:id', (req, res, next) => {
	const id = req.params.id
	// delete the book in the db
	Book.findByIdAndDelete(id)
		.then(() => {
			// redirect to the books list
			res.redirect('/books')
		})
		.catch(err => {
			next(err)
		})
});

router.post('/books/:id/reviews', (req, res, next) => {
	const id = req.params.id
	const { user, text } = req.body
	Book.findByIdAndUpdate(id, { $push: { reviews: { user: user, text: text } } })
		.then(() => {
			res.redirect(`/books/${id}`)
		})
		.catch(err => next(err))
});


module.exports = router;