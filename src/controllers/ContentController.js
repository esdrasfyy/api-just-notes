const { User } = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    const { id, user } = req.params;
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

      const { note } = req.body;

      if (note) {
        annotation.note = note;
        await userDoc.save();
        return res
          .status(200)
          .json({ msg: "Anotação atualizada com sucesso", annotation });
      } else {
        return res
          .status(400)
          .json({ error: "O campo 'note' não pode ser vazio!" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar a anotação." });
    }
  },
};
