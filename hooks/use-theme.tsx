import { useState } from "react";
import { StyleSheet } from "react-native"

export default function UseTheme() {

    const [primaryTextColor, setPrimaryTextColor] = useState("#454444")
    const [secondaryTextColor, setSecondaryTextColor] = useState("#5D5D5D")
    const [primaryColor, setPrimaryColor] = useState("#FFFFFF")
    const [lightLilacColor, setlightLilacColor] = useState("#D9DBE7")
    const [lilacColor, setLilacColor] = useState("#A3A0B3")
    const [orangeColor, setOrangeColor] = useState("#E2683C")
    const [purpleColor, setPurpleColor] = useState("#6455B5")
    const [fuchsiaColor, setFuchsiaColor] = useState("#B74482")
    const [violetColor, setVioletColor] = useState("#A26099")
    const [greenColor, setGreenColor] = useState("#98B117")
    const [yellowColor, setYellowColor] = useState("#F8AA07")
    const [blueColor, setBlueColor] = useState("#1699B1")
    const [primaryFont, setPrimaryFont] = useState("")
    const [bgColor, setBgColor] = useState('#000')


    return { primaryColor, secondaryTextColor, primaryTextColor, lightLilacColor, lilacColor, orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor, bgColor, setBgColor }
}

