import React from 'react';
import { 
  StyleSheet, justify, 
  Text, View, 
  ImageBackground, 
  Image, Button, 
  TextInput, 
  FlatList, List, 
  ListItem, ScrollView  } from 'react-native';
//import MenuItem from '.src/comp/MenuItem';
import { Container, Content } from 'native-base'
import { StackNavigator } from 'react-navigation';
const postk = 'http://mhs.rey1024.com/appmobile/D1615051107/kirimData.php';
const getk = 'http://mhs.rey1024.com/appmobile/D1615051107/getData.php';

async function getkomen(){
    try {
          let response = await fetch(getk);
          let responseJson = await response.json();
          return responseJson.data; // list komentar
       } catch (error){

          console('Error')
          }
}
async function postkomen(d){

   /* try {
          let response = await fetch(postk,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
          });
          let responseJson = await response.json();
          return responseJson.result; // list komentar
       } catch (error){

          console('Error is ')
          }*/

    fetch('http://mhs.rey1024.com/appmobile/D1615051107/kirimData.php', {
      method: 'POST',
      headers: { 
               'Accept': 'application/json',
               'Content-Type': 'application/json' 
               },
      body: JSON.stringify({nama: d.nama, idfilm: "2222", komentar: d.komentar})
    })
    .then((response) => JSON.stringify(response.json())) 
    .then((responseData) => { console.log("response: " + responseData); })
    .catch((err) => { console.log(err); });

}





class HomeScreen extends React.Component {


  state = {
    data:[],
  };
  //i="denpasar"; 
  componentWillMount(){
    this.fetchData();

  }
    fetchData = async () => {

      const response = await fetch("http://www.theimdbapi.org/api/find/movie?title="
        +this.state.judul+
        "&year="+this.state.tahun
        );
      const json = await response.json();
      this.setState({ 
       data:json
      });
    };



  render() {
      return(
        <ImageBackground
          
          style={styles.container}>


              <View style={styles.header}>
                  <Text style={styles.textHeader}>Rating Filem</Text>
              </View>

              <View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan Judul"
                          onChangeText=   {(judul)=>this.setState({judul})}
                          keyboardType = 'numeric'
                        />

                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Tahun"
                          onChangeText=   {(tahun)=>this.setState({tahun})}
                          keyboardType = 'numeric'
                        />

                        <Button
                          onPress={this.componentWillMount = this.componentWillMount.bind(this)
                            
                          }
                          title="CARI"
                          accessibilityLabel="Klik untuk menghitung"
                        />

                    </View>
              </View>

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                      <View style={styles.ListItem}>
                        <Text style={styles.ListFirst} 

                            
                          onPress={() => {
                            this.props.navigation.navigate('Details', {

                              otherParam: item.title,
                              story: item.storyline,
                              rating: item.rating,
                              id: item.imdb_id,
                              poster: item.large,
                            });
                          }}
                      

                         >{item.title  }
                         
                        </Text>
                      </View>
                    }
                />

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const otherParam = params ? params.otherParam : null;
    const story = params ? params.story : null;
    const rating = params ? params.rating : null;
    const id = params ? params.id : null;
    const poster = params ? params.poster : null;
    return (

           <ImageBackground
       
          style={styles.container}>

              <ScrollView>
              <View style={{ flex: 1, marginLeft:  20,marginRight:  20, marginTop:  50, alignItems: 'center' }}>  
                  <Image
                    source={{
                      uri: (poster)

                    }}
                    style={{width: '100%', height: '100%'}}
                  />
                    
                    <Text style = {{fontSize:18, color: '#212121'}}>

                    Judul :  {JSON.stringify(otherParam)}

                    </Text>

                    <Text style = {{fontSize:18, color: '#212121', marginTop: 20}}>

                    Rate :  {JSON.stringify(rating)}

                    </Text>
              </View>
              <View style={{ backgroundColor:'#ffff', margin: 30 }} >
                    <Text style = {{fontSize:18, color: '#212121', margin: 40}}>

                    {JSON.stringify(story)}

                    </Text>
              


                    <TextInput style = {{height: 40, fontSize:18, color: '#212121', margin: 10}}
                                
                                  placeholder="   Masukkan Nama"
                                  onChangeText=   {(nama)=>this.setState({nama})}
                                  keyboardType = 'numeric'
                    />
                    <TextInput style = {{height: 40, fontSize:18, color: '#212121', margin: 10, height: 50}}
                                
                                  placeholder="   komentar"
                                  onChangeText=   {(komentar)=>this.setState({komentar})}
                                  keyboardType = 'numeric'
                    />
                      <Button
                           onPress={()=>this.setState({
                postkomen: (this.state.nama,this.state.komentar),

                         })}
                          title="CARI"
                          accessibilityLabel="Klik untuk menghitung"
                      />

                    <View style={{borderWidth: 2, borderColor: 212121}}>

                      <Text></Text>
                      <Text></Text>
                    </View>
              </View>

              </ScrollView>
                    <Button
                      title="Kembali"
                      onPress={() => this.props.navigation.goBack()}
                    />          

        </ImageBackground>

    );
  }
} 


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  overlayContainer: {
      flex: 1,
      backgroundColor: 'rgba(1,1,1, .35)'
  },
  header:{
//    backgroundColor: 'rgba(255, 255, 255, .100)',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  Textx: {
    fontSize: 20,
    color: '#212121',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textHeader: {
      fontSize: 28 ,
      color: '#212121',
      borderWidth: 2,
      borderColor: '#212121',
      padding: 20,
      paddingLeft: 80,
      paddingRight: 80,
      backgroundColor: 'rgba(255, 255, 255, .1)'
  },
  footer:{
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textFooter: {
    fontSize: 15 ,
    color: '#fff',
  },
  menuContainer: {

      height: '30%',
      flexDirection: 'row',
      flexWrap: 'wrap',

  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40.6666%',
    padding: 15,
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 2,
  },
  Image: {
    width: '100%',
    height: '100%',
    //opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    //borderWidth: 1,
  },
  sleding: {
      marginTop: 30,

  },
  g1: {
    width: '100%',
    height: 250,
    opacity: 0.9,
    borderColor: '#fff',
    borderWidth: 3,
  },
  ListItem: {
        backgroundColor:'#ffff',
        marginTop: 5,
        flex: 1,  
        marginRight: 20,
        marginLeft: 20,
        height: 50
    },
  ListFirst: {
    marginLeft: 20,
    marginTop: 10,
      alignItems: 'center',
      fontSize: 20,
      
    }

});
