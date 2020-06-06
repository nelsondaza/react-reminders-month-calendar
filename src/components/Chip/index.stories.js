
import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Chip from './index'

const getProps = () => ({
  ariaLabel: text('ariaLabel', 'Chip Label'),
  children: text('children', 'Chip content'),
  className: text('className', ''),
  disabled: boolean('disabled', false),
  onClick: action('onClick'),
  value: text('value', ''),
})

export const normal = () => (
  <div>
    Normal Chip <Chip {...getProps()} /> here.
    <br />
    Disabled Chip <Chip {...getProps()} disabled /> here.
    <br />
    Active Chip <Chip {...getProps()} active /> here.
    <br />
    Blue Chip <Chip {...getProps()} style={{ color: '#3B6CF6' }} /> here.
  </div>
)
