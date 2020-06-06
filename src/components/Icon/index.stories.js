
import React from 'react'
import { select, text } from '@storybook/addon-knobs'

import Icon, { iconNames } from './index'

import styles from './index.stories.scss'

const getProps = () => ({
  ariaLabel: text('ariaLabel', ''),
  className: text('className', ''),
  name: select('name', iconNames, iconNames[0]),
})

export const list = () => (
  <div className={styles.storiesContainer}>
    {iconNames.map(name => (
      <div className={styles.storiesBox} key={name} title={name}>
        <Icon className={styles.storiesIcon} name={name} />
        <div className={styles.storiesName}>{name}</div>
      </div>
    ))}
  </div>
)

export const normal = () => (
  <div className={styles.storiesContainer}>
    <div className={styles.storiesBox}>
      <Icon {...getProps()} />
    </div>
  </div>
)
