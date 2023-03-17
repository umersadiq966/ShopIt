import { useState, useEffect } from 'react';
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Header } from '../Header/Header';
import moment from 'moment';

export const PrintPDF = ({setCurr}) => {
  const [list4, setList4] = useState([]);
  const [total, setTotal] = useState(0);
  let totalTemp = 0;
  const currentTime = moment().format('h:mm:ss a');
  const currentDate = moment().format('MMMM Do YYYY');

  const showToast = (prop) => {
    ToastAndroid.showWithGravity(
        prop,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0, 
        -1000
      );
}

  async function loadArray() {
    try {
      const fileUri = `${FileSystem.documentDirectory}list2.json`;
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      const arrayFromJson = JSON.parse(fileContents);
      setList4(arrayFromJson);
      console.log(arrayFromJson);
      
      
    } catch (e) {
      console.log('Error reading file:', e);
    }
  }
  useEffect(() => {
    console.log('Before calling loadArray()');
    loadArray();
    console.log('After calling loadArray()');
  },[]);

  useEffect(()=>{
    console.log('Before calling calc()');
      calc();
    console.log('After calling calc()');
  })

  function calc(){
    const newList = list4.slice();
    newList.forEach((item, index) => {
       totalTemp = totalTemp+item[0].p;
       console.log(totalTemp);
    });
    setTotal(totalTemp);
  }
  
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          th{
            display: inline-block;
            width: 20%;
            text-align: center;
            margin-left: 26px;
            margin-bottom: 10px;
            border: 2px solid #749fdc
          }
          td{
            display: inline-block;
            width: 20%;
            text-align: center;
            margin-left: 29px;
          }
      </style>
      </head>
      <body style="display:flex;flex-direction: column;text-align: center;">
        <div style="display: flex; alignItems: center; justify-content: space-between">
          <p style="margin-left:10px ;font-size: 15px">Dated: ${currentDate}</p>
          <p style=" font-size: 25px; font-family: Helvetica Neue; font-weight: 700;">
            Bill
          </p>
          <p style="margin-left:10px; font-size: 15px">Dated: ${currentTime}</p>

        </div>
        <table style="width:100%; border: 2px solid #749fdc">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${list4.map(item => `
              <tr>
                <td>${item[0].i}</td>
                <td>${item[0].q}</td>
                <td>Rs. ${item[0].r}</td>
                <td>Rs. ${item[0].p}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="margin-top: 30px; font-size: 30px">Total: Rs. ${total}</p>
      </body>
    </html>
`;

  const print = async () => {
    console.log('Before calling calc()');
    calc();
    console.log('After calling calc()');
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({html});
    
  };

  const printToFile = async () => {
    console.log('Before calling calc()');
    calc();
    console.log('After calling calc()');
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({html});
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    
  };

  return (
    <View style={styles.container}>
        <Header setCurr= {setCurr} text={'Convert to PDF'}/>
        <View style={styles.body}>
          <TouchableOpacity style={styles.btn} onPress={print}>
              <Text>Print</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btn} onPress={printToFile}>
            <Text>Print to PDF File</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'whitesmoke',
  },
  body : {
    flex: 7,

    width: '100%',

    alignItems: 'center',

    justifyContent: 'flex-start',

  },
  btn: {
    borderRadius: 5,

    alignItems: 'center',

    width: '80%',

    marginTop: 10,
    marginBottom: 10,
    padding: 15,

    backgroundColor: '#749fdc',

    marginTop: 60,
},

btnFont: {
    fontSize: 20,
    color: 'whitesmoke',
}
});




