
import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'

import Day from './index'

const getProps = () => ({
  className: text('className', ''),
  day: text('day', '7'),
  highlight: boolean('highlight', false),
  readOnly: boolean('readOnly', false),
})

export const normal = () => (
  <Day {...getProps()} />
)
