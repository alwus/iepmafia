import { Container } from 'react-bootstrap';
import Game from '../components/Game';

const Games = () => {
  return (
    <Container className="mt-5">
      <h1>Games</h1>
      <p>Upcoming and past games</p>

      <Game 
        date="Sep 24, 2024" 
        time="5 PM"
        sport="Soccer"
        team1="IEP Mafia" 
        team2="ZBT" 
        score1="2" 
        score2="1" 
      />
      
    </Container>
  );
};

export default Games;
