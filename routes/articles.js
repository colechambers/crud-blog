'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/articles', (_req, res, next) => {
  knex('articles')
    .orderBy('title')
    .then((rows) => {
      const articles = camelizeKeys(rows);

      res.send(articles);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/articles/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('articles')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const article = camelizeKeys(row);

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
});

router.article('/articles', (req, res, next) => {
  const { title, author, category, description, blog_img } = req.body;

  if (!title || !title.trim()) {
    return next(boom.create(400, 'Title must not be blank'));
  }

  if (!author || !author.trim()) {
    return next(boom.create(400, 'Author must not be blank'));
  }

  if (!category || !category.trim()) {
    return next(boom.create(400, 'category must not be blank'));
  }

  if (!description || !description.trim()) {
    return next(boom.create(400, 'Description must not be blank'));
  }

  if (!blog_img || !blog_img.trim()) {
    return next(boom.create(400, 'Cover URL must not be blank'));
  }

  const insertarticle = { title, author, category, description, blog_img };

  knex('articles')
    .insert(decamelizeKeys(insertarticle), '*')
    .then((rows) => {
      const article = camelizeKeys(rows[0]);

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/articles/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('articles')
    .where('id', id)
    .first()
    .then((article) => {
      if (!article) {
        throw boom.create(404, 'Not Found');
      }

      const { title, author, category, description, blog_img } = req.body;
      const updatearticle = {};

      if (title) {
        updatearticle.title = title;
      }

      if (author) {
        updatearticle.author = author;
      }

      if (category) {
        updatearticle.category = category;
      }

      if (description) {
        updatearticle.description = description;
      }

      if (blog_img) {
        updatearticle.blog_img = blog_img;
      }

      return knex('articles')
        .update(decamelizeKeys(updatearticle), '*')
        .where('id', id);
    })
    .then((rows) => {
      const article = camelizeKeys(rows[0]);

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/articles/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let article;

  knex('articles')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      article = camelizeKeys(row);

      return knex('articles')
        .del()
        .where('id', id);
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
