
import m from 'mocks'

import Connected, { Pure as Component } from './index'
import styles from './index.scss'

describe('screens::Event', () => {
  const tc = createTestComponent(
    Component,
    {
      cities: {
        key: 'search key',
      },
      citiesFetch: jest.fn(),
      citiesFetchCanceled: jest.fn(),
      events: [m.event(1)],
      eventsAdd: jest.fn(),
      history: {
        location: {},
        push: jest.fn(),
        replace: jest.fn(),
        goBack: jest.fn(),
      },
      match: { params: { day: +(new Date()) } },
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe('div')
  })

  it('unmounting will call citiesFetchCanceled', () => {
    expectChange({
      fn: () => tc.mounted.unmount(),
      of: () => tc.getProp('citiesFetchCanceled').mock.calls.length,
      by: 1,
    })
  })

  it('shows a color picker when click on Chip', () => {
    expectBecameTrue({
      fn: () => tc.scope.find('Chip').simulate('click'),
      of: () => tc.scope.find(`.${styles.colorPicker}`).exists(),
    })
  })

  it('hides the color picker when click outside', () => {
    tc.scope.find('Chip').simulate('click')
    expectBecameFalse({
      fn: () => tc.scope.find(`.${styles.cover}`).simulate('click'),
      of: () => tc.scope.find(`.${styles.colorPicker}`).exists(),
    })
  })

  it('shows a weather details when an event is loaded', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ match: { params: { id: 1 } } }),
      of: () => tc.scope.find(`.${styles.weather}`).exists(),
    })
  })

  it('shows a default event when id is not found', () => {
    tc.setProps({ match: { params: { id: 1 } } })
    expectNoChange({
      fn: () => tc.setProps({ match: { params: { id: 111111 } } }),
      of: () => tc.scope.find('FormInput').filter({ label: 'Reminder' }).props().value,
      from: 'Event description',
    })
  })

  it('can use custom color', () => {
    tc.scope.find('Chip').simulate('click')
    expectChange({
      fn: () => tc.scope.find(`.${styles.colorPicker}`).props().children.props
        .onChangeComplete({ hex: '#123456' }),
      of: () => tc.scope.find('Chip').props().style.color,
      from: '#3B6CF6',
      to: '#123456',
    })
  })

  it('can use custom date', () => {
    const date = new Date()
    expectBecameTrue({
      fn: () => tc.scope.find('FormField').filter({ id: 'datetime_field' }).props().children[1].props
        .onChange(date),
      of: () => tc.scope.find('FormField').filter({ id: 'datetime_field' }).props().children[1].props
        .selected === date,
    })
  })

  it('can use custom description', () => {
    expectBecameTrue({
      fn: () => tc.scope.find('FormInput').filter({ label: 'Reminder' })
        .simulate('change', { target: { value: 'event' } }),
      of: () => tc.scope.find('FormInput').filter({ label: 'Reminder' }).props().value === 'event',
    })
  })

  it('navigates back in history on cancel', () => {
    expectChange({
      fn: () => tc.scope.find('SimpleButton').filter({ value: '< calendar' }).simulate('click'),
      of: () => tc.getProp('history').goBack.mock.calls.length,
      by: 1,
    })
  })

  describe('search city', () => {
    it('shows a message for 3+ chars', () => {
      expectChange({
        fn: () => tc.scope.find('FormDropdown')
          .simulate('searchChange', { target: { value: 'abcd' } }),
        of: () => tc.scope.find('FormDropdown').props().noResultsMessage,
        from: 'Use 3+ letters',
        to: 'Searching for: "search key"',
      })
    })

    it('shows a message when no results', () => {
      expectChange({
        fn: () => tc.setProps({ cities: { loaded: true, key: 'key' } }),
        of: () => tc.scope.find('FormDropdown').props().noResultsMessage,
        from: 'Use 3+ letters',
        to: 'Without results for "key"',
      })
    })

    it('uses response city as option', () => {
      expectChange({
        fn: () => tc.setProps({ cities: { data: { city: { id: 2 } } } }),
        of: () => tc.scope.find('FormDropdown').props().options?.[0]?.key,
        from: undefined,
        to: 2,
      })
    })

    it('change city sets the actual city in the store', () => {
      tc.setProps({
        cities: {
          data: {
            city: m.city(),
            list: [{ main: '', weather: [m.weather()] }],
          },
        },
      })
      expectChange({
        fn: () => tc.scope.find('FormDropdown').simulate('change'),
        of: () => tc.scope.find('FormDropdown').props().value,
        from: undefined,
        to: 10,
      })
    })
  })

  describe('on save', () => {
    it('will not call eventsAdd on errors', () => {
      expectNoChange({
        fn: () => tc.scope.find('Button').filter({ primary: true })
          .simulate('click', { preventDefault: Function.prototype }),
        of: () => tc.getProp('eventsAdd').mock.calls.length,
        from: 0,
      })
    })

    it('will call eventsAdd if no errors', () => {
      tc.setProps({
        cities: {
          data: {
            city: m.city(),
            list: [{ main: '', weather: [m.weather()] }],
          },
        },
      })
      tc.scope.find('FormDropdown').simulate('change')
      tc.scope.find('FormInput').filter({ label: 'Reminder' })
        .simulate('change', { target: { value: 'event' } })

      expectChange({
        fn: () => tc.scope.find('Button').filter({ primary: true })
          .simulate('click', { preventDefault: Function.prototype }),
        of: () => tc.getProp('eventsAdd').mock.calls.length,
        by: 1,
      })
    })
  })

  describe('with connected component', () => {
    const tcc = createTestComponentConnected(
      Connected,
      {
        history: {
          location: {},
          push: jest.fn(),
          replace: jest.fn(),
        },
        match: { params: {} },
      },
    )

    it('renders', () => {
      expect(tcc.scope.type()).toBe('div')
    })
  })
})
