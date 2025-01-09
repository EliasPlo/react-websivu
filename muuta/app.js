import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Button from './Button';
import { useState, useEffect } from 'react';

const App = () => {
  const [pets, setPets] = useState([]);
  const addPet = () => setPets([...pets, `Lemmikki ${pets.length + 1}`]);

  /*const fetchPets = async () => {
    const apiUrl = 'https://koira-api.herokuapp.com/api/v1/dogs'
    const response = await fetch(apiUrl)
    const data = await response.json()
    setPets(data)
  }
 
  useEffect(() => {
    fetchPets ()
  }, [])
 */
  // useEffect(() =>{
  //   console.log('pets:', pets);
  // }, [pets])
  
  // setPets(fetchPets())
 
  let index = 0
 
  const handleClick = () => {
    index++
  }

  return (
    <div className="App">
      <Header title='Nuuhkukuonot' />
      {pets.map((pet, i) =>
      <div key={i}>
        <h3>{pet.name}</h3>
        <img src={pet.image} alt={pet.name}></img>
        <button onClick={handleClick}>Tykkää</button>
        <p>{index}</p>
      <Content title={pet.title} pic={pet.imageUrl}  />
      </div>
      )}
      <button onClick={addPet}>Lisää lemmikki</button>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>{pet}</li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}


export default App;
