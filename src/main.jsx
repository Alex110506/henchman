import { createElement, Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hangman from './App'
const root=createRoot(document.getElementById('root'));
root.render(
    <Hangman></Hangman>
)