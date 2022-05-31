import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useState } from 'react';

const ReactNativeCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(Date)
  const [datesArr, setDatesArr] = useState<any>([])
  let date = new Date
  return (
    <Calendar

      minDate={"2022-05-08"}
      maxDate={'2025-05-30'}
      onDayPress={(day: any) => {
        setDatesArr([...datesArr, day.dateSring])

      }}

      onDayLongPress={day => {

      }}

      monthFormat={'yyyy MM'}

      onMonthChange={month => {

      }}

      hideArrows={true}

      renderArrow={direction => <Text>Next</Text>}

      hideExtraDays={true}


      disableMonthChange={true}

      firstDay={1}

      hideDayNames={true}

      showWeekNumbers={true}

      onPressArrowLeft={subtractMonth => subtractMonth()}

      onPressArrowRight={addMonth => addMonth()}

      disableArrowLeft={false}

      disableArrowRight={false}

      disableAllTouchEventsForDisabledDays={true}

      enableSwipeMonths={true}
      markingType={'period'}
      markedDates={{
        '2022-05-23': { disabled: true, startingDay: true, color: 'green', endingDay: true }
      }}

      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350
      }}

      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',

        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
  );
};

const styles = StyleSheet.create({

});

export default ReactNativeCalendar;