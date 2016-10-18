'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  const accessToken = req.cookies.accessToken;

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

router.get('/articles', authorize, (req, res, next) => {
  knex('articles')
    .innerJoin('books', 'books.id', 'articles.book_id')
    .where('articles.user_id', req.token.userId)
    .orderBy('books.title', 'ASC')
    .then((rows) => {
      const favs = camelizeKeys(rows);

      res.send(favs);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/articles/check', authorize, (req, res, next) => {
  const bookId = Number.parseInt(req.query.bookId);

  if (!Number.isInteger(bookId)) {
    return next(boom.create(400, 'Book ID must be an integer'));
  }

  knex('books')
    .innerJoin('articles', 'articles.book_id', 'books.id')
    .where({
      'articles.book_id': bookId,
      'articles.user_id': req.token.userId
    })
    .first()
    .then((row) => {
      if (row) {
        return res.send(true);
      }

      res.send(false);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/articles', authorize, (req, res, next) => {
  const bookId = Number.parseInt(req.body.bookId);

  if (!Number.isInteger(bookId)) {
    return next(boom.create(400, 'Book ID must be an integer'));
  }

  knex('books')
    .where('id', bookId)
    .first()
    .then((book) => {
      if (!book) {
        throw boom.create(404, 'Book not found');
      }

      const insertarticle = { bookId, userId: req.token.userId };

      return knex('articles')
        .insert(decamelizeKeys(insertarticle), '*');
    })
    .then((rows) => {
      const article = camelizeKeys(rows[0]);

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/articles', authorize, (req, res, next) => {
  const bookId = Number.parseInt(req.body.bookId);

  if (!Number.isInteger(bookId)) {
    return next(boom.create(400, 'Book ID must be an integer'));
  }

  // eslint-disable-next-line camelcase
  const clause = { book_id: bookId, user_id: req.token.userId };

  let article;

  knex('articles')
    .where(clause)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'article not found');
      }

      article = camelizeKeys(row);

      return knex('articles')
        .del()
        .where('id', article.id);
    })
    .then(() => {
      delete article.id;

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
