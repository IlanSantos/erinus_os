import { Sequelize, DataTypes } from "sequelize"
import config from '../config/database'
import Cliente from "./cliente"
const sequelize = new Sequelize(config)


const EnderecoCliente = sequelize.define('EnderecoCliente', {
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
    CEP: {
        type: DataTypes.STRING(20),
        field: "CEP"
    },
    UF: {
        type: DataTypes.STRING(2),
        field: "UF"
    },
    cidade: DataTypes.STRING(50),
    bairro: DataTypes.STRING(50),
    rua: DataTypes.STRING(50),
    numero: DataTypes.STRING(10),
    complemento: DataTypes.STRING(20)
},
    {
        tableName: "tb_endereco_cliente",
        timestamps: true,
        underscored: true
    }
)


export default EnderecoCliente
