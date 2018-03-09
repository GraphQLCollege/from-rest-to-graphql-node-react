const knex = require("knex")({
  client: "sqlite3",
  connection: ":memory:"
});

knex.schema
  .createTable("todos", t => {
    t.increments("id").primary();
    t.string("text");
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
    t.string("language");
    t.integer("sentiment");
    t.boolean("completed");
  })
  .then(() => console.log("Table created"))
  .catch(() => console.log("Table already exists"));

module.exports = knex;
