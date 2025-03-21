import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
// Usando o hook useFonts para carregar as fontes
  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('./assets/fonts/NunitoSans_7pt_Condensed-Medium.ttf'),
  });

  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

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

// Dados dos influenciadores com links para os perfis no Instagram
  const influencers = [
    {
      id: '5',
      name: 'Patrícia Leite',
      image: 'https://www.patricialeite.com/wp-content/uploads/2021/03/Dra-patricia-leite-nogueira-605x1024.jpg',
      description: 'Dra. Patrícia Leite é uma nutricionista brasileira reconhecida por seu trabalho na promoção de hábitos alimentares saudáveis e no auxílio ao emagrecimento. Ela compartilha receitas nutritivas, dicas de alimentação balanceada e orientações para uma vida mais saudável. Sua abordagem prática e acessível conquistou uma ampla audiência nas redes sociais.',
      instagram: 'https://www.instagram.com/drapatricialeite'
    },
    {
      id: '6',
      name: 'Carol Borba',
      image: 'https://supertreinosapp.com.br/wp-content/uploads/2024/07/carol-borba3.jpg',
      description: 'Carol Borba é uma educadora física brasileira conhecida por seus programas de treinamento físico voltados para emagrecimento e condicionamento. Ela compartilha treinos de alta intensidade, dicas de saúde e motivação para seus seguidores adotarem um estilo de vida ativo. Sua energia contagiante e métodos eficazes a tornaram uma referência no mundo fitness.',
      instagram: 'https://www.instagram.com/carolborba1'
    },
    {
      id: '7',
      name: 'Gracyanne Barbosa',
      image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/03/12/1449931660-graoficial3374417928770015467130327356921364231770567n-1.jpg',
      description: 'Gracyanne Barbosa é uma influenciadora fitness brasileira conhecida por sua dedicação aos treinos intensos e sua impressionante forma física. Ela compartilha rotinas de exercícios, dicas de alimentação e motivação para um estilo de vida saudável. Além disso, Gracyanne é referência em musculação feminina no Brasil, inspirando milhares de seguidores com sua disciplina e estilo de vida regrado.',
      instagram: 'https://www.instagram.com/graoficial'
    },
    {
      id: '8',
      name: 'Tiago Tatton',
      image: 'https://vp2uploads.s3.amazonaws.com/22592/palestrantes/a7f41f7e241a23287e43cf7b32196328f3ee98f4.jpg',
      description: 'Tiago Tatton é psicólogo com pós-doutorado em Psiquiatria e Ciências do Comportamento pela UFRGS. É cofundador da Iniciativa Mindfulness no Brasil e membro do Mindfulness Centre of Excellence em Londres. Completou o Advanced Teacher pela Universidade da Califórnia em San Diego e participou de masterclasses no Oxford Mindfulness Centre. É um dos pioneiros no país a trabalhar e pesquisar mindfulness na saúde pública.',
      instagram: 'https://www.instagram.com/tatton_tiago_mindfulness'
    },
    {
      id: '9',
      name: 'Aline Cassaro',
      image: 'https://alinecassaro.com.br/wp-content/uploads/2024/05/2-e1717204704452.png',
      description: 'Aline Cassaro é uma educadora física e empresária que atua na área de correção postural. Ela ministra cursos nas áreas de Avaliação Postural, Periodização aplicada na musculação, Rotas Miofasciais e interferência no movimento corporal, além de Gestão da Consultoria Online. Com ampla experiência, Aline desenvolveu uma metodologia para auxiliar outros profissionais a alcançarem resultados significativos em suas carreiras.',
      instagram: 'https://www.instagram.com/alinecassaro'
    }
  ];

// Função para abrir o Instagram
  const openInstagram = (url) => {
    Linking.openURL(url);
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
              onPress={() => setSelectedInfluencer(item)}
            >
              <Image source={{ uri: item.image }} style={styles.influencerImage} />
              <View style={styles.influencerTextContainer}>
                <Text style={styles.influencerName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {selectedInfluencer && (
          <View style={styles.influencerDetails}>
            <Text style={styles.detailsName}>{selectedInfluencer.name}</Text>
            <Image source={{ uri: selectedInfluencer.image }} style={styles.detailsImage} />
            <Text style={styles.detailsDescription}>{selectedInfluencer.description}</Text>
            <TouchableOpacity onPress={() => openInstagram(selectedInfluencer.instagram)}>
              <Text style={styles.linkText}>Acesse o Instagram</Text>
            </TouchableOpacity>
          </View>
        )}
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
  influencersContainer: {
    marginTop: 10,
  },
  influencerDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsImage: {
    width: '100%',
    height: 700,
    borderRadius: 10,
    marginVertical: 10,
  },
  detailsDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center'
  },
});
