import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Com.saude 2.0</Text>
      <Text style={styles.subHeader}>Sua saúde mais conectada!</Text>
      <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} />
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
});
