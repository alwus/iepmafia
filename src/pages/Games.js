import { useEffect, useState } from 'react';
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

const Games = () => {
  const [games, setGames] = useState([]);

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
        setGames(allGames);  // Update state with the parsed game data
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <Container className="mt-5">
      <h1>Games</h1>
      <p>Upcoming and past games</p>

      {games.length > 0 ? (
        games.map((game, index) => (
          <Game
            key={index}
            date={game.date}
            time={game.time}
            sport={game.sport || 'Soccer'}
            team1={game.team1}
            team2={game.team2}
            score1={game.score1}
            score2={game.score2}
          />
        ))
      ) : (
        <p>Loading games...</p>
      )}
    </Container>
  );
};

export default Games;
