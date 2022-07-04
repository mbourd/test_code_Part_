import { Formik } from "formik";
import * as Yup from "yup";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";

const FormSelectPaginationSize = ({
  setPaginationSize
 }) => {
  const [listPaginationSize, setListPaginationSize] = useState(
    [
      { value: 4, label: 4 },
      { value: 8, label: 8 },
      { value: 12, label: 12 },
    ]
  );

  return (
    <Formik
      // Valeurs initiales
      initialValues={{
        paginationSize: 2
      }}

      // Vérification pour les champs
      validationSchema={() => Yup.object().shape({
        paginationSize: Yup.number().required("Veuillez selectionner la taille de pagination")
      })}

      // Lors du submit
      onSubmit={async (values) => {

      }}
    >
      {({ errors, touched, values, handleSubmit, handleChange, setFieldValue }) => (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="paginationSize">
                <Form.Label>Taille Pagination</Form.Label>
                <Form.Control
                  name="paginationSize"
                  as="select"
                  onChange={(e) => {
                    setPaginationSize(e.target.value);
                    setFieldValue("paginationSize", e.target.value);
                  }}
                  value={values.paginationSize}
                >
                  {listPaginationSize.map((option, index) => {
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

export default FormSelectPaginationSize;
