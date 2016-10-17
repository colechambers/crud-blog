'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('author').notNullable().defaultTo('');
    table.string('category').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('post_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('blog');
};
