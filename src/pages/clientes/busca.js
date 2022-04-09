import { 
    Container, Heading,
    Table, TableContainer, TableCaption, Thead, Tr, Th, Tbody, Td, useToast, Tfoot, Button, Input, Box, FormLabel, InputGroup, InputLeftElement, InputRightElement, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import moment from 'moment'
import qs from 'qs'
import api from '../../services/api'
import { useForm } from 'react-hook-form'


export default function BuscaClientes({clientes}){
    const [listaClientes, setClientes] = useState(clientes || [])
    const {register, handleSubmit} = useForm()
    const toast = useToast()

    const buscaClientes = async (form) => {
        try{
            const request = await api.get("/clientes"+'?'+ qs.stringify(form))
            setClientes(request.data)
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

    return (
        <>
            <Head>
                <title>ERINUS | Busca de clientes</title>
            </Head>
        
            <Container className="background-white" marginTop={7} maxW="container.xl">
                <Heading fontSize="4xl" fontFamily="Mohave">Busca de clientes</Heading>
                <form onSubmit={handleSubmit(buscaClientes)}>
                    <Box marginTop={3} display="flex" gap={2} alignItems="flex-end">
                        <Box w={['100%', '50%', '25%', '25%']}> 
                            <FormLabel>Filtro</FormLabel>
                            <Input {...register("nome")}></Input>
                        </Box>
                        <Button type="submit" colorScheme="teal">Buscar</Button>
                    </Box>
                </form>
                <TableContainer marginTop={5}>
                    <Table variant='striped' size="md">
                        <TableCaption>Lista de clientes</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Código</Th>
                                <Th>Nome</Th>
                                <Th>Telefone</Th>
                                <Th>Celular</Th>
                                <Th>E-mail</Th>
                                <Th>Criado em</Th>
                                <Th>Ação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                listaClientes.map((value) => {
                                    return (    
                                    <Tr key={value.codigo}>
                                        <Td>{value.codigo}</Td>
                                        <Td>{value.nome}</Td>
                                        <Td>{value.telefone}</Td>
                                        <Td>{value.celular}</Td>
                                        <Td>{value.email}</Td>
                                        <Td>{moment(value.created_at).format("DD/MM/YYYY")}</Td>
                                        <Td>
                                            <Link href={"/clientes/"+value.codigo} passHref>
                                                <Button as="a" bg="blue.500" color="white" fontWeight={400}>Visitar</Button>
                                            </Link>
                                        </Td>
                                    </Tr>
                                    )
                                })
                            }
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Código</Th>
                                <Th>Nome</Th>
                                <Th>Telefone</Th>
                                <Th>Celular</Th>
                                <Th>E-mail</Th>
                                <Th>Criado em</Th>
                                <Th>Ação</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export async function getStaticProps(context) {
    const {data} = await api.get("/clientes")
    console.log(data)
    return {
      props: {
          clientes: data
      }
    }
  }