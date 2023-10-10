const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

mongoose.connect(
  `mongodb+srv://vrcalomino:${process.argv[2]}@vrcalomino-projects.chi4w2d.mongodb.net/?retryWrites=true&w=majority`
);

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log("Contact saved");
    mongoose.connection.close();
  });
}
