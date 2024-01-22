import React, { useState } from 'react'

import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles'

import { Participant } from '../../components/Participant'

export default function Home() {
  const [participants, setParticipants ] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) return Alert.alert('Participante já existe', 'Já existe um participante com este nome na listagem')

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.event}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Terça-feira, 16 de janeiro de 2024.</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome do evento' 
          placeholderTextColor='#6b6b6b' 
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.  
          </Text>
        )}
      />

    </View>
  );
}
