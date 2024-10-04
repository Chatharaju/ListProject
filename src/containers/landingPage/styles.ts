import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
    },
    title: {
        backgroundColor: '#F3F3F3',
        height: 28,
        display: 'flex',
        justifyContent: 'center'
    },
    titleText: {
        paddingLeft: 20,
        fontSize: 15, 
        fontWeight: 'bold'

    },
    centeredAvatar: {
      position: 'absolute',
      width: 100,
      height: 100,
      zIndex: 1,
    },
  });

  export default styles;