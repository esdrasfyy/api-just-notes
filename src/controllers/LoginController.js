const { User } = require("../models/AnnotationData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username) {
      return res.status(404).json({ msg: "username incorreto" });
    }
    if (!password) {
      return res.status(404).json({ msg: "senha incorreta" });
    }
    // res.status(200).json({ msg: "deu bom" })

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ msg: "Usuario não encontrado!" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "senha invalida" });
    }
    try {
      const secret = "DSHDJSIW0APCSINAIXXJSKWIDJSI";

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      res.status(200).json({
        msg: "Auenticação realizada com sucesso",
        token,
      });
    } catch (error) {
      res.status(500).json({ msg: "aconteceu um erro no servidor" });
    }
  },
  async authLogin(req, res) {
    const username = req.params.username;
    if (!username) {
      return res.status(404).json({ msg: "Usuario nao encontrado" });
    }
    const user = await User.findOne({ username: username }, "-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuario nao encontrado" });
    }
    res.status(200).json({ user });
  },
};
