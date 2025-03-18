import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  // Usando o hook useFonts para carregar as fontes
  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('./assets/fonts/NunitoSans_7pt_Condensed-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  // Dados do que tem no aplicativo com descrição
  const data = [
    {
      id: '1',
      name: 'IMC',
      description: 'Vamos calcular o seu IMC?',
      image: 'https://lucianaspina.com.br/wp-content/uploads/2018/05/IMC.jpg',
    },
    {
      id: '2',
      name: 'Exercícios',
      description: 'Escolha algum exercício físico para praticar',
      image: 'https://webrun.com.br/wp-content/uploads/2023/05/exercicio-fisico.jpg',
    },
    {
      id: '3',
      name: 'Meditação',
      description: 'Saiba como fazer uma meditação eficaz',
      image: 'https://catracalivre.com.br/wp-content/uploads/sites/19/2017/05/Medita%C3%A7%C3%A3o-iStock.jpg',
    },
    {
      id: '4',
      name: 'Beber água',
      description: 'Beber água nunca é demais. Já bebeu quantos copos hoje?',
      image: 'https://www.lavanguardia.com/files/image_990_484/uploads/2016/05/18/5fa2cf175c2c6.jpeg',
    },
  ];

  // Dados dos influencers
  const influencers = [
    {
      id: '5',
      name: 'Patrícia Leite',
      image: 'https://www.patricialeite.com/wp-content/uploads/2021/03/Dra-patricia-leite-nogueira-605x1024.jpg',
    },
    {
      id: '6',
      name: 'Carol Borba',
      image: 'https://supertreinosapp.com.br/wp-content/uploads/2024/07/carol-borba3.jpg',
    },
    {
      id: '7',
      name: 'Gracyanne Barbosa',
      image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/03/12/1449931660-graoficial3374417928770015467130327356921364231770567n-1.jpg',
    },
    {
      id: '8',
      name: 'Tiago Tatton',
      image: 'https://vp2uploads.s3.amazonaws.com/22592/palestrantes/a7f41f7e241a23287e43cf7b32196328f3ee98f4.jpg',
    },
    {
      id: '9',
      name: 'Aline Cassaro',
      image: 'https://alinecassaro.com.br/wp-content/uploads/2024/05/2-e1717204704452.png',
    },
  ];

  const handleInfluencerPress = (influencer) => {
    Alert.alert(
      'Influenciador Clicado',
      `Você clicou em ${influencer.name}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Com.saude 2.0</Text>
      <Text style={styles.subHeader}>Sua saúde mais conectada!</Text>
      <ScrollView>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
        <Text style={styles.influencerHeader}>Influenciadores</Text>
        <View style={styles.influencersContainer}>
          {influencers.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.influencerRow}
              onPress={() => handleInfluencerPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.influencerImage} />
              <View style={styles.influencerTextContainer}>
                <Text style={styles.influencerName}>{item.name}</Text>
              </View>
              <Text style={styles.arrow}></Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Nunito-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontFamily: 'Nunito-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#008000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Nunito-Medium',
    fontWeight: 'bold',
    marginTop: 6,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Nunito-Medium',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  influencerHeader: {
    fontSize: 20,
    fontFamily: 'Nunito-Medium',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  influencerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  influencerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  influencerTextContainer: {
    flex: 1,
  },
  influencerName: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  arrow: {
    fontSize: 20,
    color: '#888',
  },
  influencersContainer: {
    marginTop: 10,
  },
});