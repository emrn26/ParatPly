// Profile.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {/* Tilføj et profilbillede */}
      <Image 
        source={require('../assets/profile.png')} // Indsæt billede som ligger i "assets"-mappen
        style={styles.profileImage}
      />
      <Text style={styles.label}>Name: John Doe</Text>
      <Text style={styles.label}>Mobil: +45 12341256</Text>
      <Text style={styles.label}>Email: johndoe@gmail.com</Text>
      <Text style={styles.label}>Subscription: Premium Membership</Text>

            {/* Tilføj "Rediger" knap uden funktionalitet */}
            <View style={styles.editButtonContainer}>
        <Button title="Rediger" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150, // Bredde på billedet
    height: 150, // Højde på billedet
    borderRadius: 75, // Gør billedet rundt
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;