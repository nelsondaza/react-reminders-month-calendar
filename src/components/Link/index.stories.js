
import React from 'react'
import { text } from '@storybook/addon-knobs'

import Link from './index'

const getProps = () => ({
  children: text('children', 'link content'),
  className: text('className', ''),
  href: text('href', 'http://google.com'),
  target: text('target', '_blank'),
})

export const normal = () => (
  <Link {...getProps()} />
)
