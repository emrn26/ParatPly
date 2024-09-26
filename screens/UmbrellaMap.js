// UmbrellaMap.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getDatabase, ref, onValue } from 'firebase/database';

const UmbrellaMap = () => {
  const [umbrellas, setUmbrellas] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const umbrellaRef = ref(db, 'Umbrellas/');

    onValue(umbrellaRef, (snapshot) => {
      let data = snapshot.val() ? snapshot.val() : {};
      let umbrellaList = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setUmbrellas(umbrellaList);
    });
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 55.676098, // Centrer kortet over København
        longitude: 12.568337,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {umbrellas.map((umbrella) => (
        <Marker
          key={umbrella.id}
          coordinate={{
            latitude: umbrella.latitude,
            longitude: umbrella.longitude,
          }}
        >
          <Callout>
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{umbrella.type}</Text>
              {/* Tilføj linjen her for at vise antal tilgængelige paraplyer */}
              <Text>Available umbrellas: {umbrella.availableUmbrellas}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default UmbrellaMap;
