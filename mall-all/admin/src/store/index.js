import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer'

const middlewares = []

middlewares.push(thunk)

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
    })
    middlewares.push(logger);
}


const store = createStore(reducer, applyMiddleware(...middlewares))

export default store