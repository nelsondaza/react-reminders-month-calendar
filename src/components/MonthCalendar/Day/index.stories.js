
import React from 'react'
import { action } from '@storybook/addon-actions'
import { array, boolean, text } from '@storybook/addon-knobs'

import m from 'mocks'

import Day from './index'

const getProps = () => ({
  active: boolean('active', false),
  className: text('className', ''),
  day: text('day', '7'),
  events: array('events', [
    m.event(1),
    m.event(2),
    m.event(3),
    m.event(4),
    m.event(5),
    m.event(6),
  ]),
  highlight: boolean('highlight', false),
  onAddEvent: action('onAddEvent'),
  onEditEvent: action('onEditEvent'),
  onRemoveEvent: action('onRemoveEvent'),
  readOnly: boolean('readOnly', false),
})

export const normal = () => (
  <Day {...getProps()} />
)
