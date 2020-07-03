import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { getEnigmaNytimesData } from '../services/nytimesUSStatesService';

interface stateDataProps {

}

export const StateData: React.FC<any> = () => {
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  
  const onLoad = () => {
    if (!enigmaNytimesData) {
      getEnigmaNytimesData().then(async data => {
        setEnigmaNytimesData(data);
        console.log(data);
        // setData(data, selectedState);
      });
    }
  }
  onLoad();
  return (
    <View>
      <Text>State Data</Text>
    </View>
  );
}