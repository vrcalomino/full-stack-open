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

app.get("/persons", (req, res, next) => {
  Contact.find({})
    .then((result) => {
      res.send(result);
      persons = result;
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  res.send(
    `phonebook has info for ${persons.length} people <br /> ${new Date(
      8.64e15
    ).toString()}`
  );
});

app.get("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => next(error));
});

app.delete("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Contact.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/persons", (req, res, next) => {
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
    .catch((error) => next(error));
});

app.put("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(id, contact, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    console.log("Here");
    return response.status(400).json(error);
  }

  next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT || 3002, (req, res) => {
  console.log(`Listening on ${process.env.PORT}`);
});
