
import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { ChildrenSchema } from 'schemas'

import './stories.css'

class StoriesHolder extends React.PureComponent {
  render() {
    return (
      <div className="StoriesContainer Site">
        <div className="StoriesContainer__holder">
          {this.props.children}
        </div>
      </div>
    )
  }
}

StoriesHolder.propTypes = {
  children: ChildrenSchema.isRequired,
}

export const StoriesContainer = StoriesHolder

export const StoriesEnvironment = ({ children }) => (
  <BrowserRouter>
    <StoriesContainer>{children}</StoriesContainer>
  </BrowserRouter>
)

StoriesEnvironment.propTypes = {
  children: ChildrenSchema.isRequired,
}

export const withEnvironment = story => <StoriesEnvironment>{story()}</StoriesEnvironment>
export default StoriesEnvironment
