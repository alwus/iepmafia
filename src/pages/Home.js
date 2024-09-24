import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Game from '../components/Game';

const parseFrontMatter = (text) => {
    const result = {};
    const lines = text.split('\n');
  
    // Find front matter boundaries
    if (lines[0] === '---') {
      let i = 1;
      while (i < lines.length && lines[i] !== '---') {
        const [key, ...value] = lines[i].split(': ');
        result[key.trim()] = value.join(': ').trim(); // Join values in case of colon in the value
        i++;
      }
    }
  
    return result;
};

const Home = () => {
  const [nextGame, setNextGame] = useState(null);

  useEffect(() => {
    // Fetch the list of markdown files from your GitHub content repo
    fetch('https://api.github.com/repos/alwus/iepmafia-content/contents/content/games')
      .then((response) => response.json())
      .then(async (files) => {
        // For each file, fetch the raw markdown content and parse it
        const gamePromises = files.map(async (file) => {
          const res = await fetch(file.download_url);  // Download the raw markdown file
          const text = await res.text();
          const frontMatter = parseFrontMatter(text);  // Manually parse front matter
          return frontMatter;
        });
        
        const allGames = await Promise.all(gamePromises);
        console.log(allGames);
        const parsedGames = allGames
          .map(game => ({
            ...game,
            date: new Date(`${game.date}, 2024`)  // Assuming all games are in the same year
          }))
          .filter(game => game.final === 'false')
          .sort((a, b) => a.date - b.date); // Sort games by date
          console.log(parsedGames)
          const nextGame = parsedGames.length > 0 ? parsedGames[0] : null;
          setNextGame(nextGame);
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <Container className="mt-5">
      <h1>Let's go Mafia!</h1>
      <p>Home of IEP Athletics and Raccoons</p>
      <h2>Next Game</h2>

      {nextGame ? (
        <Game
          date={nextGame.date.toDateString()}
          time={nextGame.time}
          sport={nextGame.sport || 'Soccer'}
          team1={nextGame.team1}
          team2={nextGame.team2}
          score1={nextGame.score1}
          score2={nextGame.score2}
        />
      ) : (
        <p>Loading or no upcoming games...</p>
      )}
    </Container>
  );
};

export default Home;
