import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 16,
  },
  tempText: {
    fontSize: 16,
  },
  humidityText: {
    fontSize: 16,
  },
  flatList: {
    flex: 1,
  },
});
export default styles;
