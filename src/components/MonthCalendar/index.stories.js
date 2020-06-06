
import React from 'react'
import { text } from '@storybook/addon-knobs'

import MonthCalendar from './index'

const getProps = () => ({
  className: text('className', ''),
})

export const normal = () => (
  <MonthCalendar {...getProps()} />
)
