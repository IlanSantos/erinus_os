'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface) {
    const encrypted_password = await bcrypt.hash("administrador", 14)

    await queryInterface.bulkInsert('tb_operador', [
      {
        nome: "administrador",
        usuario: "administrador",
        email: "administrador@bol.com",
        senha: encrypted_password,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('tb_operador', {[Op.eq]: [{usuario: "administrador"}]})
  }
};
