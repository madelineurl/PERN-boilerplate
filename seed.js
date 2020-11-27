'use strict'
const { db, Movie} = require('./server/db');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const movies = await Promise.all([
    Movie.create({title: 'Love Actually', upvotes: 10, downvotes: 15}),
    Movie.create({title: 'Fern Gully', upvotes: 5, downvotes: 10 }),
    Movie.create({title: 'Home Alone', upvotes: 35, downvotes: 5 })
  ]);

  console.log(`seeded ${movies.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
