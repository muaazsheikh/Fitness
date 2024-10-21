import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, } from 'react-native';


// import store from './redux/store';
import Routes from './routes/Routes';
console.disableYellowBox = true;
LogBox.ignoreAllLogs();

const App = () => {
  return (

      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>

  );
};

export default App;