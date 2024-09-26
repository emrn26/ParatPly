import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, remove } from "firebase/database";

function UmbrellaDetails({route, navigation}) {
    const [umbrella, setUmbrella] = useState({});

    useEffect(() => {
        setUmbrella(route.params.umbrella[1]);

        return () => {
            setUmbrella({});
        }
    });

    const handleEdit = () => {
        const umbrella = route.params.umbrella;
        navigation.navigate('Edit Umbrella', { umbrella });
    };

    const confirmDelete = () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Er du sikker?', 'Vil du slette paraplyen?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    const handleDelete = async () => {
        const id = route.params.umbrella[0];
        const db = getDatabase();
        const umbrellaRef = ref(db, `Umbrellas/${id}`);

        await remove(umbrellaRef)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    if (!umbrella) {
        return <Text>No data</Text>;
    }

    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Delete" onPress={confirmDelete} />
            {
                Object.entries(umbrella).map((item, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.label}>{item[0]}</Text>
                        <Text style={styles.value}>{item[1]}</Text>
                    </View>
                ))
            }
            <StatusBar style="auto" />
        </View>
    );
}

export default UmbrellaDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: { flexDirection: 'row', height: 30, margin: 10 },
    label: { fontWeight: 'bold', width: 100 },
    value: { flex: 1 },
});
