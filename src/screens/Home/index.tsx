import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'
import { useState } from 'react'
import { FlatList } from 'native-base'

type ParticipantsListProps = {
  name: string
  id: string
}

export function HomeScreen() {
  const [participants, setParticipants] = useState<ParticipantsListProps[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleAddParticipant() {
    if (
      participants
        .map((participant) => participant.name)
        .includes(participantName)
    ) {
      return Alert.alert(
        'Participante existe',
        'Esse participante já foi adicionado',
      )
    }

    if (participantName === '') {
      return Alert.alert('Nome inválido', 'O nome não pode ser vazio')
    }

    setParticipants([
      ...participants,
      {
        name: participantName,
        id: String(Math.random()),
      },
    ])

    setParticipantName('')
  }

  function handleRemoveParticipant(id: string) {
    Alert.alert(
      'Remover',
      'Tem certeza que deseja remover esse participante?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setParticipants((prevState) =>
              prevState.filter((participant) => participant.id !== id),
            )
          },
        },
      ],
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.eventListParticipants}>Participantes</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Participant
            name={item.name}
            onRemove={() => handleRemoveParticipant(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Nenhum participante cadastrado
          </Text>
        )}
      />
    </View>
  )
}
