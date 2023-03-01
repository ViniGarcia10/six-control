import { StatusBar } from "expo-status-bar";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { database } from "../../services/ConfigFirebase";

interface IProduct {
    id?: string;
    description: string;
    quantity: number;
  }
  

export const ScreenServicesList = () => {
    const [estoque, setEstoque] = useState<IProduct[]>([]);

    useEffect(() => {
      SearchProducts();
    }, []);
  
    async function SearchProducts() {
      try {
        const querySnapshot = await getDocs(collection(database, "estoque"));
  
        let listEstoque: any = [];
  
        querySnapshot.forEach((doc: any) => {
          console.log(`${doc.id} => ${doc.data()}`);
          let item = {
            id: doc.id,
            description: doc.data().description,
            quantity: doc.data().quantity,
          };
          listEstoque.push(item);
        });
  
        setEstoque(listEstoque);
      } catch (e) {
        console.error(
          `O erro ${(Math.random() * 100).toFixed().toString()} é :`,
          e
        );
      }
    }
  
    const handleAddProduct = async (product: IProduct) => {
      try {
        const docRef = await addDoc(collection(database, "estoque"), {
          description: product.description,
          quantity: product.quantity,
        });
        console.log("Document written with ID: ", docRef.id);
        SearchProducts();
      } catch (e) {
        console.error(
          `O erro ${(Math.random() * 100).toFixed().toString()} é :`,
          e
        );
      }
    };

  return (
      <View style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginHorizontal: 20,
        }}
      >
        {estoque.map((item) => (
          <View style={styles.ContainerProduct} key={item.id}>
            <Text>Id: {item.id}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Quantidade: {item.quantity}</Text>
          </View>
        ))}

        <View style={{ margin: 30 }}>
          <Button
            title="ADD"
            color={"blue"}
            onPress={() =>
              handleAddProduct({
                description: `Produto ${Number(
                  (Math.random() * 100).toFixed()
                )}`,
                quantity: Number((Math.random() * 100).toFixed()),
              })
            }
          />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      marginRight: 20,
      marginLeft: 20,
    },
    ContainerProduct: {
      height: 100,
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 10,
      marginBottom: 30
    },
  });