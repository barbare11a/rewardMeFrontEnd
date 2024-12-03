import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList, Button } from "react-native";
import { RNCamera } from "react-native-camera";
import spendingData from "@/data/spending.json"; 

const QRScannerScreen = () => {
  const [transactions, setTransactions] = useState(spendingData);
  const [scanned, setScanned] = useState(false);

 
  const handleBarCodeRead = (e: { data: string }) => {
    if (!scanned) {
      setScanned(true);

     
      const newTransaction = {
        id: (transactions.length + 1).toString(),
        name: "Scanned Organization",
        amount: "0.00", 
        date: new Date().toISOString().split("T")[0],
      };

    
      setTransactions((prev) => [...prev, newTransaction]);

      
      Alert.alert("Congrats!", "You earned 100 points!", [
        {
          text: "OK",
          onPress: () => setScanned(false), 
        },
      ]);
    }
  };

 
  const saveTransactions = () => {
    
    console.log("Transactions saved:", transactions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
          <View style={styles.overlay}>
            <Text style={styles.scanText}>Align QR code within the frame</Text>
          </View>
        </RNCamera>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>Transactions:</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
          )}
        />
        <Button title="Save Transactions" onPress={saveTransactions} />
      </View>
    </View>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  cameraWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scanText: {
    color: "#FFF",
    fontSize: 16,
    padding: 20,
  },
  infoWrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 14,
    color: "#555",
  },
});
