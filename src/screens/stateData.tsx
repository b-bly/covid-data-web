import React, { useState } from 'react';
import { BarChart, Grid } from 'react-native-svg-charts';
import { getEnigmaNytimesData } from '../services/nytimesUSStatesService';

interface stateDataProps {

}

export const StateData: React.FC<any> = (props) => {
  const [enigmaNytimesData, setEnigmaNytimesData] = useState<any>(null);
  console.log(props);
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

  const fill = 'rgb(134, 65, 244)'
  const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

  return (
      <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
          <Grid />
      </BarChart>
  )
}