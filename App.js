import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {StyleSheet, View, Image } from 'react-native';
import { AddItem} from './src/Screens/AddItem/AddItem';
import { Home } from './src/Screens/Home/Home';
import { ShopList } from './src/Screens/ShopList/ShopList';
import { Billing } from './src/Screens/Billing/Billing';
import useLoad from './src/Components/useLoad/useLoad';

// import {TestStoreLocal} from './src/Test/TestStoreLocal';
import { PrintPDF } from './src/Components/PrintPDF/PrintPDF';

export default function App() {
  
  const [currState, setCurr] = useState('home');
  const load = useLoad();
    if(load){
        return (
          <View style={styles.container2}>
            <Image style={styles.img} source={require('./assets/logo-no-background.png')} />
          </View>
        );
  }

  return (
    <View style={styles.container}>  
        {/* {currState === 'splash' && <SplashScreen setCurr = {setCurr}/>} */}
        {currState === 'home' && <Home setCurr = {setCurr}/>}
        {currState === 'addItem' && <AddItem setCurr = {setCurr} />}
        {currState === 'shopList' && <ShopList setCurr = {setCurr} />}
        {currState === 'bill' && <Billing setCurr = {setCurr} />}
        {currState === 'pdf' && <PrintPDF setCurr={setCurr}/>}

        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "whitesmoke" translucent = {false}/>
    </View>
  //   <View style={styles.container}>
  //     <TestStoreLocal />
  //     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "whitesmoke" translucent = {false}/>
  //   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'whitesmoke'
  },
    container2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
    },
  
    img : {
      width: '50%',
      height: '50%', 
  
      resizeMode: 'contain',
    }
});
