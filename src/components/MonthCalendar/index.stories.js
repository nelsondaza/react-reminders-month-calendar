
import React from 'react'

import { action } from '@storybook/addon-actions'
import { array, text } from '@storybook/addon-knobs'

import m from 'mocks'

import MonthCalendar from './index'

const today = +(new Date())
const day = (24 * 60 * 60 * 1000)

const getProps = () => ({
  className: text('className', ''),
  events: array('events', [
    m.event(1, { datetime: today + (day) }),
    m.event(2, { datetime: today - (day) }),
    m.event(3, { datetime: today + (day * 2) }),
    m.event(4, { datetime: today - (day * 2) }),
    m.event(5, { datetime: today + (day * 3) }),
    m.event(6, { datetime: today + (day * 3) }),
    m.event(7, { datetime: today + (day * 3) }),
    m.event(8, { datetime: today + (day * 3) }),
  ]),
  onAddEvent: action('onAddEvent'),
})

export const normal = () => (
  <MonthCalendar {...getProps()} />
)
