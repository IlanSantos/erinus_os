import styled from 'styled-components'

export const CardMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 466px;
    min-height: 100%;
    padding: .75rem;
    border-radius: .5rem;
    background-color: white;
    filter: drop-shadow(1px 1px 1px rgba(0,0,0, .300));
`

export const CardBody = styled.div`
    display: block;
    margin-bottom: 15px;
`

export const CardTitle = styled.h3`
    color: #00135b;
    font-size: 20pt;
    font-weight: 500;
`

export const CardDescription = styled.p`
    color: rgba(0,0,0, .800);
    font-size: 16pt;
    font-weight: 400;
`

export const CardFooter = styled.footer`
    display: flex;
    justify-content: flex-end;
`