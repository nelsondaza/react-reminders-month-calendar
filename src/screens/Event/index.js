
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DatePicker from 'react-datepicker'
import { Button, Form } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'

import Chip from 'components/Chip'
import SimpleButton from 'components/SimpleButton'
import { eventsAdd } from 'actions'
import { EventSchema, RouterHistorySchema, RouterMatchSchema } from 'schemas'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './index.scss'

class Event extends React.PureComponent {
  state = {
    id: 0,
    city: '',
    cityError: false,
    color: '#3B6CF6',
    colorError: false,
    datetime: +new Date(),
    datetimeError: false,
    description: '',
    descriptionError: false,
    showColorPicker: false,
  }

  static getDerivedStateFromProps(props, state) {
    const id = +props.match.params.id || 0

    if (id !== state.id) {
      const newState = {
        id,
        datetime: new Date(+props.match.params.day),
      }

      if (id) {
        const event = props.events.find(e => e.id === id)
        if (event) {
          newState.city = event.city.name
          newState.color = event.color
          newState.datetime = event.datetime
          newState.description = event.description
        }
      }
      return newState
    }
    return null
  }

  onBackClick = () => this.props.history.push('/')

  onChangeColor = ({ hex }) => this.setState({ color: hex, showColorPicker: false })

  onChangeField = ({ target: { name, value } }) => this.setState({
    [name]: value,
    [`${name}Error`]: false,
  })

  onSave = (evt) => {
    evt.preventDefault()

    const newState = { ...this.state }
    let errors = 0

    if (!newState.city) {
      newState.cityError = true
      errors += 1
    }
    if (!newState.color || !newState.color.match(/^#([0-9a-f]{6})$/i)) {
      newState.colorError = true
      errors += 1
    }
    if (!newState.description) {
      newState.descriptionError = true
      errors += 1
    }

    if (errors) {
      this.setState(newState)
    } else {
      this.props.eventsAdd({
        city: {
          country: 'CO',
          id: +(new Date()),
          name: newState.city,
        },
        color: newState.color,
        datetime: +newState.datetime,
        description: newState.description,
        forecast: {
          description: 'broken clouds',
          icon: '04d',
          id: +(new Date()),
          name: 'Clouds',
        },
        id: this.state.id || +(new Date()),
      })
      this.onBackClick()
    }
  }

  render() {
    const format = 'yyyy-MM-dd HH:mm'
    return (
      <div>
        <div className={styles.body}>
          <h1>Reminder creation</h1>
          <div>
            <SimpleButton onClick={this.onBackClick} value="< calendar" />
          </div>
          <div>
            <Form>
              <Form.Group widths="equal">
                <Form.Field required>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="datetime">Date & Time</label>
                  <DatePicker
                    containerClassName="ui input"
                    customInput={(
                      <input
                        id="datetime"
                        name="datetime"
                        placeholder={format}
                      />
                    )}
                    dateFormat={format}
                    onChange={datetime => this.setState({ datetime, datetimeError: false })}
                    selected={this.state.datetime}
                    showTimeSelect
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  error={this.state.descriptionError}
                  label="Reminder"
                  maxLength={30}
                  name="description"
                  onChange={this.onChangeField}
                  placeholder="Description..."
                  required
                  value={this.state.description}
                  width={4}
                />
                <Form.Field required width={4}>
                  {this.state.showColorPicker && (
                    <>
                      <div
                        className={styles.cover}
                        onClick={() => this.setState({ showColorPicker: false })}
                        onKeyPress={() => this.setState({ showColorPicker: false })}
                        role="link"
                        tabIndex={-1}
                      />
                      <div className={styles.colorPicker}>
                        <SketchPicker
                          color={this.state.color}
                          onChangeComplete={this.onChangeColor}
                          disableAlpha
                        />
                      </div>
                    </>
                  )}
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="color2">Color</label>
                  <Chip
                    ariaLabel={this.state.description}
                    style={{ color: this.state.color || 'inherit' }}
                    onClick={() => this.setState({ showColorPicker: true })}
                  >
                    {this.state.description || 'Color Preview'}
                  </Chip>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  error={this.state.cityError}
                  label="City"
                  name="city"
                  onChange={this.onChangeField}
                  placeholder="City..."
                  required
                  value={this.state.city}
                  width={4}
                />
              </Form.Group>
              <Form.Group>
                <Button onClick={this.onSave} primary>Save</Button>
                <Button onClick={this.onBackClick}>Cancel</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
        <footer className={styles.footer}>
          ...
        </footer>
      </div>
    )
  }
}

Event.propTypes = {
  events: PropTypes.arrayOf(EventSchema).isRequired,
  eventsAdd: PropTypes.func.isRequired,
  history: RouterHistorySchema.isRequired,
  match: RouterMatchSchema.isRequired,
}

export default connect(
  ({ events }) => ({ events }),
  { eventsAdd },
)(Event)
