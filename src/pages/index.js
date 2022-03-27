import { useContext } from 'react'
import { Box, Container, Heading, Text, Wrap } from '@chakra-ui/react'
import Head from 'next/head'
import Card from '../components/Card'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Head>
                <title>ERINUS | O.S</title>
                <meta name="description" content="Solução em registros de ordens de serviço." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Container marginTop="7" maxW="container.xl">
                    <Text fontSize="24pt" color="#00135b">Seja bem vindo <b>{user.nome}</b>.</Text>
                </Container>
            </header>
            <main>
                <Container marginTop="7" maxW="container.xl">
                    <Wrap>
                        <Box w={["100%", "48.5%", "33%", "25%"]}>
                            <Card title="Solicitações abertas" description="Solicitações abertas pendentes" redirectTo={"/solicitacao/aberto"}/>
                        </Box>
                        <Box w={["100%", "48.5%", "33%", "25%"]}>
                            <Card title="Ordem de serviço" description="Nova ordem de serviço" redirectTo={"/solicitacao/novo"}/>
                        </Box>
                    </Wrap>
                </Container>
                <Container as="section" marginTop="7" maxW="container.xl">
                    <Heading size="lg" color="#00135b">Clientes</Heading>
                    <Wrap marginTop="3">
                        <Box w={["100%", "48.5%", "33%", "25%"]}>
                            <Card title="Busca de clientes" description="Realizar a busca de um novo cliente." />
                        </Box>
                        <Box w={["100%", "48.5%", "33%", "25%"]}>
                            <Card title="Cadastro de clientes" description="Cadastro de um novo cliente" width="lg" />
                        </Box>
                    </Wrap>
                </Container>
            </main>
        </div>
    )
}
