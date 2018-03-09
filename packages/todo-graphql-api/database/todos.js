const franc = require("franc");
const getSentiment = require("sentiment");

const database = require("./index");

const select = () => database("todos").select();

const insert = async text => {
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
  return { id, text, completed: false, sentiment, language };
};

const toggleAll = async () => {
  const isAnyTodoIncomplete = await database("todos").where("completed", false);
  return database("todos").update({
    completed: !!isAnyTodoIncomplete.length,
    updatedAt: Date.now()
  });
};

const update = async (id, text) => {
  await database("todos")
    .where("id", id)
    .update({ text, updatedAt: Date.now() });
  const [todo] = await database("todos").where({ id });
  return todo;
};

const toggle = async id => {
  const [todo] = await database("todos").where("id", id);
  await database("todos")
    .where("id", id)
    .update({ completed: !todo.completed, updatedAt: Date.now() });
  return { ...todo, completed: !todo.completed };
};

const removeCompleted = async () => {
  const ids = await database("todos")
    .where("completed", true)
    .select("id");
  await database("todos")
    .where("completed", true)
    .delete();
  return ids.map(({ id }) => id);
};

const removeAll = () => database("todos").delete();

const remove = id =>
  database("todos")
    .where("id", id)
    .delete();

module.exports = {
  select,
  insert,
  toggleAll,
  update,
  toggle,
  removeCompleted,
  removeAll,
  remove
};
