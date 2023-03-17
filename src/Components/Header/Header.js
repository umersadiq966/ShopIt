import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';  
            
export const Header = ({setCurr, text}) =>{            
    
    return(
        <View style={styles.header}>
            <View style={styles.v1}>
                <TouchableOpacity style={styles.crossBtn} onPress={()=>{setCurr('home')}}>
                    <Image style={styles.crossLogo} source={require('../../../assets/close-button.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.v2}>
                {/* <Image style={styles.logo} source={require('../../../assets/shopit-website-favicon-color.png')} />                     */}
                <Text style={styles.text1}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header : {
        flex: 1,

        width: '100%',

        borderBottomWidth: 2,
        borderBottomColor: '#749fdc',

        flexDirection: 'row',
        alignItems: 'center',

    },
        
    v1:{
        flex: 1,


        flexDirection: 'column',
        alignItems: 'flex-start',

    },

    crossBtn : {
        width: "60%",
        // height: '70%',

        flex: 1,

        marginLeft: 20,
        marginTop: 5,

        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    crossLogo : {
        width: '50%',
        // height: '50%',

        resizeMode: 'contain',
    },


    v2:{
        flex: 2,

        // height: '50%',

        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    logo: {
        resizeMode: 'contain',

        width: '30%',
        // height: '50%',


        marginLeft: 30,
    },
    text1 : {
        fontSize: 30,
        color: '#749fdc',

        marginLeft: -10,
    },

});