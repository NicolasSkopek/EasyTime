import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [formData, setFormData] = useState({ dateTime: '', title: '', type: '' });
  const [editingAlarmIndex, setEditingAlarmIndex] = useState(null);
  const [showCalendario, setShowCalendario] = useState(false);
  const [selectHours, setSelectHours] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingAlarmIndex(null);
    setFormData({ dateTime: '', title: '', type: '' });
    setSelectedType('');
  };

  const handleSave = () => {
    if (formData.dateTime && formData.title && selectedType) {
      if (editingAlarmIndex !== null) {

        const updatedAlarms = [...alarms];
        updatedAlarms[editingAlarmIndex] = { ...formData, type: selectedType };
        setAlarms(updatedAlarms);
      } else {

        setAlarms([...alarms, { ...formData, type: selectedType }]);
      }
      closeForm();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleEdit = (index) => {
    setEditingAlarmIndex(index);
    setFormData(alarms[index]);
    setSelectedType(alarms[index].type);
    setIsFormVisible(true);
  };

  [/*Dias da semana*/]
  const calendario = () => (
    <View style={styles.calendarContainer}>
      {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day) => (
        <TouchableOpacity
          key={day}
          style={styles.dayButton}
          onPress={() => {
            setSelectedDay(day); // Atualiza o dia selecionado
            setSelectHours(true); // Exibe o componente "horario"
          }}
        >
          <Text style={styles.calendarText}>{day}</Text>
        </TouchableOpacity>
      ))}

      {/* Exibe o componente "horario" se um dia foi selecionado */}
      {selectHours && horario()}
    </View>
  );

    [/*Horarios*/]
    const horario = () => (
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>Horários para {selectedDay}:</Text>

        {/* TextInput para adicionar horário */}
        <TextInput
          style={styles.input}
          placeholder="Digite o horário"
          value={selectedTime} // Assume que você tem um estado `selectedTime` para armazenar o valor
          onChangeText={(text) => setSelectedTime(text)} // Atualiza o estado com o horário digitado
          keyboardType="default" // Definido como numérico, se o formato for para horas/minutos
        />

        {/* Botão para cancelar */}
        <TouchableOpacity
          style={styles.dayButton}
          onPress={() => setSelectHours(false)} // Fecha o horário
        >
          <Text style={styles.calendarText}>Cancelar</Text>
        </TouchableOpacity>

        {/*Criar  lógica de salvamento*/}
        <Button title="Salvar" onPress={handleSave} />

      </View>
    );


  return (
    <View style={styles.container}>
      {/*Header*/}
          <View style={styles.header}>
          <Text style={styles.headerText}>Easy Time</Text>
          </View>
          
      {/*Main*/}

        {/*lista alarmes*/}
          <View style={styles.alarmsContainer}>
            {alarms.map((alarm, index) => (
              <View key={index} style={styles.alarmItem}>
                <Text style={styles.alarmText}>📅 {alarm.dateTime}</Text>
                <Text style={styles.alarmText}>📌 {alarm.title}</Text>
                <Text style={styles.alarmText}>🛑 {alarm.type}</Text>
                <Button title="Editar" onPress={() => handleEdit(index)} />
              </View>
           ))}
          </View>

      {/*Adicionar*/}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleForm}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      
      {/*Formulário*/}

      {/*overlay*/}
      {isFormVisible && <View style={styles.overlay} />}

      {/*formulário*/}
      {isFormVisible && (
        <View style={styles.formContainer}>
          {/*fechar*/}
          <TouchableOpacity style={styles.closeButton} onPress={closeForm}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.formTitle}>
            {editingAlarmIndex !== null ? 'Editar Alarme' : 'Novo Alarme'}
          </Text>

          {/*data e hora */}
          <TouchableOpacity
            style={styles.buttonInput}
            onPress={() => setShowCalendario(!showCalendario)}
          >
            <Text style={styles.dateText}> Data e horário do alarme</Text>
          </TouchableOpacity>

          {showCalendario && calendario()}

          {/*titulo*/}
          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          {/*tipos de alarme*/}
          <Text>Escolha o tipo de alarme:</Text>
          <TouchableOpacity onPress={() => setSelectedType('Medicamento')}>
            <Text style={selectedType === 'Medicamento' ? styles.selectedOption : styles.option}>Medicamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType('Atividade Física')}>
            <Text style={selectedType === 'Atividade Física' ? styles.selectedOption : styles.option}>Atividade Física</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType('Consulta Médica')}>
            <Text style={selectedType === 'Consulta Médica' ? styles.selectedOption : styles.option}>Consulta Médica</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType('Outro')}>
            <Text style={selectedType === 'Outro' ? styles.selectedOption : styles.option}>Outro</Text>
          </TouchableOpacity>

          <Button title="Salvar" onPress={handleSave} />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: '15%',
    backgroundColor: '#533971',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    position:'absolute',
    color:'white',
    fontSize: hp(6)

  },
  floatingButton: {
    position: 'absolute',
    bottom: '4%',
    right: "7%",
    backgroundColor: '#563391',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  formContainer: {
    position: 'absolute',
    top: '25%',
    left: "5%",
    right: "5%",
    backgroundColor: '#f9f9f9',
    padding: "5%",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: "4%",
    right: "4%",
    backgroundColor: '#ff4d4d',
    borderRadius: 20,
    width: "9%",
    height: "9%",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
  option: {
    fontSize: hp(2.1),
    marginVertical: "1.5%",
  },
  selectedOption: {
    fontSize: hp(2.1),
    marginVertical: "1.5%",
    fontWeight: 'bold',
    color: '#563391',
  },
  alarmsContainer: {
    marginTop: 170,
  },
  alarmItem: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  alarmText: {
    fontSize: 14,
  },
    buttonInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 10,
    },
     calendarContainer: {
       position: 'absolute',  // Faz com que o calendário seja posicionado em relação ao pai
       top: 100,  // Define a distância a partir do topo da tela (ajuste conforme necessário)
       left: 20,  // Define a distância a partir da esquerda (ajuste conforme necessário)
       right: 20,  // Garante que o calendário ocupe toda a largura disponível
       padding: 10,  // Maior padding para tornar o espaço interno maior
       backgroundColor: '#ededed',
       borderRadius: 10,  // Bordas mais arredondadas
       alignItems: 'center',  // Alinha o conteúdo no centro
       zIndex: 1,  // Faz com que o calendário fique acima dos outros elementos
       height: '80%',  // Faz com que o calendário ocupe 80% da altura da tela (ajuste conforme necessário)
     },
      dayButton: {
        borderWidth: 0.4,               // Adiciona o contorno ao botão
        borderColor: '#333',          // Cor do contorno
        borderRadius: 5,              // Arredonda os cantos do botão
        paddingVertical: 3,          // Espaçamento vertical dentro do botão
        paddingHorizontal: 106,        // Espaçamento horizontal dentro do botão
        margin: 1.5,                    // Espaçamento entre os botões
        backgroundColor: '#fff',      // Cor de fundo do botão
        alignItems: 'center',         // Centraliza o texto no botão
        justifyContent: 'center',     // Centraliza o texto no botão
      },

      calendarText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',         // Garante que o texto fique centralizado
      },
      dateText: {
        top: 9,
        fontSize: 14,
        color: '#9c9a9a',
      },
});
