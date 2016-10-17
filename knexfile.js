'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/blog_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/blog_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
