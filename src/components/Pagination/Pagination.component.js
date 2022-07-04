import { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ContextApp } from "../../App";
import FormSelectPaginationSize from "../Forms/FormSelectPaginationSize.component";

const Pagination = ({ }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(4);

  const contextApp = useContext(ContextApp);

  let listItem = contextApp.listFilm;
  let setListItemToDisplay = contextApp.setListItemToDisplay;

  useEffect(() => {
    paginate(null, 1);
  }, [listItem, paginationSize])

  // Méthode pour paginer précèdent ou suivant, ou directement sur la page choisie
  const paginate = (action = "next", pageNumber = 0) => {
    let increment = 0;

    if (action)
      increment = action === "next" ? 1 : -1;

    pageNumber = (pageNumber === 0 ? currentPage : pageNumber) + increment;

    setCurrentPage(pageNumber);
    setListItemToDisplay(listItem.slice((pageNumber - 1) * paginationSize, pageNumber * paginationSize));
  }

  return (
    <Row className="justify-content-md-center">
      <Col md="3">
        <Row className="text-center">
          <span>Navigation</span>
        </Row>
        <Row>
          <Col>
            {<Button
              disabled={!(currentPage > 1) || listItem.length === 0}
              className="btn-primary pull-right"
              onClick={() => (paginate("prev"))}
            >{"<"}</Button>}
          </Col>
          <Col>
            {<Button
              disabled={!(currentPage * paginationSize < listItem.length) || listItem.length === 0}
              className="btn-primary pull-left"
              onClick={() => (paginate("next"))}
            >{">"}</Button>
            }
          </Col>
        </Row>
      </Col>
      <Col md="3">
        <FormSelectPaginationSize
          setPaginationSize={setPaginationSize}
        />
      </Col>
    </Row>
  )
}

export default Pagination;
