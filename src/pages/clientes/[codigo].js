import React from 'react'
import Head from 'next/head'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box, Button, Container, FormControl, FormLabel,
    Heading, Input, Select, Text, Wrap, WrapItem, useToast, FormErrorMessage
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { EstadosBrasileiros } from '../../utils/VariaveisAuxiliares'
import api from '../../services/api'


export default function InfoCliente({cliente}){
    const toast = useToast()
    const {register, handleSubmit, getValues, getFieldState, setValue, formState: {isSubmitting}} = useForm({
        defaultValues: {
            nomeCliente: cliente.nome,
            cadFederalCliente: cliente.nu_cad_federal,
            telefoneCliente: cliente.telefone,
            celularCliente: cliente.celular,
            emailCliente: cliente.email,
            enderecoCliente: cliente.enderecoCliente ? {
                CEP: cliente.enderecoCliente.CEP,
                UF: cliente.enderecoCliente.UF,
                cidade: cliente.enderecoCliente.cidade,
                bairro: cliente.enderecoCliente.bairro,
                rua: cliente.enderecoCliente.rua,
                numero: cliente.enderecoCliente.numero,
                complemento: cliente.enderecoCliente.complemento
            } : {}
        }
    })
    const atualizaCliente = async (form) => {
        try{
            await api.put("/clientes/"+cliente.codigo, form)
            toast({
                title: "Sucesso!",
                description: "Cliente atualizado com sucesso.",
                status: "success",
                duration: 3500,
                isClosable: true,
                position: "top-right"
            })
        }catch(error){
            toast({
                title: "Erro!",
                description: error.response ? error.response.data.mensagem : error.toString(),
                status: "error",
                duration: 3500,
                isClosable: true,
                position: "top-right"
            })
        }
    }
    const buscaEndereco = async () => {
        try{
            const request = await api.get(`https://viacep.com.br/ws/${getValues("enderecoCliente.CEP")}/json/`)
            if(!request.data.erro){
                setValue("enderecoCliente", {
                    CEP: request.data.cep,
                    UF: request.data.uf,
                    cidade: request.data.localidade,
                    bairro: request.data.bairro,
                    rua: request.data.logradouro,
                })
            }
        }catch{

        }
    }

    if(!cliente) {
        return (
            <>
                <Head>
                    <title>ERINUS | Visualização de Cliente</title>
                </Head>
                <Container className="background-white" maxW="container.xl" marginTop={7}>
                    <Heading fontFamily="Mohave" fontSize="36">Informações do cliente</Heading>
                    <Text marginY={3}>Cliente não localizado.</Text>
                </Container>
            </>
        )
    }

    return (
        <Container className="background-white" maxW="container.xl" marginTop={7}>
            <FormControl as="form" onSubmit={handleSubmit(atualizaCliente)}>
                <Heading fontFamily="Mohave" fontSize="3xl">Informações do cliente</Heading>
                <Wrap marginY={3}>
                    <WrapItem w={["100%", "48.5%", "33%", "15%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="codigocliente">Código:</FormLabel>
                            <Input id="codigocliente" value={cliente.codigo} isDisabled/>
                        </Box>
                    </WrapItem>
                    <WrapItem w={["100%", "48.5%", "33%", "33%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="nomecliente">Nome:</FormLabel>
                            <Input {...register("nomeCliente")} id="nomecliente"/>
                        </Box>
                    </WrapItem>
                    <WrapItem w={["100%", "48.5%", "33%", "15%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="cpfcliente">CPF/CNPJ:</FormLabel>
                            <Input {...register("cadFederalCliente")} id="cpfcliente" />
                        </Box>
                    </WrapItem>
                </Wrap>
                <Heading fontSize="2xl" fontFamily="Mohave" marginY={5}>Contato</Heading>
                <Wrap>
                    <WrapItem w={["100%", "48.5%", "33%", "15%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="telefonecliente">Telefone:</FormLabel>
                            <Input {...register("telefoneCliente")} id="telefonecliente" placeholder="Telefone" />
                        </Box>
                    </WrapItem>
                    <WrapItem w={["100%", "48.5%", "33%", "15%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="celularcliente">Celular:</FormLabel>
                            <Input {...register("celularCliente")} id="celularcliente" placeholder="Celular" />
                        </Box>
                    </WrapItem>
                    <WrapItem w={["100%", "48.5%", "33%", "33%"]}>
                        <Box w='100%'>
                            <FormLabel htmlFor="emailcliente">E-mail:</FormLabel>
                            <Input {...register("emailCliente")} id="emailcliente" placeholder="E-mail" />
                        </Box>
                    </WrapItem>
                </Wrap>
                <Accordion marginTop={5} defaultIndex={[0]} allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize="2xl">
                                Endereço
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Wrap>
                                <WrapItem w={['100%', '48.5%', '33%', '20%']}>
                                    <Box w="100%">
                                    <FormControl isInvalid={getFieldState("enderecoCliente.CEP").invalid}>
                                            <FormLabel>CEP:</FormLabel>
                                            <Input {...register("enderecoCliente.CEP", {required: "Campo obrigatório", minLength: {value: 8, message: "Necessário no mínimo 8 caractéres."}})} onBlur={buscaEndereco} type="text" placeholder="Ex: 41025-100" />
                                            {getFieldState("enderecoCliente.CEP").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.CEP").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                </WrapItem>
                                <WrapItem w={['100%', '48.5%', '45%', '40%']}>
                                    <Box w="100%">
                                        <FormControl isInvalid={getFieldState("enderecoCliente.rua").invalid}>
                                            <FormLabel>Rua:</FormLabel>
                                            <Input {...register("enderecoCliente.rua", {required: "Campo obrigatório", minLength: {value: 3, message: "Necessário no mínimo 3 caractéres."}})} type="text" placeholder="Rua" />
                                            {getFieldState("enderecoCliente.rua").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.rua").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                </WrapItem>
                                <Box w={['100%', '48.5%', '15%', '10%']}>
                                    <FormLabel>Número:</FormLabel>
                                    <Input {...register("enderecoCliente.numero")} type="text" placeholder="Número" />
                                </Box>
                                <Box w={['100%', '48.5%', '33%', '15%']}>
                                    <FormLabel>Complemento:</FormLabel>
                                    <Input {...register("enderecoCliente.complemento")} type="text" placeholder="Complemento" />
                                </Box>
                            </Wrap>
                            
                            <Wrap>
                                <WrapItem w={['100%', '48.5%', '45%', '40%']}>
                                    <Box w="100%">
                                        <FormControl isInvalid={getFieldState("enderecoCliente.bairro").invalid}>
                                            <FormLabel>Bairro:</FormLabel>
                                            <Input {...register("enderecoCliente.bairro", {required: "Campo obrigatório"})} type="text" placeholder="Bairro" />
                                            {getFieldState("enderecoCliente.bairro").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.bairro").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                </WrapItem>
                                <WrapItem w={['100%', '48.5%', '33%', '20%']}>
                                    <Box w="100%">
                                        <FormControl isInvalid={getFieldState("enderecoCliente.cidade").invalid}>
                                            <FormLabel>Cidade:</FormLabel>
                                            <Input {...register("enderecoCliente.cidade", {required: "Campo obrigatório"})} type="text" placeholder="Cidade" />
                                            {getFieldState("enderecoCliente.cidade").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.cidade").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                </WrapItem>
                                <WrapItem w={['100%', '48.5%', '15%', '10%']}>
                                    <Box w="100%">
                                    <FormControl isInvalid={getFieldState("enderecoCliente.UF").invalid}>
                                            <FormLabel>UF:</FormLabel>
                                            <Select {...register("enderecoCliente.UF", {required: "Campo obrigatório"})}>
                                                {
                                                    EstadosBrasileiros.map((estado, index) =>
                                                    <option key={index}>{estado}</option>)
                                                }
                                            </Select>
                                            {getFieldState("enderecoCliente.UF").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.UF").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                </WrapItem>
                            </Wrap>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Button type="submit" variant="solid" colorScheme="teal" isLoading={isSubmitting} marginTop={4}>Atualizar</Button>
            </FormControl>
        </Container>
    )
}

export async function getStaticPaths(){
    return {
        paths: [
            { params: { codigo: '1' } },
        ],
        fallback: "blocking",
    }
    
}


export async function getStaticProps({params}) {
    const {data} = await api.get("/clientes/"+ params.codigo)
    return {
      props: {
          cliente: data
      }
    }
  }