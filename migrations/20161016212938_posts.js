'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('user').notNullable().defaultTo('');
    table.string('category').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('blog_img').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('blog');
};
