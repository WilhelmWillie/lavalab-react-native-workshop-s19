import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  FlatList,
  Linking
} from 'react-native';

export default class App extends React.Component {
  /*
    Constructor: Called whenever a component is created
    Takes in a `props` parameter. Props is data passed down from parent components
    Also allows us to set the internal state of the component
  */
  constructor(props) {
    super(props);

    // Set our components state (data that we want to manage for this App component)
    this.state = {
      searchQuery: '',
      recipes: []
    };
  }

  /*
    Internal method used to hit our Recipe Puppy API and update our state
  */
  fetchRecipes = () => {
    // Hides the keyboard (if it's up)
    Keyboard.dismiss();

    // Store the state's searchQuery into a convenient variable
    const searchQuery = this.state.searchQuery;

    // Hit our Recipe Puppy API w/ some parameters
    // Converts the response from JSON to an object and stores it in our state
    fetch(`http://www.recipepuppy.com/api/?q=${searchQuery}&p=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          recipes: data.results
        })
      });
  }

  /*
    Method that we pass as a prop to our FlatList
    Given a Javascript object, tells our FlatList component how to render each item
  */
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

  /*
    In React, if an item is part of an array and is being rendered, it needs a unique key to make sure
    updates like delete are properly handled. Keys are supposed to be unique (so like an Id or something like that)
    but in this case, we'll make the key the index it appears in the array plus the item's title (should be unique enough)
  */
  keyExtractor = (item, index) => {
    return index + '-' + item.title;
  }

  /*
    How will our app render our components.
    This will be updated everytime data passed down to components changes
  */
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

/*
  React Native stylesheets work very similarly to CSS styles
  I highly recommend looking into flexbox and how it works because it helps out a lot w/ layouts 
*/
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
