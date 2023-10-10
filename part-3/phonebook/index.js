require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./models/contact.js");

let persons = [];

const app = express();
app.use(express.json());
app.use(cors());
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
app.use(express.static("dist"));

app.get("/persons", (req, res) => {
  Contact.find({}).then((result) => {
    res.send(result);
    persons = result;
  });
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

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });
  contact
    .save()
    .then((result) => {
      console.log("Contact saved!");
      res.status(200).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3002, (req, res) => {
  console.log(`Listening on ${process.env.PORT}`);
});
