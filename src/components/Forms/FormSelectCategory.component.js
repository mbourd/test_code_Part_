import { Formik } from "formik";
import * as Yup from "yup";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { service } from "../..";
import { connect } from "react-redux";

const FormSelectCategory = ({
  listAllFilm,
  setListFilm
}) => {
  const [listCategory, setListCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    service.film.getAllCategory()
      .then(r => {
        let list = [];

        r.forEach((v, i) => {
          list.push({ label: v, value: v });
        });
        setListCategory(list);
      })
  }, []);

  useEffect(() => {
    let allCategory = [];
    let categoryHasFilms = false;

    listAllFilm.forEach((v, i) => {
      allCategory.push(v.category);
    });
    allCategory = [...new Set(allCategory)];
    setListCategory(allCategory.map(c => ({ label: c, value: c })));

    listAllFilm.every((v, i) => {
      if (v.category === currentCategory) {
        categoryHasFilms = true;
        return false;
      }

      return true;
    });

    if (!categoryHasFilms && currentCategory !== "all") {
      setCurrentCategory("all");
      setListFilm(listAllFilm);
    }

  }, [listAllFilm])

  return (
    <Formik
      // Valeurs initiales
      initialValues={{
        category: "all"
      }}

      // Vérification pour les champs
      validationSchema={() => Yup.object().shape({
        category: Yup.string().required("Veuillez selectionner la catégorie")
      })}

      // Lors du submit
      onSubmit={async (values) => {

      }}
    >
      {({ errors, touched, values, handleSubmit, handleChange, setFieldValue }) => (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Catégories</Form.Label>
                <Form.Control
                  name="category"
                  as="select"
                  onChange={(e) => {
                    if (e.target.value === "all")
                      setListFilm(listAllFilm);
                    else {
                      setListFilm(listAllFilm.filter(v => v.category === e.target.value))
                    }
                    setCurrentCategory(e.target.value);
                    setFieldValue("category", e.target.value);
                  }}
                  value={values.category}
                >
                  <option
                    value="all">
                    Tous
                  </option>
                  {listCategory.map((option, index) => {
                    return (
                      <option
                        key={`option-${index}`}
                        value={option.value}>
                        {option.label || option.value}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

const mapStateToProps = (state) => {
  return { _listAllFilm: state.listAllFilm }
}

export default connect(mapStateToProps)(FormSelectCategory);
