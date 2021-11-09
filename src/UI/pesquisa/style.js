import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  basico: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  textosBasicos: {
    color: 'white',
    fontSize: 25,
  },
  textInput: {
    width: '50%',
    borderWidth: 1,
    padding: 10,
    color: 'white',
    marginTop: 40,
    position: 'absolute',
    flex: 1
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  item: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#ffc600',
    fontSize: 24
  }
})