
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import INSTALL from '../docs/INSTALL.md'
import README from '../README.md'

storiesOf(' |Nelson Daza', module)
  .add('README', doc(README))
  .add('INSTALL', doc(INSTALL))
