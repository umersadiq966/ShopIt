import React, { useState } from 'react';
// import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StatusBar } from 'expo-status-bar';
// import * as FileSystem from 'expo-file-system';
// import DropDownPicker from 'react-native-dropdown-picker';


export const TestStoreLocal = () => {
  const createPDF = async()=> {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    alert(file.filePath);
  }

    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={createPDF}>
          <Text>Create PDF</Text>
        </TouchableOpacity>
      </View>
    );
}


// export const TestStoreLocal = () => {
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(null);
//     const [items, setItems] = useState([
//       {label: 'Apple', value: 'apple'},
//       {label: 'Banana', value: 'banana'}
//     ]);
  
//     return (
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//       />
//     );
//   }


// export const TestStoreLocal = () => {
//     const [list, setList] = useState([]);
//     const [item, setItem] = useState('');
//     const [quant, setQuant] = useState('');
    
//     async function loadArray() {
//         try {
//           const fileUri = `${FileSystem.documentDirectory}list.json`;
//           const fileContents = await FileSystem.readAsStringAsync(fileUri);
//           const arrayFromJson = JSON.parse(fileContents);
//           console.l
//           setList(arrayFromJson);
//         } catch (e) {
//           console.log('Error reading file:', e);
//         }
//       }
    
//       useEffect(() => {
//         loadArray();
//       }, []);
      

//     async function saveArray() {
//         if(item !== ''){
//             setList([...list, [{i: item, q: quant}]]);
//             setItem('');
//             setQuant('');
//         }
//         console.log(list);
//         const arrayAsString = JSON.stringify(list);
//         const fileUri = `${FileSystem.documentDirectory}list.json`;
//         await FileSystem.writeAsStringAsync(fileUri, arrayAsString);
//         console.log('Array saved successfully');
//     }

//     const renderItem = ({ item }) => (
//         <Text>{item}</Text>
//     );
      
//     return(
//         <View style={styles.container}>
//             <TextInput value={item} style={styles.inp} placeholder='enter item' onChangeText={(e)=> setItem(e)}></TextInput>
//             <TextInput value={quant} style={styles.inp} placeholder='enter quant' onChangeText={(e)=> setQuant(e)}></TextInput>
//             <TouchableOpacity style={styles.btn} onPress={saveArray}><Text>Enter</Text></TouchableOpacity>
//             <FlatList
//                 data={list}
//                 renderItem={renderItem}
//             />
//             <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "whitesmoke" translucent = {false}/>
//         </View>
        
//     );
// }

const styles = StyleSheet.create({
    container : {
        flex : 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        paddingTop: 100,
    },

    inp : {
        borderWidth: 2,
        padding: 20,
        width : '90%',
        marginTop: 10,
    },

    btn : {
        backgroundColor: 'green',

        marginBottom: 40, 
        marginTop: 50,

        width: '70%',

        padding: 10,

        alignItems : 'center',
    },

});