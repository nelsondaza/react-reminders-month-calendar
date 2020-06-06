
import path from 'path'
import { addDecorator, addParameters, configure, storiesOf } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { withTests } from '@storybook/addon-jest'

// eslint-disable-next-line import/no-unresolved
import results from '../../dist/coverage/test-results.json'
import { withEnvironment } from './stories'

addParameters({
  backgrounds: [
    { name: 'Dark', value: '#2F4050' },
    { name: 'Darkest', value: '#232C3E' },
    { name: 'Light', value: '#F3F4F5' },
    { name: 'Lightest', value: '#FFFFFF', default: true },
  ],
  options: {
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\//,
  },
})

configureActions({ depth: 3, limit: 10 })

// Add some global decorators
addDecorator(withA11y)
addDecorator(withEnvironment)
addDecorator(withKnobs)
addDecorator(withTests({ results, filesExt: '' }))

function getComponentNameFromFile(filePath) {
  const parts = filePath
    .split(path.sep)
    .filter(folderName => folderName !== 'src' && !folderName.startsWith('index') && folderName !== '.' && folderName !== '..')
    .map(folderName => folderName.replace(/\.(stories|tests)\.jsx?$/, ''))

  return `${parts.shift()}|${parts.join('/')}`
}

function loadStories() {
  const stories = {}
  const tests = {}

  const storiesContext = require.context('../../src', true, /\.stories\.jsx?$/)
  storiesContext.keys().forEach((filePath) => {
    stories[getComponentNameFromFile(filePath)] = storiesContext(filePath)
  })

  const testsContext = require.context('../../src', true, /\.tests\.jsx?$/)
  testsContext.keys().forEach((filePath) => {
    tests[getComponentNameFromFile(filePath)] = path.join('./src/', filePath)
  })

  Object.keys(stories)
    .forEach((componentName) => {
      const storyPage = storiesOf(componentName, module)
      if (tests[componentName]) {
        storyPage.addParameters({
          jest: [tests[componentName]],
        })
      }

      Object.keys(stories[componentName])
        .forEach((storyName) => {
          storyPage.add(storyName, stories[componentName][storyName])
        })
    })
}

configure(loadStories, module)
