import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, TextInput, Modal, Switch } from 'react-native';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  // Usando o hook useFonts para carregar as fontes
  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('./assets/fonts/NunitoSans_7pt_Condensed-Medium.ttf'),
  });

  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showModal, setShowModal] = useState(true); // Modal já inicia aberto
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [atividade, setAtividade] = useState('');
  const [idade, setIdade] = useState(25);
  const [sono, setSono] = useState(8);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);


  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
    alert('Cadastro realizado com sucesso!');
    setShowModal(false);
  };

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
    {/* Modal de Cadastro */}
    <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Seja bem-vindo ao Com.saude 2.0!</Text>
            <Text style={styles.modalSubtitle}>Cadastre-se para ficar de bem com sua saúde 😊</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            {/* Picker de Objetivo de Saúde */}
            <Text style={styles.labelPicker}>Objetivo de Saúde</Text>
            <Picker
              selectedValue={objetivo}
              onValueChange={(itemValue) => setObjetivo(itemValue)}
              style={styles.picker}
            >
            <Picker.Item label="Selecione seu objetivo" value="" />
            <Picker.Item label="Emagrecer" value="emagrecer" />
            <Picker.Item label="Ganhar Massa" value="massa" />
            <Picker.Item label="Melhorar Condicionamento" value="condicionamento" />
            </Picker>

            {/* Picker de Nível de Atividade Física */}
            <Text style={styles.labelPicker}>Nível de Atividade Física</Text>
            <Picker
              selectedValue={atividade}
              onValueChange={(itemValue) => setAtividade(itemValue)}
              style={styles.picker}
            >
            <Picker.Item label="Selecione seu nível" value="" />
            <Picker.Item label="Sedentário" value="sedentario" />
            <Picker.Item label="Leve" value="leve" />
            <Picker.Item label="Moderado" value="moderado" />
            <Picker.Item label="Intenso" value="intenso" />
            </Picker>

            {/* Slider de Idade */}
            <Text style={styles.label}>Sua Idade: {idade} anos</Text>
            <Slider
              value={idade}
              onValueChange={value => setIdade(Math.round(value))}
              minimumValue={10}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#008000"
              maximumTrackTintColor="#ccc"
            />

            {/* Slider de Horas de Sono */}
            <Text style={styles.label}>Horas de Sono por Noite: {sono} horas</Text>
            <Slider
              value={sono}
              onValueChange={value => setSono(Math.round(value))}
              minimumValue={0}
              maximumValue={12}
              step={1}
              minimumTrackTintColor="#008000"
              maximumTrackTintColor="#ccc"
            />

            {/* Switch - Lembretes para Beber Água */}
            <View style={styles.switchRow}>
            <Text style={styles.labelSwitch}>Receber lembretes para beber água</Text>
            <Switch
              value={notificacoesAtivas}
              onValueChange={value => setNotificacoesAtivas(value)}
              trackColor={{ false: '#ccc', true: '#008000' }}
              thumbColor={notificacoesAtivas ? '#34c759' : '#f4f3f4'}
            />
            </View>

            {/* Switch - Modo Escuro */}
            <View style={styles.switchRow}>
            <Text style={styles.labelSwitch}>Ativar modo escuro</Text>
            <Switch
              value={modoEscuro}
              onValueChange={value => setModoEscuro(value)}
              trackColor={{ false: '#ccc', true: '#555' }}
              thumbColor={modoEscuro ? '#000' : '#f4f3f4'}
            />
            </View>
            
            {/* Botões Cadastrar e Talvez mais tarde */}
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastro}>
            <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.talvezButton} onPress={() => setShowModal(false)}>
            <Text style={styles.talvezButtonText}>Talvez mais tarde</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
          </View>
        </View>
      </Modal>
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
// Estilos do pop-up:
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Nunito-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Nunito-Medium',
  },
  labelPicker: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  labelSwitch: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cadastrarButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  talvezButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  talvezButtonText: {
    color: 'green',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
});
