import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barstyle="light-content" background-color="#7d40e7" />
      <Routes/>
    </>
  );
}
