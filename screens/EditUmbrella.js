import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, child, push, update } from "firebase/database";

function EditUmbrella({navigation, route}) {
    const db = getDatabase();

    const initialState = {
        type: '',
        latitude: '',
        longitude: ''
    };
      

    const [newUmbrella, setNewUmbrella] = useState(initialState);

    const isEditUmbrella = route.name === "Edit Umbrella";

    useEffect(() => {
        if (isEditUmbrella) {
            const umbrella = route.params.umbrella[1];
            setNewUmbrella(umbrella);
        }

        return () => {
            setNewUmbrella(initialState);
        };
    }, []);

    const changeTextInput = (name, event) => {
        setNewUmbrella({ ...newUmbrella, [name]: event });
    }

    const handleSave = async () => {
        const { type, latitude, longitude } = newUmbrella;
      
        if (type.length === 0 || latitude.length === 0 || longitude.length === 0) {
          return Alert.alert('Et af felterne er tomme!');
        }
      
        if (isEditUmbrella) {
          const id = route.params.umbrella[0];
          const umbrellaRef = ref(db, `Umbrellas/${id}`);
      
          const updateFields = {
            type,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          };
      
          await update(umbrellaRef, updateFields)
            .then(() => {
              Alert.alert("Din paraply info er nu opdateret");
              const umbrella = newUmbrella;
              navigation.navigate("Umbrella Details", { umbrella });
            })
            .catch((error) => {
              console.error(`Error: ${error.message}`);
            });
        } else {
          const umbrellasRef = ref(db, "/Umbrellas/");
      
          const newUmbrellaData = {
            type,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          };
      
          await push(umbrellasRef, newUmbrellaData)
            .then(() => {
              Alert.alert("Paraply tilføjet");
              setNewUmbrella(initialState);
            })
            .catch((error) => {
              console.error(`Error: ${error.message}`);
            });
        }
      };
      

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key, index) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{key}</Text>
                            <TextInput
                                value={newUmbrella[key]}
                                onChangeText={(event) => changeTextInput(key, event)}
                                style={styles.input}
                            />
                        </View>
                    ))
                }
                <Button title={isEditUmbrella ? "Save changes" : "Book"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditUmbrella;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
});
