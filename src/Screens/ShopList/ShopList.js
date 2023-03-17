import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, ToastAndroid} from "react-native";
import { Header } from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';


export const ShopList = ({setCurr}) =>{

    const [list1, setList1] = useState([]);
    const [tempList, setTemp] = useState([]);
    const [quant, setQuant] = useState('');
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
          setList1(arrayFromJson);
        } catch (e) {
          console.log('Error reading file:', e);
        }
    }
    
    useEffect(() => {
        loadArray();
    }, []);

    async function loadTempArray() {
        try {
          const fileUri = `${FileSystem.documentDirectory}list2.json`;
          const fileContents = await FileSystem.readAsStringAsync(fileUri);
          const arrayFromJson = JSON.parse(fileContents);
          setTemp(arrayFromJson);
          console.log(arrayFromJson);
          console.log('array loaded');
        } catch (e) {
          console.log('Error reading file:', e);
        }
    }

    useEffect(() => {
        loadTempArray();
    }, []);
    
    const calc = (prop, r, q) => {
        newList = list1.slice();
        newList.forEach((item) => {
            if(item[0].r === ''){
                showToast('Enter Rate Please');
                return 0;
            }
            else if(item[0].q === ''){
                showToast('Enter Quantity Please');
                return 0;
            }
            else if (item[0].i === prop) {
                item[0].p = item[0].r*item[0].q;          
            }
        });
        setList1(newList);
    }

    const QuantSetter = (prop, e) => {
        setQuant(e);
        list1.forEach((item) => {
            if (item[0].i === prop) {
                item[0].q = e;
            }
        });
    }

    const RateSetter = (prop, e) => {
        setRate(e);
        list1.forEach((item) => {
            if (item[0].i === prop) {
                item[0].r = e;
            }
        });
    }

    const saveData = (prop) =>{
        list1.forEach((item, index)=>{
            if(item[0].p === ''){
                showToast('Calculate Price First Before Saving Item Data');
                return 0;
            }
            else if(item[0].i === prop){
                setTemp([...tempList, [item[0]]]);
                list1.splice(index, 1);
            }
        });
        const arrayAsString = JSON.stringify(list1);
        const fileUri = `${FileSystem.documentDirectory}list1.json`;
        FileSystem.writeAsStringAsync(fileUri, arrayAsString);
    };
    useEffect(() => {
        const temp = tempList.slice();
        const arrayAsString = JSON.stringify(temp);
        const fileUri = `${FileSystem.documentDirectory}list2.json`;
        FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Array stored');
        showToast('Item Saved');
    }, [tempList]);

        
    const deleteData = async (prop) => {
        const newList = list1.slice();
        newList.forEach((item, index) => {
            if (item[0].i === prop) {
            newList.splice(index, 1);
            }
        });
        setList1(newList);
        console.log(newList);
        const arrayAsString = JSON.stringify(newList);
        const fileUri = `${FileSystem.documentDirectory}list1.json`;
        await FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Array saved successfully');
        showToast('Item Deleted');
    }

    const renderItem = ({ item, index }) => (

        <View style={styles.container2}>
            <View style={styles.dataContainer}>
                <Text style={styles.text}>{item[0].i}</Text>
            </View>
            <View style={styles.dataContainer2}>
                <TextInput 
                    keyboardType='numeric'
                    style={styles.inp} 
                    placeholder={'Quantity'}
                    defaultValue={item[0].q} 
                    // value={quant} 
                    onChangeText={(e)=>{
                        QuantSetter(item[0].i, e);

                    }}
                    >
                </TextInput>
                <TextInput 
                    keyboardType='numeric'
                    style={styles.inp} 
                    placeholder={'Rate'} 
                    defaultValue={item[0].r} 
                    // value={rate} 
                    onChangeText={(e)=>{
                        RateSetter(item[0].i, e);
                    }}
                    >
                </TextInput>
                <TouchableOpacity style={styles.calcBtn} 
                        onPress={()=>{
                            calc(item[0].i, rate, quant);
                        }}>
                        <Text style={styles.text2} >Price</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dataContainer3}>
                <Text style={styles.text1}>Total Price = {item[0].p}</Text>
                <TouchableOpacity style={styles.saveBtn} 
                        onPress={()=>{
                            saveData(item[0].i);
                        }}>
                        <Text style={styles.text3} >Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delBtn} 
                        onPress={()=>{
                            deleteData(item[0].i);
                        }}>
                        <Text style={styles.text3} >Delete</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

    return(
        <View style={styles.container}>
                <Header setCurr = {setCurr} text = {'Shopping List'} />
                <View style={styles.body}>
                    <View style={styles.listContainer}>
                        <FlatList
                                style={styles.flat}
                                data={list1}
                                renderItem={renderItem}
                            />
                    </View>
                </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'whitesmoke',

        flex: 1,

        width: '100%',
        height:'100%',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    body : {
        flex: 7,
        width: '100%',
    },

    listContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 10,
    },

    inp : {
        flex: 4,
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 5,
    },
    

    flat : {
        flex: 1,

        width: '100%',
    },

    container2: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    dataContainer : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

        width: '82%',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 20,
    },
    dataContainer2 : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 0,
        width: '82%',
        padding: 10,
        flexDirection: 'row',
    },
    dataContainer3 : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 0,
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        width: '82%',
        padding: 5,
        flexDirection: 'row',
    },

    text : {
        flex: 3,

        fontSize: 20,

        padding: 15,
    },

    text1 : {
        flex: 3,

        fontSize: 15,

        padding: 10,
    },
    text2 : {
        flex: 3,

        fontSize: 15,

        padding: 11,

        marginTop: 4,
    },
    text3 : {
        flex: 3,

        fontSize: 15,

        padding: 4,

        marginTop: 4,
    },

    calcBtn : {
        flex: 2.3,

        marginTop: 2,

        height: '90%',

        backgroundColor : '#749fdc',

        borderRadius: 60,

        alignItems: 'center',
    },

    saveBtn : {
        flex: 1.5,

        marginTop: 2,

        height: '90%',

        backgroundColor : '#2fb42f',

        borderRadius: 60,

        alignItems: 'center',
    },

    delBtn : {
        flex: 1.5,

        marginTop: 2,

        height: '90%',

        backgroundColor : '#c55050',

        borderRadius: 60,

        alignItems: 'center',

        marginLeft: 1,
    },

    picker: {
        width: '99%',
        height: '100%',
        
        backgroundColor: 'whitesmoke',
        borderColor: '#749fdc',
        borderWidth: 2,
    },

    dropDown: {
        width: '99%',

        backgroundColor: '#cdd7e5',
        borderColor: '#749fdc',
        borderWidth: 2,
        paddingBottom: 10,
    },

});