/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('article').del()
    .then(() => {
      return knex('article').insert([{
        id: 1,
        article_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites));"
      );
    });
};
