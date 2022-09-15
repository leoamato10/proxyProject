import { View, Text } from 'react-native'
import React from 'react'
import { ExampleProvidedComponent } from './src/Components/ExampleProvidedComponent'


const url = "/v1/public/characters"

const App = () => {
  return (
    <ExampleProvidedComponent url={ url } /> 
  )
}

export default App