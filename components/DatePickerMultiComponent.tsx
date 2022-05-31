import { FC, useCallback, useContext, useEffect, useState } from "react"
import React, { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { en, enGB, registerTranslation, } from 'react-native-paper-dates'
import { DatePickerModal } from 'react-native-paper-dates';
import { ThemeContext } from "../context/ThemeContext";
import UserNameComponent from './UserNameComponent';
registerTranslation('en', en)
registerTranslation('en-GB', enGB)


const DatePickerMultiComponent: FC = () => {
  const { secondaryTextColor, lightLilacColor, yellowColor, blueColor } = useContext(ThemeContext)
  const [dates, setDates] = useState<Date[] | undefined>();
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback((params) => {
    setOpen(false);
    setDates(params.dates);

  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: blueColor,
      accent: lightLilacColor,

    },
  }

  return (

    <PaperProvider theme={theme}>
      <DatePickerModal
        locale="en"
        mode="multiple"
        visible={open}
        onDismiss={onDismiss}
        dates={dates}
        onConfirm={onConfirm}
        validRange={{
          startDate: new Date(),  
          
        }}
      />

    </PaperProvider>

  )

}



export default DatePickerMultiComponent