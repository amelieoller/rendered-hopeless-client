import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

import Notes from "../components/Notes";
import NewNote from "../components/NewNote";
import NewGame from "../components/NewGame";
import Games from "../components/Games";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;
let socket;

const StyledNotesPage = styled.div`
  background: black;
  color: white;
  height: 100vh;
  font-size: 18px;
`;

const GameSelectAndAdd = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin: 5px;
    cursor: pointer;
  }
`;

const NotesPage = ({ edit }) => {
  const [notes, setNotes] = useState([]);
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showAddGameForm, setShowAddGameForm] = useState(false);

  // Starting the connection & dissolving it on unmount
  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, []);

  // If a selected game is saved for a user, fetch the id and set game, and notes
  useEffect(() => {
    if (games.length !== 0 && user) {
      const savedUserGameId = user.settings.selectedGameId;
      const selectedGame = games.find((game) => game._id === savedUserGameId);

      if (selectedGame) {
        setSelectedGame(selectedGame);
        socket.emit("getNotes", savedUserGameId);
      }
    }
  }, [games, user]);

  // --------------GAME EFFECTS---------------
  useEffect(() => {
    // Fetch all games
    socket.on("getGames", (games) => {
      setGames(games);
    });
  }, []);

  useEffect(() => {
    // Receive new incoming game and update game state
    socket.on("createGame", (newGame) => {
      setGames((prevGames) => [newGame, ...prevGames]);
      setSelectedGame(newGame);
      setShowAddGameForm(false);
    });
  }, []);

  useEffect(() => {
    // Receive deleted gameId and update game state
    socket.on("deleteGame", (gameId) => {
      setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
    });
  }, []);

  // --------------NOTE EFFECTS---------------
  useEffect(() => {
    // Fetch all notes for the selected game
    socket.on("getNotes", (notes) => {
      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    // Receive new incoming note and update note state
    socket.on("createNote", (newNote) => {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    });
  }, []);

  useEffect(() => {
    // Receive deleted noteId and update note state
    socket.on("deleteNote", (noteId) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    });
  }, []);

  useEffect(() => {
    // Receive updated note and update note state
    socket.on("updateNote", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );
    });
  }, []);

  // --------------USER EFFECTS---------------
  useEffect(() => {
    socket.on("getUser", (users) => {
      setUser(users[0]);
    });
  }, []);

  useEffect(() => {
    // Receive updated note and update note state
    socket.on("updateUser", (updatedUser) => {
      setUser(updatedUser);
    });
  }, []);

  // --------------GAME CRUD---------------
  // Create a game
  const createGame = (title) => {
    socket.emit("createGame", title);
  };

  // Delete a game
  const deleteGame = (gameId) => {
    socket.emit("deleteGame", gameId);
    setSelectedGame("");
  };

  // --------------NOTE CRUD---------------
  // Create a note
  const createNote = (title) => {
    socket.emit("createNote", title, selectedGame._id);
  };

  // Update a note
  const updateNote = (updatedNote) => {
    socket.emit("updateNote", updatedNote);
  };

  // Delete a note
  const deleteNote = (noteId) => {
    socket.emit("deleteNote", noteId);
  };

  // Select game in dropdown
  const selectGame = (gameId) => {
    if (gameId) {
      const newlySelectedGame = games.find((game) => game._id === gameId);

      setSelectedGame(newlySelectedGame);

      socket.emit("updateUser", {
        ...user,
        settings: { selectedGameId: gameId },
      });

      socket.emit("getNotes", gameId);
    } else {
      setSelectedGame("");
      setNotes([]);
    }
  };

  return (
    <StyledNotesPage>
      {/* {!edit && !!selectedGame && <GameTitle>{selectedGame.title}</GameTitle>} */}

      {edit && (
        <GameSelectAndAdd>
          {games.length !== 0 && (
            <Games
              games={games}
              selectGame={selectGame}
              selectedGameId={selectedGame ? selectedGame._id : ""}
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                deleteGame(selectedGame._id);
              }
            }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => setShowAddGameForm(!showAddGameForm)}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </GameSelectAndAdd>
      )}

      {showAddGameForm && <NewGame createGame={createGame} />}

      {selectedGame && edit && <NewNote createNote={createNote} />}

      {notes.length !== 0 && (
        <Notes
          edit={edit}
          notes={notes}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      )}
    </StyledNotesPage>
  );
};

export default NotesPage;
