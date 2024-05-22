const mongoose = require("mongoose");

const AnnotationSchema = new mongoose.Schema({
  title: String,
  note: String,
  priority: Boolean,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  notes: [AnnotationSchema],
});

const User = mongoose.model("User", UserSchema);
const Annotation = mongoose.model("Annotation", AnnotationSchema); // Adicione esta linha para exportar o modelo de anotação

module.exports = { User, Annotation };
