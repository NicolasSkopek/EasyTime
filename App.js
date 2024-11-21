import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [formData, setFormData] = useState({ dateTime: '', title: '', type: '' });
  const [editingAlarmIndex, setEditingAlarmIndex] = useState(null);

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

  return (
    <View style={styles.container}>
      {/*imagem*/}
      <Image
        style={styles.image}
        source={require('./src/images/logo.png')}
      />

      {/*botão*/}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleForm}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

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
          <TextInput
            style={styles.input}
            placeholder="Data e horário do alarme"
            value={formData.dateTime}
            onChangeText={(text) => setFormData({ ...formData, dateTime: text })}
          />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 380,
    height: 180,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
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
    top: 200,
    left: 20,
    right: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
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
    top: 10,
    right: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  option: {
    fontSize: 16,
    marginVertical: 5,
  },
  selectedOption: {
    fontSize: 16,
    marginVertical: 5,
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
});
