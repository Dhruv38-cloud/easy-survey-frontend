import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const CreateSurvey = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/surveys',
        { survey: { name, description } },
        {
          headers: {
            'token': token
          }
        }
      );
      navigate(`/edit-survey/${response.data.id}`);
    } catch (error) {
      console.error('Error creating survey:', error);
      setError('An error occurred while creating the survey. Please try again.');
    }
  };

  return (
    <Container fluid className="mt-5">

      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Create Survey</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="surveyName">
              <Form.Label>Survey Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter survey name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surveyDescription">
              <Form.Label>Survey Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter survey description"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Survey
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateSurvey;