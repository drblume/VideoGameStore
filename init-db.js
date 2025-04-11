const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/store.db');

const schema = fs.readFileSync('./storeSQLdb/schema.sql', 'utf-8');
const seed = fs.readFileSync('./storeSQLdb/seed.sql', 'utf-8');

// Execute schema and then seed
db.exec(schema, (err) => {
  if (err) {
    console.error('Error running schema.sql:', err.message);
  } else {
    console.log('✅ Schema created.');

    db.exec(seed, (err) => {
      if (err) {
        console.error('Error seeding:', err.message);
      } else {
        console.log('✅ Database seeded.');
      }
      db.close();
    });
  }
});

