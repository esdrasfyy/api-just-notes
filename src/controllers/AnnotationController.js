const { User, Annotation } = require("../models/AnnotationData");

module.exports = {
  async read(req, res) {
    const username = req.params.username;

    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar o usuário." });
    }
  },
  async create(req, res) {
    const { title, note, priority } = req.body;
    const username = req.params.user;

    if (!title || !note) {
      return res.status(400).json({ error: "Necessário um título/anotação!" });
    }

    try {
      // Encontre o usuário pelo nome de usuário
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      
      const annotationCreated = await Annotation.create({
        title,
        note,
        priority,
      });

      user.notes.push(annotationCreated);
      await user.save();
      console.log(user);

      return res.json(annotationCreated);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao criar a anotação." });
    }
  },

  async delete(req, res) {
    const { user, id } = req.params;

    try {
      const userDoc = await User.findOne({ username: user });

      if (!userDoc) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      const annotation = userDoc.notes.find(
        (note) => note._id.toString() === id
      );

      if (!annotation) {
        return res.status(404).json({ error: "Anotação não encontrada!" });
      }

      userDoc.notes.pull({ _id: annotation._id });
      await userDoc.save();

      return res.json(annotation);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao deletar a anotação." });
    }
  },
};
