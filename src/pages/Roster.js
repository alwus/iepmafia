import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

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

const Roster = () => {
  const [sports, setSports] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch the list of sports markdown files from your GitHub content repo
    const fetchSports = fetch('https://api.github.com/repos/alwus/iepmafia-content/contents/content/sport')
      .then((response) => response.json())
      .then(async (files) => {
        // For each file, fetch the raw markdown content and parse it
        const sportsPromises = files.map(async (file) => {
          const res = await fetch(file.download_url);  // Download the raw markdown file
          const text = await res.text();
          const frontMatter = parseFrontMatter(text);  // Manually parse front matter
          return frontMatter;
        });
        
        return Promise.all(sportsPromises);
      })
      .catch((error) => {
        console.error('Error fetching sports:', error);
        return [];
      });

    // Fetch the list of players markdown files from your GitHub content repo
    const fetchPlayers = fetch('https://api.github.com/repos/alwus/iepmafia-content/contents/content/players')
      .then((response) => response.json())
      .then(async (files) => {
        // For each file, fetch the raw markdown content and parse it
        const playersPromises = files.map(async (file) => {
          const res = await fetch(file.download_url);  // Download the raw markdown file
          const text = await res.text();
          const frontMatter = parseFrontMatter(text);  // Manually parse front matter
          return frontMatter;
        });

        return Promise.all(playersPromises);
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
        return [];
      });

    // Fetch both sports and players concurrently
    Promise.all([fetchSports, fetchPlayers])
      .then(([fetchedSports, fetchedPlayers]) => {
        setSports(fetchedSports);
        setPlayers(fetchedPlayers);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h1>Roster</h1>
      <p>Current rosters for our athletic teams</p>
      {sports.length > 0 ? (
        sports.map((sport, index) => (
          <div key={index}>
            <h2>{sport.name}</h2>
            <ul>
              {players
                .filter((player) => player.sport === sport.name)
                .map((player, playerIndex) => (
                  <li key={playerIndex}>{player.firstname} {player.lastname}</li> // Display player's name or any other info
                ))
              }
            </ul>
          </div>
        ))
      ) : (
        <p>Loading sports...</p>
      )}
    </Container>
  );
};

export default Roster;
