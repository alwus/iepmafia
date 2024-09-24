import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Game = ({ date, time, sport, team1, team2, score1, score2 }) => {
  return (
    <Container className="my-4">
      <Card className="p-3 shadow-sm">
        <Card.Subtitle className="mb-3 text-muted">{sport}</Card.Subtitle>
        <Card.Title as="h3">{date}</Card.Title>
        <Card.Subtitle className="mb-3">{time}</Card.Subtitle>

        <Row className="align-items-center">
          <Col xs={6} className="text-start">
            <div>{team1}</div>
            <div>{team2}</div>
          </Col>
          <Col xs={6} className="text-end">
            <div>{score1}</div>
            <div>{score2}</div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Game;
