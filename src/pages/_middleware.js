import {NextResponse} from 'next/server'

export function middleware(request){
    let response = NextResponse.next()
    const path = request.nextUrl.pathname
    if(path == "/api/autenticacao"){
        return response
    }
    else if(!request.cookies["erinus-S_ID"] && !request.cookies["erinus-S_TOKEN"] && path != "/login"){
        return NextResponse.redirect("/login")
    }
    return response
}