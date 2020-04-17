import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-gesture-handler/Swipeable'

export default props =>{

    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : { }; //Adiciona uma linha riscada caso as propiedades tenham data de conclusão ( props.doneAT )
    const date = props.doneAt != null ? props.doneAt : props.estimateAt;// Cria uma variavel que verifica se a tarefa foi finalizada neste caso exibe ela, caso não seja exibe a data que vai finalizar a task
    const formatedDate = moment( date ).locale( 'pt-br' ).format( 'ddd, D [de] MMMM' ); //Pega a variavel das propiedades da data estimada e formata para o padrão brasileiro
    
    const getRightContent = () => {
           return ( 
                <TouchableOpacity style = {styles.right} onPress = { () => props.onDelete && props.onDelete(props.id) }>
                    <Icon name = 'trash' size = {30} color = 'white' />
                </TouchableOpacity>
    )
    }   
    const getLeftContent = () => {
        return ( 
            <View style = {styles.left}>
                <Icon name = 'trash' size = {20} color = 'white' style = {styles.excludeIcon} />
                <Text style = {styles.excludeText}> Excluir </Text>
            </View>
    )
    }


    return (
        <Swipeable 
                renderRightActions = {getRightContent} 
                renderLeftActions = {getLeftContent}
                onSwipeableLeftOpen = { () => props.onDelete && props.onDelete(props.id) }>
            <View style = {styles.container}>
                <TouchableWithoutFeedback onPress = { () => props.toggleTask(props.id) }> 
                    <View style = {styles.checkContainer}>
                        {getCheckView( props.doneAt )}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style = {[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style = {styles.date}>{formatedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView( doneAt ) {
    if(doneAt != null){
        return (
            <View style = {styles.done}> 
                <Icon name = 'check' size = {20} color = '#FFF' style = {{padding: 2}}> </Icon>
            </View>
        )
    }else{
        return(
            <View style = {styles.pending}></View>
        )   
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'

    },
    checkContainer: {
        width: '20%',
        alignItems: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    desc: {
       fontFamily: commonStyles.fontFamily,
       color: commonStyles.colors.mainText,
       fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 12,
        color: commonStyles.colors.subText
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    excludeIcon: {
        marginLeft: 10
    }
});
