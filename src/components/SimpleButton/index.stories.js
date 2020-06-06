
import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { iconNames } from 'components/Icon'

import SimpleButton from './index'

const getProps = () => ({
  ariaLabel: text('ariaLabel', ''),
  children: text('children', 'simple button'),
  className: text('className', ''),
  icon: select('icon', ['', ...iconNames], ''),
  itemsDirection: select('itemsDirection', ['ltr', 'rtl', 'ttb', 'btt'], 'ltr'),
  onClick: action('onClick'),
  primary: boolean('primary', false),
  secondary: boolean('secondary', false),
  tertiary: boolean('tertiary', false),
  value: text('value', ''),
})

export const normal = () => (
  <div>
    <SimpleButton primary>Primary</SimpleButton>
    <br />
    <SimpleButton secondary>Secondary</SimpleButton>
    <br />
    <SimpleButton tertiary>Tertiary</SimpleButton>
    <br />
    Controlled: <SimpleButton {...getProps()} />
  </div>
)

export const icon = () => (
  <div>
    Primary: <SimpleButton primary icon="moon" />
    <br />
    Secondary: <SimpleButton secondary icon="sun" />
    <br />
    Tertiary: <SimpleButton tertiary icon="moon" />
    <br />
    Left Icon: <SimpleButton icon="sun">Left Icon</SimpleButton>
    <br />
    Right Icon: <SimpleButton icon="moon" itemsDirection="rtl">Right Icon</SimpleButton>
    <br />
    Top Icon: <SimpleButton icon="sun" itemsDirection="ttb">Top Icon</SimpleButton>
    <br />
    Bottom Icon: <SimpleButton icon="moon" itemsDirection="btt">Bottom Icon</SimpleButton>
    <br />
    Controlled: <SimpleButton {...getProps()} />
  </div>
)
