import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

// types
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size: 'sm' | 'lg' | 'regular'
  outline: boolean
  children?: ReactNode | string
  fullWidth: boolean
  href?: string
  color:
    | 'facebook'
    | 'twitter'
    | 'instagram'
    | 'github'
    | 'pinterest'
    | 'youtube'
    | 'vimeo'
    | 'slack'
    | 'dribbble'
    | 'reddit'
    | 'tumblr'
    | 'linkedin'
    | 'white'
    | 'light'
    | 'dark'
    | 'slate'
    | 'red'
    | 'orange'
    | 'amber'
    | 'emerald'
    | 'teal'
    | 'sky'
    | 'indigo'
    | 'purple'
    | 'pink'
}

const Button = ({ outline, size, color, children, fullWidth, href, ...rest }: Props) => {
  const sizes: any = {
    sm: 'text-xs px-3 py-2 shadow hover:shadow-md rounded-md',
    regular: 'text-sm px-6 py-2 shadow hover:shadow-lg rounded-md',
    lg: 'text-sm px-6 py-3 shadow-md hover:shadow-lg rounded-lg',
  }
  const colors: any = {
    facebook:
      'text-white bg-facebook-regular border-facebook-regular active:bg-facebook-active active:border-facebook-active',
    'facebook-outline':
      'text-facebook-regular border-facebook-regular active:bg-facebook-active active:border-facebook-active active:text-white',
    twitter:
      'text-white bg-twitter-regular border-twitter-regular active:bg-twitter-active active:border-twitter-active',
    'twitter-outline':
      'text-twitter-regular border-twitter-regular active:bg-twitter-active active:border-twitter-active active:text-white',
    instagram:
      'text-white bg-instagram-regular border-instagram-regular active:bg-instagram-active active:border-instagram-active',
    'instagram-outline':
      'text-instagram-regular border-instagram-regular active:bg-instagram-active active:border-instagram-active active:text-white',
    github:
      'text-white bg-github-regular border-github-regular active:bg-github-active active:border-github-active',
    'github-outline':
      'text-github-regular border-github-regular active:bg-github-active active:border-github-active active:text-white',
    pinterest:
      'text-white bg-pinterest-regular border-pinterest-regular active:bg-pinterest-active active:border-pinterest-active',
    'pinterest-outline':
      'text-pinterest-regular border-pinterest-regular active:bg-pinterest-active active:border-pinterest-active active:text-white',
    youtube:
      'text-white bg-youtube-regular border-youtube-regular active:bg-youtube-active active:border-youtube-active',
    'youtube-outline':
      'text-youtube-regular border-youtube-regular active:bg-youtube-active active:border-youtube-active active:text-white',
    vimeo:
      'text-white bg-vimeo-regular border-vimeo-regular active:bg-vimeo-active active:border-vimeo-active',
    'vimeo-outline':
      'text-vimeo-regular border-vimeo-regular active:bg-vimeo-active active:border-vimeo-active active:text-white',
    slack:
      'text-white bg-slack-regular border-slack-regular active:bg-slack-active active:border-slack-active',
    'slack-outline':
      'text-slack-regular border-slack-regular active:bg-slack-active active:border-slack-active active:text-white',
    dribbble:
      'text-white bg-dribbble-regular border-dribbble-regular active:bg-dribbble-active active:border-dribbble-active',
    'dribbble-outline':
      'text-dribbble-regular border-dribbble-regular active:bg-dribbble-active active:border-dribbble-active active:text-white',
    reddit:
      'text-white bg-reddit-regular border-reddit-regular active:bg-reddit-active active:border-reddit-active',
    'reddit-outline':
      'text-reddit-regular border-reddit-regular active:bg-reddit-active active:border-reddit-active active:text-white',
    tumblr:
      'text-white bg-tumblr-regular border-tumblr-regular active:bg-tumblr-active active:border-tumblr-active',
    'tumblr-outline':
      'text-tumblr-regular border-tumblr-regular active:bg-tumblr-active active:border-tumblr-active active:text-white',
    linkedin:
      'text-white bg-linkedin-regular border-linkedin-regular active:bg-linkedin-active active:border-linkedin-active',
    'linkedin-outline':
      'text-linkedin-regular border-linkedin-regular active:bg-linkedin-active active:border-linkedin-active active:text-white',
    white: 'text-slate-800 bg-white border-white active:bg-slate-100 active:border-slate-100',
    'white-outline':
      'text-white border-white active:bg-slate-100 active:border-slate-100 active:text-slate-800',
    light:
      'text-slate-800 bg-slate-200 border-slate-200 active:bg-slate-300 active:border-slate-300',
    'light-outline':
      'text-slate-200 border-slate-200 active:bg-slate-300 active:border-slate-300 active:text-slate-800',
    dark: 'text-white bg-slate-800 border-slate-800 active:bg-slate-900 active:border-slate-900',
    'dark-outline':
      'text-slate-800 border-slate-800 active:bg-slate-900 active:border-slate-900 active:text-white',
    slate: 'text-white bg-slate-500 border-slate-500 active:bg-slate-600 active:border-slate-600',
    'slate-outline':
      'text-slate-500 border-slate-500 active:bg-slate-600 active:border-slate-600 active:text-white',
    red: 'text-white bg-red-500 border-red-500 active:bg-red-600 active:border-red-600',
    'red-outline':
      'text-red-500 border-red-500 active:bg-red-600 active:border-red-600 active:text-white',
    orange:
      'text-white bg-orange-500 border-orange-500 active:bg-orange-600 active:border-orange-600',
    'orange-outline':
      'text-orange-500 border-orange-500 active:bg-orange-600 active:border-orange-600 active:text-white',
    amber: 'text-white bg-amber-500 border-amber-500 active:bg-amber-600 active:border-amber-600',
    'amber-outline':
      'text-amber-500 border-amber-500 active:bg-amber-600 active:border-amber-600 active:text-white',
    emerald:
      'text-white bg-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600',
    'emerald-outline':
      'text-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600 active:text-white',
    teal: 'text-white bg-teal-500 border-teal-500 active:bg-teal-600 active:border-teal-600',
    'teal-outline':
      'text-teal-500 border-teal-500 active:bg-teal-600 active:border-teal-600 active:text-white',
    sky: 'text-white bg-sky-500 border-sky-500 active:bg-sky-600 active:border-sky-600',
    'sky-outline':
      'text-sky-500 border-sky-500 active:bg-sky-600 active:border-sky-600 active:text-white',
    indigo:
      'text-white bg-indigo-500 border-indigo-500 active:bg-indigo-600 active:border-indigo-600',
    'indigo-outline':
      'text-indigo-500 border-indigo-500 active:bg-indigo-600 active:border-indigo-600 active:text-white',
    purple:
      'text-white bg-purple-500 border-purple-500 active:bg-purple-600 active:border-purple-600',
    'purple-outline':
      'text-purple-500 border-purple-500 active:bg-purple-600 active:border-purple-600 active:text-white',
    pink: 'text-white bg-pink-500 border-pink-500 active:bg-pink-600 active:border-pink-600',
    'pink-outline':
      'text-pink-500 border-pink-500 active:bg-pink-600 active:border-pink-600 active:text-white',
  }
  let className =
    'inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2 '
  className = className + ' ' + colors[color + (outline ? '-outline' : '')]
  className = className + ' ' + sizes[size]
  if (fullWidth) {
    className = className + ' w-full text-center'
  }

  return href ? (
    <Link href={href ?? '#'} rel="stylesheet">
      {/* 
       // @ts-ignore */}
      <a {...rest} className={className}>
        {children}
      </a>
    </Link>
  ) : (
    <button {...rest} className={className}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  outline: false,
  color: 'slate',
  fullWidth: false,
  size: 'regular',
}

Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg', 'regular']),
  outline: PropTypes.bool,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  color: PropTypes.oneOf([
    'facebook',
    'twitter',
    'instagram',
    'github',
    'pinterest',
    'youtube',
    'vimeo',
    'slack',
    'dribbble',
    'reddit',
    'tumblr',
    'linkedin',
    'white',
    'light',
    'dark',
    'slate',
    'red',
    'orange',
    'amber',
    'emerald',
    'teal',
    'sky',
    'indigo',
    'purple',
    'pink',
  ]),
}

export default Button
