import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// OPTIONS: protected page by middleware
export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   const session: any = await getToken({ req: request })
  //   if (session.user.role.name !== 'admin') {
  //     console.log(session.user.role.name !== 'admin')
  //     return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  //   }
  //   return NextResponse.next()
  // }
}

export const config = { matcher: ['/admin/:path*'] }
