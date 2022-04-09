'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("tb_cliente", {
      codigo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      nome: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      nu_cad_federal: {
          type: Sequelize.STRING(20),
          unique: true,
      },
      telefone: {
          type: Sequelize.STRING(20)
      },
      celular: {
          type: Sequelize.STRING(20)
      },
      email: {
          type: Sequelize.STRING(50),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('tb_cliente');
  }
};
