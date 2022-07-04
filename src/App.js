import logo from './logo.svg';
import './App.css';
import { Container, Col, Row, Button, Form, Card, ListGroup } from "react-bootstrap";
import Film from './components/Film/Film.component';
import { useEffect, useState, createContext } from 'react';
import { service, store } from '.';
import Pagination from './components/Pagination/Pagination.component';
import FormSelectCategory from './components/Forms/FormSelectCategory.component';
import { connect } from 'react-redux';
import { REPLACE_LISTALLFILM } from './store/actionType';

export const ContextApp = createContext();

const App = ({
  _listAllFilm // Liste des films sauvegardés dans le store
}) => {
  const [listFilm, setListFilm] = useState([]); // Liste des films qui sont utilisés par exemple lors du choix de la catégorie
  const [listItemToDisplay, setListItemToDisplay] = useState([]); // Liste des films qui sont affichés, lors de la pagination

  useEffect(() => {
    service.film.getAll()
      .then((response) => {
        store.dispatch({ type: REPLACE_LISTALLFILM, value: response });
        setListFilm(response);
      })
      .catch((error) => { console.error(error) });
  }, []);

  return (
    <ContextApp.Provider value={{listFilm, setListFilm, listItemToDisplay, setListItemToDisplay}}>
      <div className="App">
        <Container>
          <Row>
            <FormSelectCategory />
          </Row>
          <Row className="justify-content-md-center">
            <Col md="1"></Col>
            <Col md="10">
              <Row>
                {
                  // List de tout les films
                  listItemToDisplay.length > 0 &&
                  listItemToDisplay.map((film, key) => {
                    return <Film
                      key={key}
                      filmData={film}
                    />
                  })
                }
              </Row>
            </Col>
            <Col md="1"></Col>
          </Row>
          <Row>
            <Col>
              {/* Pagination component */}
              <Pagination />
            </Col>
          </Row>
        </Container>
        <footer>
        </footer>
      </div>
    </ContextApp.Provider>
  );
}

const mapStateToProps = (state) => {
  return { _listAllFilm: state.listAllFilm }
}

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps)(App);
