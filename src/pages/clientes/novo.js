import React from 'react'
import { 
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { EstadosBrasileiros } from "../../utils/VariaveisAuxiliares";
import api from '../../services/api'

export default function NovoCliente(){
    const toast = useToast()
    const {register, handleSubmit , getValues, getFieldState, setValue, clearErrors, formState: {isSubmitting, errors, isValid}} = useForm({defaultValues: {
        nomeCliente: "",
        cadFederalCliente: "",
        telefoneCliente: "",
        celularCliente: "",
        emailCliente: "",
        enderecoCliente: {
            CEP: "",
            UF: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            complemento: ""
        }
    }})
    const criarCliente = async (form) => {
        try{
            await api.post("/clientes", form)
            toast({
                title: "Sucesso!",
                description: "Cliente cadastrado com sucesso.",
                status: "success",
                duration: 3500,
                isClosable: true,
            })
        }catch(error){
            toast({
                title: "Erro!",
                description: error.response ? error.response.data.mensagem : error.toString(),
                status: "error",
                duration: 3500,
                isClosable: true,
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
                clearErrors("enderecoCliente")
            }
        }catch{

        }
    }
    return (
        <Container marginTop="7" maxW="container.xl">
            <Head>
                <title>ERINUS O.S | Cadastro de clientes</title>
            </Head>
            <form className="background-white" onSubmit={handleSubmit(criarCliente)}>
                    <Heading fontFamily="Mohave" fontWeight={500} color="#00135b" marginBottom="5">Cadastro de cliente</Heading>
                    <Box display="flex" flexWrap={'wrap'} gap="3">
                        <Box w={['100%', '48.5%', '40%', '25%']}>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl isInvalid={errors.nomeCliente}>
                                <Input {...register("nomeCliente", {required: "Campo obrigatório", minLength: {value: 3, message: "Necessário no mínimo 3 caractéres."}})} placeholder="Ex: José Couto de Souza"/>
                                {errors.nomeCliente && <FormErrorMessage >{errors.nomeCliente.message}</FormErrorMessage>}
                            </FormControl>
                        </Box>
                        <Box w={['100%', '48.5%', '33%', '25%']}>
                            <FormLabel>CPF/CNPJ:</FormLabel>
                            <Input {...register("cadFederalCliente")} type="text" placeholder="CPF/CNPJ"/>
                        </Box>
                    </Box>
                    <Heading marginY={3} fontSize="3xl" fontFamily="Mohave" fontWeight="500">Contato</Heading>
                    <Box display="flex" flexWrap={'wrap'} gap="3">
                        <Box w={['100%', '48.5%', '33%', '25%']}>
                            <FormLabel>Celular:</FormLabel>
                            <Input {...register("celularCliente")} type="tel" placeholder="(71) 9 9999-9999" />
                        </Box>
                        <Box w={['100%', '48.5%', '33%', '25%']}>
                            <FormLabel>Telefone:</FormLabel>
                            <Input {...register("telefoneCliente")} type="tel" placeholder="(71) 9 9999-9999" />
                        </Box>
                        <Box w={['100%', '48.5%', '33%', '25%']}>
                            <FormLabel>E-mail:</FormLabel>
                            <Input {...register("emailCliente")} type="email" placeholder="Ex: jose_couto@bol.com" />
                        </Box>
                    </Box>
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
                                <Box display='flex' flexWrap='wrap' gap="3">
                                    <Box flexShrink={0} w={['100%', '48.5%', '33%', '20%']}>
                                        <FormControl isInvalid={getFieldState("enderecoCliente.CEP").invalid}>
                                            <FormLabel>CEP:</FormLabel>
                                            <Input {...register("enderecoCliente.CEP", {required: "Campo obrigatório", minLength: {value: 8, message: "Necessário no mínimo 8 caractéres."}})} onBlur={buscaEndereco} type="text" placeholder="Ex: 41025-100" />
                                            {getFieldState("enderecoCliente.CEP").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.CEP").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                    <Box w={['100%', '48.5%', '45%', '40%']}>
                                        <FormControl isInvalid={getFieldState("enderecoCliente.rua").invalid}>
                                            <FormLabel>Rua:</FormLabel>
                                            <Input {...register("enderecoCliente.rua", {required: "Campo obrigatório", minLength: {value: 3, message: "Necessário no mínimo 3 caractéres."}})} type="text" placeholder="Rua" />
                                            {getFieldState("enderecoCliente.rua").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.rua").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                    <Box w={['100%', '48.5%', '15%', '10%']}>
                                        <FormLabel>Número:</FormLabel>
                                        <Input {...register("enderecoCliente.numero")} type="text" placeholder="Número" />
                                    </Box>
                                    <Box w={['100%', '48.5%', '15%', '15%']}>
                                        <FormLabel>Complemento:</FormLabel>
                                        <Input {...register("enderecoCliente.complemento")} type="text" placeholder="Complemento" />
                                    </Box>
                                </Box>
                                
                                <Box marginTop={3} display="flex" flexWrap="wrap" gap="3">
                                    <Box w={['100%', '48.5%', '45%', '40%']}>
                                        <FormControl isInvalid={getFieldState("enderecoCliente.bairro").invalid}>
                                            <FormLabel>Bairro:</FormLabel>
                                            <Input {...register("enderecoCliente.bairro", {required: "Campo obrigatório"})} type="text" placeholder="Bairro" />
                                            {getFieldState("enderecoCliente.bairro").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.bairro").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                    <Box w={['100%', '48.5%', '33%', '20%']}>
                                        <FormControl isInvalid={getFieldState("enderecoCliente.cidade").invalid}>
                                            <FormLabel>Cidade:</FormLabel>
                                            <Input {...register("enderecoCliente.cidade", {required: "Campo obrigatório"})} type="text" placeholder="Cidade" />
                                            {getFieldState("enderecoCliente.cidade").invalid && <FormErrorMessage >{getFieldState("enderecoCliente.cidade").error.message}</FormErrorMessage>}
                                        </FormControl>
                                    </Box>
                                    <Box w={['100%', '48.5%', '15%', '10%']}>
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
                                </Box>
                                <Box display='flex' flexWrap='wrap' gap='4'>
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                <Button variant="solid" colorScheme="teal" marginTop={3} type="submit" isLoading={isSubmitting}>Cadastrar</Button>
            </form>
        </Container>
    )
}