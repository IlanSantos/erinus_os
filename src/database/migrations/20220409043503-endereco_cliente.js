'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('tb_endereco_cliente', {
      codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cd_cliente :{
          type: DataTypes.INTEGER,
          references: {
              model: "tb_cliente",
              key: "codigo"
          },
          allowNull: false
      },
      CEP: DataTypes.STRING(20),
      UF: DataTypes.STRING(2),
      cidade: DataTypes.STRING(50),
      bairro: DataTypes.STRING(50),
      rua: DataTypes.STRING(50),
      numero: DataTypes.STRING(10),
      complemento: DataTypes.STRING(20),
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
    await queryInterface.addIndex(
      "tb_endereco_cliente",
      ["codigo"],
      {
        fields: ['codigo'],
        using: "BTREE"
      }
    )
    await queryInterface.addIndex(
      "tb_endereco_cliente",
      ["cd_cliente"],
      {
        fields: ['cd_cliente'],
        unique: true,
        using: "BTREE"
      }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable("tb_endereco_cliente")
  }
};
