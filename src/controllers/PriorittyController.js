const { User } = require("../models/AnnotationData");
module.exports = {
  async read(req, res) {
    const priority = req.query;

    const priorityNotes = await Annotation.find(priority);

    return res.json(priorityNotes);
  },
  async update(req, res) {
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

      // Alternar o valor da propriedade 'priority' entre true e false
      annotation.priority = !annotation.priority;

      await userDoc.save();

      return res.json(annotation);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar a anotação." });
    }
  },
};
