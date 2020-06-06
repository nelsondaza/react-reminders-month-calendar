
import React from 'react'
import { boolean, number, text } from '@storybook/addon-knobs'

import ProgressBar from './index'

const getProps = () => ({
  alert: boolean('alert', false),
  ariaLabel: text('ariaLabel', ''),
  className: text('className', ''),
  inverted: boolean('inverted', false),
  tabIndex: number('tabIndex', 0),
  value: number('value', 33),
})

export const normal = () => (
  <div>
    {[0, 20, 40, 50, 60, 80, 90, 100].map(value => (
      <div key={value} style={{ marginBottom: 5 }}>
        <ProgressBar {...getProps()} value={value} />
      </div>
    ))}
    <ProgressBar {...getProps()} />
  </div>
)
