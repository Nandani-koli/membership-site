import { NextResponse } from 'next/server'
import jwtDecode from 'jwt-decode';

export function middleware(request) {

  const path = request.nextUrl.pathname

  const isPublicPath = path === '/member/login' || path === '/member/register'

  const isadmin = path.startsWith('/member/admin') || path.startsWith('/api/users') || path.startsWith('/api/orders')
  const isuser = path.startsWith('/member/users')
  const iscommon = path.startsWith('/member/edituser') 
  const ispro = path.startsWith('/member/users/media');
  const isplus = path.startsWith('/member/users/documents');
  const isbasic = path.startsWith('/member/edituser')
  
  const token = request.cookies.get('token')?.value || '';

  if ((isadmin || isuser || iscommon) && !token) {
    return NextResponse.redirect(new URL('/member/login', request.url))
  }

  if (token) {

    var data = jwtDecode(token);

    if (data.role == 1) {
      if (isPublicPath) {
        return NextResponse.redirect(new URL('/member/admin', request.url))
      } else if (isuser) {
        return NextResponse.redirect(new URL('/notfound', request.url))
      }
    }
    else if (data.role == 0) {
      if (isPublicPath) {
        return NextResponse.redirect(new URL('/member/users', request.url))
      }
      else if (isadmin) {
        return NextResponse.redirect(new URL('/notfound', request.url))
      }
      else if (((data.subscriptionlevel == 2 || data.subscriptionlevel == 1 || data.subscriptionlevel == 0) && ispro) 
      || ((data.subscriptionlevel == 0 || data.subscriptionlevel == 1) && isplus) 
      || (data.subscriptionlevel == 0 && isbasic)) {
        return NextResponse.redirect(new URL('/notfound', request.url))
      }
    }
  }
}

