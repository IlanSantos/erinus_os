import nc from 'next-connect'
import {compare} from 'bcrypt'
import {getCookie, setCookies} from 'cookies-next'
import Operador from '../../database/models/operador'
import Sessao from '../../database/models/sessao'
import { CreateToken } from '../../tools/Token'
const handler = nc({
    onError: (err, req, res, next) => {
        res.status(500).end("Houve um erro! " + err.toString())
    },
    onNoMatch: (req, res) => {
        res.status(404).json({mensagem: "Método de requisição não implementado.", erro: true});
    },
})

handler.post(async (req, res) => {
    const {usuario, senha} = req.body
    if(!usuario || !senha){
        res.status(200).json({mensagem: "Está faltando dados em sua requisição.", erro: true})
        return
    }
    const query_find_operator = await Operador.findOne({where: {usuario: usuario}})
    if(query_find_operator === null){
        res.status(200).json({mensagem: "Usuário ou senha incorretos", erro: true})
        return
    } 
    const match_password = await compare(senha, query_find_operator.senha)
    if (match_password){
        const token = CreateToken({...query_find_operator.dataValues, senha: undefined})
        const create_session = await Sessao.create({cd_usuario: query_find_operator.codigo, token: token}, {returning: true})
        setCookies("erinus-S_ID", create_session.codigo, {req, res})
        setCookies('erinus-S_TOKEN', token, {req, res})
        res.status(201).json({mensagem: "Encontrado", usuario: {...query_find_operator.dataValues, senha: undefined}, token: token})
    }else{
        res.status(200).json({mensagem: "Usuário ou senha incorretos", erro: true})
    }
})

handler.get(async (req, res) => {
    const session_id = getCookie("erinus-S_ID", {req, res})
    const token = getCookie("erinus-S_TOKEN", {req, res})
    if(!session_id && !token){
        res.status(200).json({mensagem: "Está faltando dados de autenticação!", erro: true})
        return
    }

    const search_session = await Sessao.findByPk(session_id)
    if(!search_session){
        res.status(200).json({mensagem: "Sessão não localizada.", erro: true})
        return
    }
    const search_user = await Operador.findOne({where: {codigo: search_session.cd_usuario}})
    res.status(201).json({mensagem: "Encontrado", usuario: {...search_user.dataValues, senha: undefined}})
})

export default handler