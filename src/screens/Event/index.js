
import { getIconImageURL } from 'constants'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Button, Flag, Form } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'

import Chip from 'components/Chip'
import SimpleButton from 'components/SimpleButton'
import { citiesFetch, citiesFetchCanceled, eventsAdd } from 'actions'
import { EventSchema, RouterHistorySchema, RouterMatchSchema } from 'schemas'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './index.scss'

class Event extends React.PureComponent {
  state = {
    id: null,
    city: null,
    cityError: false,
    citySearch: '',
    color: '#3B6CF6',
    colorError: false,
    datetime: +new Date(),
    datetimeError: false,
    description: '',
    descriptionError: false,
    forecast: null,
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
          newState.city = event.city
          newState.color = event.color
          newState.datetime = event.datetime
          newState.description = event.description
          newState.forecast = event.forecast
        }
      }
      return newState
    }
    return null
  }

  componentWillUnmount() {
    this.props.citiesFetchCanceled()
  }

  getForecast = (datetime) => {
    const actualDay = +moment(+datetime).format('D')
    const list = this.props.cities?.data?.list || []
    return list.length > 0 ? list[actualDay % list.length].weather[0] : this.state.forecast
  }

  onBackClick = () => this.props.history.push('/')

  onChangeCity = () => this.setState(prevState => ({
    city: this.props.cities.data.city,
    cityError: false,
    citySearch: '',
    forecast: this.getForecast(prevState.datetime),
  }))

  onChangeCitySearch = ({ target: { value } }) => {
    this.setState({
      city: null,
      cityError: false,
      citySearch: value,
      forecast: null,
    })
    this.props.citiesFetch(value)
  }

  onChangeColor = ({ hex }) => this.setState({ color: hex, showColorPicker: false })

  onChangeDatetime = datetime => this.setState({
    datetime,
    datetimeError: false,
    forecast: this.getForecast(datetime),
  })

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
        city: newState.city,
        color: newState.color,
        datetime: +newState.datetime,
        description: newState.description,
        forecast: newState.forecast,
        id: this.state.id || +(new Date()),
      })
      this.onBackClick()
    }
  }

  renderCitySelector() {
    const { city, cityError, citySearch, forecast } = this.state
    const { cities } = this.props
    const result = cities?.data?.city
    const options = result
      ? [{
        flag: result?.country?.toLocaleLowerCase(),
        key: result?.id,
        text: result?.name,
        value: result?.id,
      }]
      : []

    if (options.length === 0 && forecast) {
      options.push({
        flag: city.country?.toLocaleLowerCase(),
        key: city.id,
        text: city.name,
        value: city.id,
      })
    }

    let noResultsMessage = `Searching for: "${cities?.key}"`
    if (citySearch.length < 3) {
      noResultsMessage = 'Use 3+ letters'
    }
    if (cities.loaded) {
      noResultsMessage = `Without results for "${cities?.key}"`
    }

    return (
      <Form.Dropdown
        clearable
        error={cityError}
        fluid
        label="City"
        name="city"
        noResultsMessage={noResultsMessage}
        onChange={this.onChangeCity}
        onSearchChange={this.onChangeCitySearch}
        options={options}
        placeholder="Search for a city name..."
        required
        search
        searchQuery={citySearch}
        selection
        value={city?.id || ''}
        width={4}
      />
    )
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
                    onChange={this.onChangeDatetime}
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
                {this.renderCitySelector()}
                {!!this.state.city && (
                  <div className={styles.weather}>
                    <b>{this.state.city.name}, {this.state.city.country} </b>
                    <Flag name={this.state.city.country.toLocaleLowerCase()} />
                    <br />
                    <img
                      alt={this.state.forecast.main}
                      height={30}
                      src={getIconImageURL(this.state.forecast.icon)}
                    />
                    <b>{this.state.forecast.main}</b> {this.state.forecast.description}
                  </div>
                )}
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
  cities: PropTypes.shape({
    data: PropTypes.shape({
      city: PropTypes.shape({}),
      list: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    key: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  citiesFetch: PropTypes.func.isRequired,
  citiesFetchCanceled: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(EventSchema).isRequired,
  eventsAdd: PropTypes.func.isRequired,
  history: RouterHistorySchema.isRequired,
  match: RouterMatchSchema.isRequired,
}

export default connect(
  ({ cities, events }) => ({ cities, events }),
  { citiesFetch, citiesFetchCanceled, eventsAdd },
)(Event)
