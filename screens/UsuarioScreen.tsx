import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'


///////////////////////////////////////
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../components/Config';

export default function UsuarioScreen() {

  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [ciudad, setCiudad] = useState('')

  const [lista, setLista] = useState([])

  /////////////////// GUARDAR /////////////////////////////////
  function guardar(cedula: string, nombre: string, ciudad: string) {
    //const db = getDatabase();
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      city: ciudad
    });

    setCedula('')
    setNombre('')
    setCiudad('')
  }

  /////////////////////////////////////////////////////
  ///////////////// LEER //////////////////////////

  function leer() {
    const starCountRef = ref(db, 'usuarios/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      let arreglo: any = Object.keys(data).map(key => ({
        key, ...data[key]
      }))

      setLista(arreglo)
    });

    console.log(lista)
  }
  /////////////////////////////////////////////////////
  ///////////////// ACTUALIZAR //////////////////////////

  function actualizar() {
    update(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      city: ciudad
    })
  }

  /////////////////////////////////////////////////////
  ///////////////// AELIMINAR //////////////////////////

  function eliminar() {
    remove(ref(db, 'usuarios/' + cedula))
  }






  type usuario = {
    cedula: string,
    name: string,
    city: string
    key: string
  }


  return (
    <View style={styles.container}>
      <Text>REGISTRO DE USUARIOS</Text>
      {/**----------- ESCRIBIR -----------------------*/}
      <View >
        <TextInput
          placeholder='Ingrese cédula'
          style={styles.input}
          onChangeText={(texto) => (setCedula(texto))}
          value={cedula}
        />
        <TextInput
          placeholder='Ingrese nombre completo'
          style={styles.input}
          onChangeText={(texto) => (setNombre(texto))}
          value={nombre}
        />
        <TextInput
          placeholder='Ingrese ciudad'
          style={styles.input}
          onChangeText={(texto) => (setCiudad(texto))}
          value={ciudad}
        />

        <View style={{ flexDirection: 'row' }}>
          <Button title='guardar' onPress={() => (guardar(cedula, nombre, ciudad))} />
          <Text>   </Text>
          <Button title='leer' onPress={() => leer()} />
        </View>
      </View>

      {/**--------------------- ACTUALIZAR -----------------------*/}
      <View style={{ borderColor:'gray', borderWidth:1, width:'95%', margin:3 }}/>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder='Cédula'
            style={styles.input2}
            onChangeText={(texto) => (setCedula(texto))}
            value={cedula}
          />
          <TextInput
            placeholder='Nombre'
            style={styles.input2}
            onChangeText={(texto) => (setNombre(texto))}
            value={nombre}
          />
          <TextInput
            placeholder='Ciudad'
            style={styles.input2}
            onChangeText={(texto) => (setCiudad(texto))}
            value={ciudad}
          />
        </View>
        <Button title='actualizar' onPress={() => (actualizar())} />
      </View>

      {/**--------------------- ELIMINAR -----------------------*/}
      <View style={{ borderColor:'gray', borderWidth:1, width:'95%', margin:3 }}/>
      <View style={{flexDirection:'row'}}>
        <TextInput
          placeholder='Ingrese cédula'
          style={styles.input2}
          onChangeText={(texto) => (setCedula(texto))}
          
        />
        <Button title='eliminar' color={'red'} onPress={() => eliminar()}/>
      </View>


      {/**--------------------- LEER -----------------------*/}
      <View>
        <FlatList
          data={lista}
          renderItem={({ item }: { item: usuario }) =>
            <View style={{ flexDirection: 'row' }}>
              <Text>{item.key} | </Text>
              <Text>{item.name}</Text>
            </View>
          }
        />
      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },

  input: {
    borderWidth: 1,
    height: 35,
    width: '80%',
    margin: 2,
    borderRadius: 30,
    paddingHorizontal: 20
  },
  input2: {
    borderWidth: 1,
    height: 35,
    width: '30%',
    margin: 2,
    borderRadius: 30,
    paddingHorizontal: 20
  }


})