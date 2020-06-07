
import React from 'react'

import DatePicker from 'react-datepicker'
import { Button, Form } from 'semantic-ui-react'

import SimpleButton from 'components/SimpleButton'
import { RouterHistorySchema, RouterMatchSchema } from 'schemas'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './index.scss'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      city: '',
      cityError: false,
      color: '',
      colorError: false,
      datetime: new Date(+props.match.params.day),
      datetimeError: false,
      description: '',
      descriptionError: false,
    }
  }

  onBackClick = () => this.props.history.push('/')

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
    if (!newState.color) {
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
      // @todo do a real save
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
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.descriptionError}
                  label="Reminder"
                  maxLength={30}
                  name="description"
                  onChange={this.onChangeField}
                  placeholder="Description..."
                  required
                  value={this.state.description}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  error={this.state.cityError}
                  label="City"
                  name="city"
                  onChange={this.onChangeField}
                  placeholder="City..."
                  required
                  value={this.state.city}
                />
                <Form.Input
                  error={this.state.colorError}
                  label="Color"
                  name="color"
                  onChange={this.onChangeField}
                  placeholder="#RRGGBB or rgba(#, #, #, #)"
                  required
                  value={this.state.color}
                />
              </Form.Group>
              <Form.Group widths="equal">
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

Home.propTypes = {
  history: RouterHistorySchema.isRequired,
  match: RouterMatchSchema.isRequired,
}

export default Home
