const express = require("express");

const app = express();

const PORT = 3001;
const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/persons", (req, res) => {
  res.send(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `phonebook has info for ${persons.length} people <br /> ${new Date(
      8.64e15
    ).toString()}`
  );
});

app.get("/persons/:id", (req, res) => {
  const id = req.params.id;
  if (persons[id]) {
    res.send(persons[id]);
  } else {
    res.status(404).end();
  }
});

app.delete("/persons/:id", (req, res) => {
  const id = req.params.id;
  if (persons[id]) {
    persons.pop(id);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.listen(PORT || 3002, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
