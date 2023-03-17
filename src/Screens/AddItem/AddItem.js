import { useState, useEffect } from 'react';
import {StyleSheet, TextInput, View,Text, TouchableOpacity, Image, FlatList, ToastAndroid} from 'react-native';
import {Header} from '../../Components/Header/Header';
import * as FileSystem from 'expo-file-system';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const AddItem = ({setCurr}) => {
    const [list, setList] = useState([]);
    const [item, setItem] = useState('');
    const [quant, setQuant] = useState('');
    const [price, setPrice] = useState('');
    const [rate, setRate] = useState('');

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
          const fileUri = `${FileSystem.documentDirectory}list1.json`;
          const fileContents = await FileSystem.readAsStringAsync(fileUri);
          const arrayFromJson = JSON.parse(fileContents);
          setList(arrayFromJson);
          console.log('array loaded');
        } catch (e) {
          console.log('Error reading file:', e);
        }
      }
    
      useEffect(() => {
        loadArray();
      }, []);

    const deleteData = async (prop) => {
        const newList = list.slice();
        newList.forEach((item, index) => {
           if (item[0].i === prop) {
            newList.splice(index, 1);
           }
        });
        setList(newList);
        console.log(newList);
        const arrayAsString = JSON.stringify(newList);
        const fileUri = `${FileSystem.documentDirectory}list1.json`;
        await FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Array saved successfully');
        showToast('Item Deleted');
    }

    const putItem = () => {
        if (item !== '') {
          setList([...list, [{ i: item, q: quant, p: price, r : rate }]]);
          setItem('');
          setQuant('');
          showToast('Item Added');
        }
    };

      useEffect(() => {
        const tempList = list.slice();
        const arrayAsString = JSON.stringify(tempList);
        const fileUri = `${FileSystem.documentDirectory}list1.json`;
        FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Array stored');
      }, [list]);
      

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.dataContainer}>
                <Text style={styles.text}>{item[0].i}</Text>
                <Text style={styles.text}>{item[0].q}</Text>

                <TouchableOpacity style={styles.crossBtn} 
                        onPress={()=>{
                            deleteData(item[0].i)
                        }}>
                        <Image style={styles.crossLogo} source={require('../../../assets/close-button.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
      );    

    return(           
        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'android' ? -25 : 0}
        >
            <Header setCurr= {setCurr} text={'Add Item Page'}/>
            <View style={styles.inpContainer}>
                <TextInput 
                    style={styles.inp} 
                    placeholder={'Enter Item Name'} 
                    value={item} 
                    onChangeText={(e)=>{setItem(e)}}
                    >
                </TextInput>

                <TextInput 
                    keyboardType='numeric'
                    style={styles.inp} 
                    placeholder={'Enter Quantity'} 
                    value={quant} onChangeText={(e)=>{setQuant(e)}}
                    >
                </TextInput>
                
                <TouchableOpacity style={styles.btn1}
                    onPress={putItem}
                >
                    <Text style={{color: 'white'}}>Add Item</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
               <FlatList
                    style={styles.flat}
                    data={list}
                    renderItem={renderItem}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'whitesmoke',
        flex: 1,
    },

    inpContainer: {
        flex: 2,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#749fdc',
        paddingTop: '6%',
        paddingBottom: '4%',
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    inp : {
        width: '80%',
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    btn1: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#749fdc',
    },

    listContainer: {
        flex: 4,
        width: '100%',
        paddingBottom: 10,
    },

    flat : {
        flex: 1,
        width: '100%',
    },

    container2 : {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    dataContainer : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 10,
        width: '82%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
    },

    text : {
        flex: 3,
        fontSize: 15,
        borderRightWidth: 2,
        padding: 15,
    },

    crossBtn : {
        flex: 1,
        width: "100%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    crossLogo : {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
});