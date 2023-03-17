import { useState, useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import { FlatList } from 'react-native';
import { Header } from '../../Components/Header/Header';
import * as FileSystem from 'expo-file-system';

export const Billing = ({setCurr}) => {
    const [list2, setList2] = useState([]);
    const [total, setTotal] = useState(0);
    let totalTemp;

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
          setList2(arrayFromJson);
        } catch (e) {
          console.log('Error reading file:', e);
        }
    }

    useEffect(() => {
        loadArray();
    }, []);


    function calc(){
        if(list2 == []){
            // showToast('No Data Available to Calculate Total');
            return 0;
        }
        else{
            totalTemp = 0;
            const newList = list2.slice();
            newList.forEach((item, index) => {
            totalTemp = totalTemp+item[0].p;
            console.log(totalTemp);
            });
            setTotal(totalTemp);
        }
    }

    const deleteData = async (prop) => {
        const newList = list2.slice();
        newList.forEach((item, index) => {
            if (item[0].i === prop) {
            newList.splice(index, 1);
            }
        });
        setList2(newList);
        console.log(newList);
        const arrayAsString = JSON.stringify(newList);
        const fileUri = `${FileSystem.documentDirectory}list2.json`;
        await FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Array saved successfully');
        showToast('Item Deleted');
    }
    
    const clearList = () => {
        setList2('');
        setTotal(0);
        const arrayAsString = JSON.stringify('');
        const fileUri = `${FileSystem.documentDirectory}list2.json`;
        FileSystem.writeAsStringAsync(fileUri, arrayAsString);
        console.log('Storage Cleared');
        showToast('List Cleared');
    };
    
    const renderItem = ({ item, index }) => (

        <View style={styles.container2}>
            <View style={styles.dataContainer}>
                <Text style={styles.text}>{item[0].i}</Text>
                <Text style={styles.text3}>{item[0].q}</Text>
                <Text style={styles.text4}>{item[0].r}</Text>
                <Text style={styles.text5}>{item[0].p}</Text>   
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
        <View style={styles.container}>
            <Header setCurr= {setCurr} text={'Billing Page'}/>
            <View style={styles.body}>
                <View style={styles.container4}>
                    <View style={styles.dataContainer4}>
                        <TouchableOpacity style={styles.clearBtn} 
                            onPress={()=>{
                                clearList();
                            }}>
                            <Text style={styles.text} >Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pdfBtn} 
                            onPress={()=>{
                                if(list2 === ''){
                                    showToast('No Data Available to Print');
                                    return 0;
                                }
                                else{
                                    setCurr('pdf');
                                }
                            }}>
                            <Text style={styles.text} >Print</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.container3}>
                        <View style={styles.dataContainer2}>
                            <Text style={styles.text1}>Item</Text>
                            <Text style={styles.text2}>Quantity</Text>
                            <Text style={styles.text6}>Rate</Text>
                            <Text style={styles.text7}>Price</Text>
                        </View>
                    </View>
                    <FlatList
                            style={styles.flat}
                            data={list2}
                            renderItem={renderItem}
                        />
                    <View style={styles.container3}>
                        <View style={styles.dataContainer3}>
                            <TouchableOpacity style={styles.billBtn} 
                                    onPress={()=>{
                                        calc();
                                    }}>
                                    <Text style={styles.text} >Total Bill</Text>
                            </TouchableOpacity>
                            <Text style={styles.text8}>{total}</Text>
                            
                        </View>
                    </View>
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

        overflow: 'hidden',
    },

    body : {
        flex: 7,

        width: '100%',
    },

    listContainer: {
        flex: 1,

        width: '100%',

        overflow: 'scroll',

        paddingTop: 0,
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
    container3: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',    
    },
    container4: {
        width: '100%',
        height: '9%',
        flexDirection: 'column',
        alignItems: 'center',   
        
        // borderWidth: 2,
        // borderColor: 'red',
    },

    
    dataContainer : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 0,
        
        width: '90%',

        flexDirection: 'row',
        alignItems: 'center',
    },
    dataContainer2 : {
        borderWidth: 2,
        borderColor: '#749fdc',
        borderRadius: 0,
        

        width: '90%',

        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#749fdc',
    },
    dataContainer3 : {        
        padding: 20,

        flexDirection: 'row',

        backgroundColor: '#749fdc',
    },
    dataContainer4 : {    
        // flex: 2,
        height: '100%',
        width: '85%',    
        padding: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        // backgroundColor: '#749fdc',
    },

    text : {
        flex: 3,

        fontSize: 14,

        padding: 5,
    },

    text1 : {
        fontSize: 15,
        fontWeight: 700,
    },
    text2 : {
        fontSize: 15,
        fontWeight: 700,

        paddingLeft: 65,
    },
    text6  :{
        fontSize: 15,
        fontWeight: 700,

        paddingLeft: 23,
    },
    text7 : {
        fontSize: 15,
        fontWeight: 700,

        paddingLeft: 43,
    },
    text3 : {
        flex: 3,

        fontSize: 14,

        paddingLeft: 55,
    },
    text4 : {
        flex: 3,

        fontSize: 14,

        paddingLeft: 10,
    },
    text5 : {
        flex: 3,

        fontSize: 14,

        paddingLeft: 20,
    },

    text8 : {
        flex: 4,

        fontSize: 14,
        fontWeight: 700,

        marginTop: 2,

        height: '90%',

        backgroundColor : 'whitesmoke',

        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',

        padding: 15,
    },

    
    billBtn : {
        flex: 2,

        marginTop: 2,

        height: '90%',

        backgroundColor : '#2fb42f',

        borderRadius: 60,

        alignItems: 'center',
        padding: 8,
        marginRight: 10,
    },

    clearBtn : {
        flex: 1,
        height: '90%',
        width: '20%',

        marginTop: 2,

        height: '90%',

        backgroundColor : '#c55050',

        borderRadius: 60,

        alignItems: 'center',
        paddingTop: 5,
        marginLeft: 10,
    },

    pdfBtn : {
        flex: 1,
        height: '90%',
        width: '20%',

        marginTop: 2,

        height: '90%',

        backgroundColor : '#9a9ad4',

        borderRadius: 60,

        alignItems: 'center',
        paddingTop: 5,
        marginLeft: 10,
    },

    crossBtn : {
        flex: 2,
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
