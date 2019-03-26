import React from 'react';
import { StyleSheet, Text, Button, View, TextInput, Keyboard, FlatList, Linking } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      recipes: []
    };
  }

  fetchRecipes = () => {
    Keyboard.dismiss();

    const searchQuery = this.state.searchQuery;

    fetch(`http://www.recipepuppy.com/api/?q=${searchQuery}&p=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          recipes: data.results
        })
      });
  }

  renderRecipe = (recipe) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{recipe.item.title}</Text>
        <Text style={styles.ingredients}>{recipe.item.ingredients}</Text>

        <Button
          title="View Recipe"
          onPress={() => {
            Linking.openURL(recipe.item.href);
          }}
        />
      </View>
    )
  }

  keyExtractor = (item, index) => {
    return index + '-' + item.title;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
          style={styles.searchBox}
          onChangeText={(searchQuery) => this.setState({searchQuery: searchQuery})}
          value={this.state.searchQuery}
          />

        <Button title="Search" onPress={this.fetchRecipes} color='#17864B'></Button>
        </View>

        <View style={styles.recipeList}>
          <FlatList data={this.state.recipes} renderItem={this.renderRecipe} keyExtractor={this.keyExtractor} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF2F6',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  },
  searchBar: {
    backgroundColor: '#87EFB8',
    width: '100%',
    flexGrow: 0,
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBox: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flexBasis: '80%'
  },
  recipeList: {
    flex: 1,
    paddingBottom: 20
  },
  item: {
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  ingredients: {
    marginBottom: 10
  }
});
