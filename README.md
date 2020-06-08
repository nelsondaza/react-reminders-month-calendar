
# react-reminders-month-calendar
Calendar reminders application using React

[![data: Redux](https://img.shields.io/badge/data-redux-764abc.svg?style=flat&logo=redux)](https://redux.js.org/)
[![lang: react](https://img.shields.io/badge/lang-react-61daf8.svg?style=flat&logo=react)](https://reactjs.org/)
[![stream: RxJS](https://img.shields.io/badge/stream-rxjs-764a88.svg?style=flat&logo=rxjs)](https://rxjs-dev.firebaseapp.com/)
[![test: Jest](https://img.shields.io/badge/test-jest-c21325.svg?style=flat&logo=jest)](https://jestjs.io/)

![Calendar](https://user-images.githubusercontent.com/2087094/84017920-003c2280-a945-11ea-9f6b-e022fa76ee99.png)

## Getting started
You will need:
 - NodeJS ^12
 - Yarn ^1.22

### Checkout
Checkout the repo with
```
git clone https://github.com/nelsondaza/react-reminders-month-calendar.git
```

```
cd react-reminders-month-calendar
```

## Install and run
Install dependencies and run local-server (it will use 7070 port by default)
```
yarn serve
```

Open localhost:7070 in your browser 
```
open http://localhost:7070
```

## Start Storybook for component isolation tests
* Tests will run before so storybook can show the tests results
```
yarn stories
```

## Run tests and coverage
```
yarn test
```

check coverage
```
open ./dist/coverage/index.html
```


## Requirements
Check reqs doc [REQUIREMENTS.md](docs/REQUIREMENTS.md)

---
## Things I've done
 - 100% of requirements and bonus
 - A small seeder for the active month for testing (and for fun)
 - Once you edit reminder changing its date to a different month you will be sent to that month
 - A small router navigation: Home, Event (edit), NotFount (just in case)
 - I've used RxJS there are some debounce and cancellations here and there
 - Created a small test suite 
 - The coverage is 100%
 - The storybook includes all small components (not the screens)
