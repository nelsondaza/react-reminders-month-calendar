
import React from 'react'
import { boolean, number, text } from '@storybook/addon-knobs'

import Day from './index'

const getProps = () => ({
  className: text('className', ''),
  day: number('number', 7),
  readOnly: boolean('readOnly', false),
})

export const normal = () => (
  <Day {...getProps()} />
)
