import { Sequelize, DataTypes, fn } from "sequelize"
import config from '../config/database'
import EnderecoCliente from "./endereco_cliente"
const sequelize = new Sequelize(config)

const Cliente = sequelize.define("Cliente", {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nu_cad_federal: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING(20)
    },
    celular: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(50),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
      
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    
},{
    tableName: "tb_cliente",
    comment: "Tabela de clientes",
    timestamps: true,
    underscored: true
})


export default Cliente