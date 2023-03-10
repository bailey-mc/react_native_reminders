import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const App = () => {
  const [remind, onChangeRemind] = React.useState()
  const [reminders, setReminders] = useState([])
  const [count, setCount] = useState(0)
    //date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //to convert date/time to string for reminder
  let time = date.toLocaleString()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diaryz</Text>
      <TextInput
        value={remind}
        style={styles.input}
        onChangeText={onChangeRemind}
        placeholder="Reminder to..."
      />
      
      <Button onPress={showDatepicker} title="Select Date" />
      <Button onPress={showTimepicker} title="Select Time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}     
      <Text>selected: {date.toLocaleString()}</Text>
      <Button
        title="Add Reminder"
        onPress={()=>{
          setReminders([
            ...reminders,
            {id: count, name: remind, time: time}
          ]);
          onChangeRemind('');
          setCount(count + 1);
        }}
      />
      <Text style={styles.reminderLabel}>Reminders</Text>
      {reminders.length < 1 ?
        <Text> You have no reminders at this time.</Text>
      :
        <>
          {reminders.map((reminder)=> {
            return(
              <>
                <View
                style={styles.reminders}
                key={reminder.id}
                >
                  <BouncyCheckbox 
                    size={25}
                    onPress={(isChecked: boolean) => {}} 
                    text= {reminder.name} 
                  />
                  <Text>at {reminder.time}</Text>
                </View>
              </>
            )
          })}
        </>
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100,
  },
   input: {
    backgroundColor: '#D3D3D3',
    height: 40,
    width: 200,
    padding: 10,
    borderRadius: 4,
  },
  label: {
   color: 'black',
   margin: 20,
   marginLeft: 0,
  },
  button: {
    marginTop: 40,
    height: 40,
    borderRadius: 4,
  },
  reminders: {
    alignSelf: 'left',
    marginLeft: 20,
  },
  reminderLabel: {
    fontSize: 25,
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
});

// export default LotsofNames;
export default App;