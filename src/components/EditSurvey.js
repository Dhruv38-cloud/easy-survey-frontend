import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const EditSurvey = () => {
  const [survey, setSurvey] = useState(null);
  const [toolboxItems, setToolboxItems] = useState(['label', 'input']);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/surveys/${id}`, {
          headers: {
            'token': token
          }
        });
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };
    fetchSurvey();
  }, [id]);

 const  handleSubmit = async () => {
  
    try {
      const response = await axios.patch(`http://localhost:8080/api/surveys/${id}`,{ survey: survey },
        {
          headers: {
            'token': token
          }
        });
        alert('successfully edited')
      } catch (error) {
      console.error('Error fetching survey:', error);
    }
  
    
  }
  const handleDragStart = (e, type, index) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, index }));
  };

  console.log('sssssssss', survey)

  const handleDrop = (e) => {
    e.preventDefault();
    const { type, index } = JSON.parse(e.dataTransfer.getData('text'));
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (index === undefined) {
      setSurvey(prevSurvey => ({
        ...prevSurvey,
        components: [
          ...prevSurvey.components,
          {
            id: Date.now(),
            component_type: type,
            content: type === 'label' ? survey.name : '',
            x_coordinate: x,
            y_coordinate: y
          }
        ]
      }));
      setToolboxItems(prevItems => prevItems.filter(item => item !== type));
    } else {
      setSurvey(prevSurvey => {
        const newComponents = [...prevSurvey.components];
        newComponents[index] = { ...newComponents[index], x_coordinate: x, y_coordinate: y };
        return { ...prevSurvey, components: newComponents };
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleToolboxDrop = (e) => {
    e.preventDefault();
    const { type, index } = JSON.parse(e.dataTransfer.getData('text'));
    if (index !== undefined) {
      setSurvey(prevSurvey => ({
        ...prevSurvey,
        components: prevSurvey.components.filter((_, i) => i !== index)
      }));
      setToolboxItems(prevItems => [...prevItems, type]);
    }
  };

  const handleContentChange = (index, newContent) => {
    setSurvey(prevSurvey => {
      const newComponents = [...prevSurvey.components];
      newComponents[index] = { ...newComponents[index], content: newContent };
      return { ...prevSurvey, components: newComponents };
    });
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <Container fluid>

      <h1 className="mt-4 mb-4 font-bold">Edit Survey: {survey.name}</h1>
      <Row>
        <Col md={3}>
          <Card
            className="mb-3"
            onDrop={handleToolboxDrop}
            onDragOver={handleDragOver}
          >
            <Card.Header>Toolbox</Card.Header>
            <Card.Body>
              {toolboxItems.map((type, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  className="m-1"
                  draggable
                  onDragStart={(e) => handleDragStart(e, type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card
            style={{ height: '600px', position: 'relative', overflow: 'hidden' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Card.Body>
              {survey.components.map((component, index) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.component_type, index)}
                  style={{
                    position: 'absolute',
                    left: `${component.x_coordinate}px`,
                    top: `${component.y_coordinate}px`,
                    cursor: 'move'
                  }}
                >
                  {component.component_type === 'label' ? (
                    <Form.Control
                      type="text"
                      value={component.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      style={{ border: 'none', background: 'transparent' }}
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      placeholder="Input field"
                      value={component.content}
                      readOnly
                    />
                  )}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button onClick={() => handleSubmit()}>submit</Button>
    </Container>
  );
};

export default EditSurvey;