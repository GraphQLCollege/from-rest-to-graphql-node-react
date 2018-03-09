const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const franc = require("franc");
const getSentiment = require("sentiment");

const database = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  const todos = await database("todos").select();
  res.status(200).send(todos);
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const sentiment = getSentiment(text);
  const language = franc(text);
  const [id] = await database("todos").insert({
    text,
    sentiment,
    language,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    completed: false
  });
  res.status(200).send({ id, text, completed: false, sentiment, language });
});

app.put("/todos/toggle", async (req, res) => {
  const isAnyTodoIncomplete = await database("todos").where("completed", false);
  const updated = await database("todos").update({
    completed: !!isAnyTodoIncomplete.length,
    updatedAt: Date.now()
  });
  res.status(200).send({ updated });
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await database("todos")
    .where("id", id)
    .update({ text: req.body.text, updatedAt: Date.now() });
  const [todo] = await database("todos").where({ id });
  res.status(200).send(todo);
});

app.put("/todos/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const [todo] = await database("todos").where("id", id);
  await database("todos")
    .where("id", id)
    .update({ completed: !todo.completed, updatedAt: Date.now() });
  res.status(200).send({ ...todo, completed: !todo.completed });
});

app.delete("/todos/completed", async (req, res) => {
  const ids = await database("todos")
    .where("completed", true)
    .select("id");
  await database("todos")
    .where("completed", true)
    .delete();
  res.status(200).send({ ids: ids.map(({ id }) => id) });
});

app.delete("/todos", async (req, res) => {
  await database("todos").delete();
  res.status(200).send(true);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await database("todos")
    .where("id", req.params.id)
    .delete();
  res.status(200).send({ id });
});

const server = app.listen(4000, function() {
  console.log("app running on port.", server.address().port);
});
