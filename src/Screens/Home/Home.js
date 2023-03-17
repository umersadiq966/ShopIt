import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Home = ({setCurr}) =>{
    
    return(
        <View style={styles.container}> 
            <Image style={styles.logo} source={require('../../../assets/logo-color.png')}/>
            <Text style={styles.text}>Menu</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={()=>{setCurr('addItem')}}>
                    <Text style={styles.btnFont}>Add Items</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=>{setCurr('shopList')}}>
                    <Text style={styles.btnFont}>Shop List</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=>{setCurr('bill')}}>
                    <Text style={styles.btnFont}>Bill</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',

        flex: 1,

        width: '100%',

        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',

        overflow: 'hidden',
    },
    logo : {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        
    },
    text:{
        width: '100%',

        textAlign: 'center',

        paddingTop: 10,

        flex: 0.3,

        fontSize: 30,

        // color: '#749fdc',

        borderTopWidth: 1,
        borderTopColor: '#749fdc',

        borderBottomWidth: 1,
        borderBottomColor: '#749fdc',

        backgroundColor: '#5b769c',
    },

    btnContainer : {
        flex: 3,

        width: '100%',

        backgroundColor: '#749fdc',

        flexDirection: 'column',
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
    
        backgroundColor: '#5b769c',

        marginTop: 60,
    },

    btnFont: {
        fontSize: 20,
        color: 'whitesmoke',
    }
});