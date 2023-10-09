const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      JSON.stringify(req.body),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

const PORT = 3001;
let persons = [
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

app.post("/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }

  let matchingPersons = persons.filter((person) => person.name === body.name);
  if (matchingPersons.length > 0) {
    return res.status(400).json({
      error: `name already is in the phonebook`,
    });
  }

  const newId = Math.floor(Math.random() * 100);
  const newPerson = {
    name: body.name,
    number: body.number,
    id: newId,
  };
  persons = persons.concat(newPerson);
  res.send(newPerson).status(200);
});

app.listen(PORT || 3002, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
