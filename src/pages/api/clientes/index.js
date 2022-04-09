import nc from 'next-connect'
import { Sequelize, Op } from 'sequelize'
import modeloCliente from '../../../database/models/cliente'
import modeloEnderecoCliente from '../../../database/models/endereco_cliente'
import config from '../../../database/config/database'
const sequelize = new Sequelize(config)

modeloEnderecoCliente.belongsTo(modeloCliente, {foreignKey: 'cd_cliente'})
modeloCliente.hasOne(modeloEnderecoCliente, {foreignKey: 'cd_cliente', as: "enderecoCliente"})

const handler = nc({
    onError: (err, req, res, next) => {
        console.log(err.toString())
        res.status(500).json({mensagem: "Houve um erro! " + err.toString()})
    },
    onNoMatch: (req, res) => {
        res.status(404).json({mensagem: "Método de requisição não implementado.", erro: true});
    }
})

handler.post(async (req, res) => {
    if(!req.body.cadFederalCliente || !req.body.nomeCliente){
        res.status(404).json({mensagem: "Está faltando dados em sua requisição."})
        return
    }
    const verifica_existe_cliente = await modeloCliente.findOne({
        where: {
            nu_cad_federal: req.body.cadFederalCliente
        }
    })

    if(!verifica_existe_cliente){
        const transacao = await sequelize.transaction()
        try{
            const cliente = await modeloCliente.create({
                nome: req.body.nomeCliente,
                nu_cad_federal: req.body.cadFederalCliente,
                telefone: req.body.telefoneCliente,
                celular: req.body.celularCliente,
                email: req.body.emailCliente
            }, {
                transaction: transacao
            })
            await modeloEnderecoCliente.create({cd_cliente: cliente.codigo,...req.body.enderecoCliente}, {
                transaction: transacao
            })
            await transacao.commit()
            res.status(201).json({mensagem: "Cliente cadastrado com sucesso."})
        }catch(erro){
            console.log(erro)
            await transacao.rollback()
            throw erro
        }
    }
    else{
        res.status(404).json({mensagem: "Já existe um cliente com este CPF/CNPJ."})
    }

})

handler.get(async (req, res) => {
    let filtro = {}

    if(req.query.nome){
        filtro.nome = {
            [Op.iLike]: `${req.query.nome}%`
        }
    }

    const busca_clientes = await modeloCliente.findAll({
        where: filtro,
        order: [['codigo', 'ASC']],
        include: "enderecoCliente"
    })
    res.status(200).json(busca_clientes)
})



export default handler