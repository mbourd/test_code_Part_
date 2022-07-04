import { createRef, useEffect, useState } from "react";
import { Card, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import styleFilm from "./Film.css"
import { connect } from "react-redux";

const Film = ({
  _listAllFilm,
  filmData,
  listAllFilm,
  setListAllFilm,
  listFilm,
  setListFilm,
  listItemToDisplay,
  setListItemToDisplay
}) => {
  const refCard = createRef();

  const deleteCard = () => {
    setListAllFilm(v => listAllFilm.filter(item => item.id !== filmData.id))
    setListFilm(v => listFilm.filter(item => item.id !== filmData.id))
    setListItemToDisplay(v => listItemToDisplay.filter((item, i) => item.id !== filmData.id))
  }

  const addLike = () => {
    if (filmData.hasOwnProperty("isDisabledDislikeBtn")
    && filmData.isDisabledDislikeBtn)
    {
      filmData.likes -= 1;
      filmData.isDisabledLikeBtn = false;
      filmData.isDisabledDislikeBtn = false;
    } else {
      filmData.likes += 1;
      filmData.isDisabledLikeBtn = false;
      filmData.isDisabledDislikeBtn = true;
    }

    let d = listAllFilm.filter(v => v.id !== filmData.id);
    d.push(filmData);
    d.sort((a, b) => {
      if (parseInt(a.id) < parseInt(b.id))
        return -1;

      return 1;
    });
    setListAllFilm(d);
  }
  const addDislike = () => {
    if (filmData.hasOwnProperty("isDisabledLikeBtn")
    && filmData.isDisabledLikeBtn)
    {
      filmData.dislikes -= 1;
      filmData.isDisabledLikeBtn = false;
      filmData.isDisabledDislikeBtn = false;
    } else {
      filmData.dislikes += 1;
      filmData.isDisabledLikeBtn = true;
      filmData.isDisabledDislikeBtn = false;
    }

    let d = listAllFilm.filter(v => v.id !== filmData.id);
    d.push(filmData)
    d.sort((a, b) => {
      if (parseInt(a.id) < parseInt(b.id))
        return -1;

      return 1;
    });
    setListAllFilm(d);
  }

  return (
    <Card ref={refCard} md={1} className="film-card">
      <Card.Header>
        <Row>
          <Col md={8}><span className="film-title">{filmData.title}</span></Col>
          <Col md={4}>
            <Button
              variant="danger"
              onClick={deleteCard}
            >
              X
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        Category : {filmData.category}
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button
              disabled={filmData.isDisabledLikeBtn}
              variant="outline-success"
              onClick={addLike}>
              {filmData.likes} <FontAwesomeIcon icon={faThumbsUp} />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={filmData.isDisabledDislikeBtn}
              variant="outline-warning"
              onClick={addDislike}>
              {filmData.dislikes} <FontAwesomeIcon icon={faThumbsDown} />
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="film-ratio">
          <ProgressBar
            variant="success"
            now={(filmData.likes / (filmData.likes + filmData.dislikes)) * 100}
          />
        </Row>
      </Card.Footer>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return { _listAllFilm: state.listAllFilm }
}

export default connect(mapStateToProps)(Film);
