
# react-reminders-month-calendar
Calendar reminders application using React

[![data: Redux](https://img.shields.io/badge/data-redux-764abc.svg?style=flat&logo=redux)](https://redux.js.org/)
[![lang: react](https://img.shields.io/badge/lang-react-61daf8.svg?style=flat&logo=react)](https://reactjs.org/)
[![test: Jest](https://img.shields.io/badge/test-jest-c21325.svg?style=flat&logo=jest)](https://jestjs.io/)

## Install instructions
Check install doc [INSTALL.md](docs/INSTALL.md)

## Things to keep in mind for this project
 - attention to details
 - cross-browser compatibility
 - standards
 - reusability.

Create a calendar application by rendering a single month view of a calendar for the current month

## Mandatory Features
 - Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
 - Display reminders on the calendar view in the correct time order.
 - Allow the user to select color when creating a reminder and display it appropriately.
 - Ability to edit reminders – including changing text, city, day, time and color.
 - Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
 - Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

### Bonus (Optional)
 - Expand the calendar to support more than the current month.
 - Properly handle overflow when multiple reminders appear on the same date.
 - Functionality to delete one or ALL the reminders for a specific day

## Considerations
 - Redux (or any other state manager) structure of the calendar.
 - The project is totally focused on the front-end; please ignore the back-end.
 - Keep your code versioned with Git.
 - Feel free to use small helper libraries for:
   - UI Elements.
   - Date/Time handling.
 - You must create the calendar component yourself. Do not use calendar libraries like FullCalendar or Bootstrap Calendar.
 - If you use an external API, make sure to provide working API keys.
