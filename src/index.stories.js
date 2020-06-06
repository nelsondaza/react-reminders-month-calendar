
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import README from '../README.md'
import REQUIREMENTS from '../docs/REQUIREMENTS.md'

storiesOf(' |Nelson Daza', module)
  .add('README', doc(README))
  .add('REQUIREMENTS', doc(REQUIREMENTS))
