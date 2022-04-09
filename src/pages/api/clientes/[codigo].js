import nc from 'next-connect'
import {Sequelize} from 'sequelize'
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


handler.get(async (req, res) => {
    const {codigo} = req.query
    const cliente = await modeloCliente.findByPk(codigo, {
        include: 'enderecoCliente'
    })
    
    res.status(200).json(cliente)
})

handler.put(async (req, res) => {
    const {codigo} = req.query
    const cliente = await modeloCliente.findByPk(codigo, {include: "enderecoCliente"})
    
    if(!cliente){
        res.status(404).json({mensagem: "Não foi possível realizar a ação, cliente não localizado."})
        return
    }
    const transacao = await sequelize.transaction();
    try{
        const endereco = await modeloEnderecoCliente.findOne({where: {cd_cliente: codigo}})
        
        await cliente.update({
            nome: req.body.nomeCliente,
            nu_cad_federal: req.body.cadFederalCliente,
            telefone: req.body.telefoneCliente,
            celular: req.body.celularCliente,
            email: req.body.emailCliente
        })
        
        await cliente.save({transaction: transacao})
        if(endereco){
            await endereco.update(req.body.enderecoCliente)
            await endereco.save({transaction: transacao})
        }else{
            await modeloEnderecoCliente.create({
                cd_cliente: codigo,
                ...req.body.enderecoCliente
            },{transaction: transacao})
        }
        await cliente.reload()
        await transacao.commit()
        res.status(201).json(cliente)
    }catch(erro){
        await transacao.rollback()
        throw erro
    }
})


export default handler