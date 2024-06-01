import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        disabled={currentPage === 1}
        onPress={() => setCurrentPage(currentPage - 1)}
      >
        <Text style={[styles.buttonText, currentPage === 1 && styles.disabledButtonText]}>Previous</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            style={[styles.pageButton, currentPage === page && styles.currentPageButton]}
            onPress={() => setCurrentPage(page)}
          >
            <Text style={[styles.pageButtonText, currentPage === page && styles.currentPageButtonText]}>
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
        disabled={currentPage === totalPages}
        onPress={() => setCurrentPage(currentPage + 1)}
      >
        <Text style={[styles.buttonText, currentPage === totalPages && styles.disabledButtonText]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#a0a0a0',
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginHorizontal: 2,
  },
  currentPageButton: {
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
  },
  pageButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  currentPageButtonText: {
    color: '#fff',
  },
});

export default PaginationComponent;
