import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; 

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [foundDevs, setFoundDevs] = useState([]);
    const [techs, setTechs] = useState('');

    async function getDevs(e) {
        e.preventDefault();
        const { latitude, longitude } = currentRegion;
        const response = await fetch(`http://192.168.2.2:3333/search?latitude=${latitude}&longitude=${longitude}&techs=${techs}`,);
        const { devs } = await response.json();
        setFoundDevs(devs);
    }

    function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion) {
        return null;
    }

    return ( 
        <>
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={styles.map}>
                {
                    foundDevs.map(element => {
                        const { _id, location, avatar_url, github_user, bio, name, techs } = element;
                        const [ longitude, latitude ] = location.coordinates
                        return (
                            <Marker key={_id} coordinate={{latitude: latitude, longitude: longitude}}>
                                <Image style={styles.avatar} source={{uri: avatar_url}} />
                                <Callout onPress={() => {
                                    navigation.navigate('Profile', { github_username: github_user })
                                }}>
                                    <View style={styles.callout}>
                                        <Text style={styles.devName}>{name}</Text>
                                        <Text style={styles.devBio}>{bio}</Text>
                                        <Text style={styles.devTechs}>{techs.join(', ')}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={getDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
        
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }

})

export default Main;