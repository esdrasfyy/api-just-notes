const {User} = require("../models/AnnotationData");
    const bcrypt = require("bcrypt");

module.exports = {
    async register(req, res){
        const { username, email, password } = await req.body;
        if (!username) {
          return res.status(422).json({ msg: "necessário nome" });
        }
        if (!email) {
            return res.status(422).json({"msg": "necessário email"})
        }
        if (!password) {
            return res.status(422).json({"msg": "necessário senha"})
        }
        const userExist = await User.findOne({ username: username })
        
        if (userExist) {
            return res.status(422).json({msg: "Por Favor, insira outro nome!"})
        }
        
        const emailExist = await User.findOne({ email: email })
        
        if (emailExist) {
            return res.status(422).json({msg: "Por Favor, insira outro email!"})
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
          username,
          email,
          password: passwordHash,
        });
        try {
            await user.save()
            res.status(201).json({msg: "usuario criado com sucesso"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "aconteceu um erro no servidor, tente novamente mais tarde!"})
        }
    },

}