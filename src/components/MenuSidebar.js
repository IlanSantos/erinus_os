import Image from 'next/image'
import { Button, CloseButton } from '@chakra-ui/react'
import {MdExitToApp} from 'react-icons/md'
import {Sidebar, AvatarWrapper, OperatorName, ListItems, ListOption, MenuFooter, CloseSidebar} from '../styles/MenuSidebar'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalContext'

const MenuSidebar = () => {
    const {app_version, showSidebar, handleDeactiveSidebar} = useContext(GlobalContext)
    const {user, logged, handleLogout} = useContext(AuthContext)
    return (
        <>
            {typeof showSidebar == 'undefined' || !logged ? 
                null :
                <Sidebar show={showSidebar}>
                    <CloseSidebar>
                        <CloseButton variant="ghost" onClick={handleDeactiveSidebar}/>
                    </CloseSidebar>
                    <main>
                        <AvatarWrapper>
                            <Image src="/Avatar.svg" alt="Foto do operador" width={100} height={100} />
                        </AvatarWrapper>
                        <OperatorName>{user.nome}</OperatorName>
                        <ListItems>
                            <ListOption>Painel de solicitações</ListOption>
                            <ListOption>Alterar senha</ListOption>
                        </ListItems>
                    </main>
                    <MenuFooter>
                        <span className='description-version'>ERINUS | Versão: {app_version}</span>
                        <Button onClick={handleLogout} rightIcon={<MdExitToApp />} variant={'solid'} colorScheme="red">Sair</Button>
                    </MenuFooter>
                </Sidebar>
            }
        </>
    )
}

export default MenuSidebar