import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, Dimensions } from 'react-native';

export default function Modules({navigation})
{
    return(
        <SafeAreaView>
        <View style={{fontFamily:'Arial'}}><b>Take your Sessions Here</b></View>
      <SafeAreaView style={{alignItems:'flex-start' ? Dimensions.get('window').width : 'center'}}>
      <ScrollView style={{height:'90vh'}} showsVerticalScrollIndicator={false}>
        <View style={styles.session}><Text>session 1</Text><Pressable style={styles.button} title="Click to continue" onPress={()=>{}}><Text>Under Development</Text></Pressable></View>
        <View style={styles.session}><Text>session 2</Text><Pressable style={styles.button} title="Click to continue" onPress={()=>{}}><Text>Under Development</Text></Pressable></View>
        <View style={styles.session}><Text>session 3</Text><Pressable style={styles.button} title="Click to continue" onPress={()=>{navigation.navigate('Sample3')}}><Text>Click to continue</Text></Pressable></View>
        <View style={styles.session}><Text>session 4</Text><Pressable style={styles.button} title="Click to continue" onPress={()=>{navigation.navigate('Sample4')}}><Text>Click to continue</Text></Pressable></View>
        {/* <View style={styles.session}><Text>session 1</Text><Pressable style={styles.button} title="Click to continue" onPress={()=>{navigation.navigate('Session1')}}><Text>Click to continue</Text></Pressable></View> */}
      </ScrollView>
      </SafeAreaView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    session:{
        margin:'3%',
        padding:'2%',
        textAlign:'center',
        fontFamily:'Arial',
        backgroundColor:'#FFF',
        borderRadius:'10px',
        alignItems:'center',
        justifyContent:'center',
        maxWidth:'500px',
        width:'90%'
      },
      button:{
        textAlign:'center',
        margin:'2%',
        backgroundColor:'rgba(0,0,255,0.7)',
        borderRadius:'5px',
        width:250,
        fontSize:'120%',
        padding:'5px',
        alignItems:'center',
        justifyContent:'center',
      }
});