// screens/InvoiceScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';

const initialInvoices = [
  { id: '1', tenant: 'Tenant 1', amount: 1000, status: 'Paid', date: '2023-01-01' },
  { id: '2', tenant: 'Tenant 2', amount: 1200, status: 'Unpaid', date: '2023-02-01' }
];

export default function InvoiceScreen() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [modalVisible, setModalVisible] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ tenant: '', amount: '', status: '', date: '' });

  const handleCreateInvoice = () => {
    setInvoices([...invoices, { ...newInvoice, id: (invoices.length + 1).toString() }]);
    setModalVisible(false);
    setNewInvoice({ tenant: '', amount: '', status: '', date: '' });
  };

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <FlatList
        data={invoices}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeIn" style={styles.invoiceItem}>
            <Text>{`ID: ${item.id}`}</Text>
            <Text>{`Tenant: ${item.tenant}`}</Text>
            <Text>{`Amount: ${item.amount}`}</Text>
            <Text>{`Status: ${item.status}`}</Text>
            <Text>{`Date: ${item.date}`}</Text>
          </Animatable.View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Create Invoice" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <Animatable.View animation="fadeIn" style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tenant"
            value={newInvoice.tenant}
            onChangeText={(text) => setNewInvoice({ ...newInvoice, tenant: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={newInvoice.amount}
            onChangeText={(text) => setNewInvoice({ ...newInvoice, amount: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={newInvoice.status}
            onChangeText={(text) => setNewInvoice({ ...newInvoice, status: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={newInvoice.date}
            onChangeText={(text) => setNewInvoice({ ...newInvoice, date: text })}
          />
          <Button title="Submit" onPress={handleCreateInvoice} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </Animatable.View>
      </Modal>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  invoiceItem: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
