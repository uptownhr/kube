import React from 'react'
import {render} from 'react-dom'
import App from './components/App'

const selector = document.querySelector('#root')
const state = window.__INITIAL_STATE
render(<App {...state} />, selector)