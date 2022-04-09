import { useRouter } from 'next/router'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import Topbar from '../components/layouts/Topbar'
import MenuSidebar from '../components/MenuSidebar'
import { GlobalProvider } from '../context/GlobalContext'
import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'

const theme = extendTheme({
  breakpoints : {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px'
  },
  fonts: {
    body: "Mohave, sans-serif"
  }
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <AuthProvider>
            {router.pathname !== "/login" ? <Topbar /> : null }
            <MenuSidebar />
            <Component {...pageProps} />
        </AuthProvider>
      </GlobalProvider>
    </ChakraProvider>
  )
}

export default MyApp
