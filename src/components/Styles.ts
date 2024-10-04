import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    gistItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 20,
    },
    fileName: {
      fontSize: 15,
      alignSelf: 'center',
    },
    centeredAvatar: {
      position: 'absolute',
      top: '40%',
      left: '40%',
      width: 100,
      height: 100,
      borderRadius: 50,
      zIndex: 1,
    },
  });

  export default Styles;