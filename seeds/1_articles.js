/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([{
        id: 1,
        title: 'Never give up, never say die',
        author: 'Cole Chambers',
        category: 'Grit',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 2,
        title: 'Victory is mine',
        author: 'Cole Chambers',
        category: 'Victory',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 3,
        title: 'Threading the needle',
        author: 'Cole Chambers',
        category: 'Needles',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 4,
        title: 'Zero fux to give',
        author: 'Cole Chambers',
        category: 'ZFG',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 5,
        title: 'I do not need you',
        author: 'Solidarity',
        category: 'JavaScript',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 6,
        title: 'A new day, a new life',
        author: 'Cole Chambers',
        category: 'Reincarnation',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 7,
        title: 'Transcend the pain',
        author: 'Cole Chambers',
        category: 'Transcend',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 8,
        title: 'Create a vision for yourself',
        author: 'Cole Chambers',
        category: 'Vision',
        description: "Too lazy to be ambitious, I let the world take care of itself. Ten days worth of rice in my bag; a bundle of twigs by the fireplace. Why chatter about delusion and enlightenment?  Listening to the night rain on my roof, I sit comfortably, with both legs stretched out.",
        blog_img: '',
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));"
      );
    });
};
