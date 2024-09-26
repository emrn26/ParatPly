import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function UmbrellaList({navigation}) {
    const [umbrellas, setUmbrellas] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const umbrellaRef = ref(db, 'Umbrellas/');

        onValue(umbrellaRef, (snapshot) => {
            let data = snapshot.val() ? snapshot.val() : {};
            setUmbrellas(data);
        });

        return () => {
            setUmbrellas({});
        }
    }, []);

    const renderItem = (umbrella) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Umbrella Details', {umbrella})}>
                <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{umbrella.item[1].type}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const bookUmbrella = () => {
        navigation.navigate('Book'); // Navigér til "Book" fanen
    };
    


    return (
        <View style={styles.container}>
            <Button title="Book Umbrella" onPress={bookUmbrella} />
            {
                Object.keys(umbrellas).length > 0 ? (
                    <FlatList
                        data={Object.entries(umbrellas)}
                        renderItem={renderItem}
                        keyExtractor={item => item[0]}
                    />
                ) : (
                    <Text>No umbrellas available.</Text>
                )
            }
            <StatusBar style="auto" />
        </View>
    );
}

export default UmbrellaList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    listItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItemText: {
        fontSize: 18,
    },
});
