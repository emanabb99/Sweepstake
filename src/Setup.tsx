import {useState} from "react";

export default function Setup() {
    type Player = {
        name: string;
        teams: string[];
    };
    const [players, setPlayers] = useState<Player[]>([]);
    const [player, setPlayer] = useState("");
    const [sweepStarted, setSweepStarted] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [sweepFinished, setSweepFinished] = useState(false);
    const [teamsToPick, setTeamsToPick] = useState(["Canada", "Mexico", "United States", "Australia", "Iraq", "Iran", "Japan", "Jordan", "South Korea", "Qatar", "Saudi Arabia", "Uzbekistan", "Algeria", "Cape Verde", "DR Congo", "Ivory Coast", "Egypt", "Ghana", "Morocco", "Senegal", "South Africa", "Tunisia", "Curacao", "Haiti", "Panama", "Argentina", "Brazil", "Colombia", "Ecuador", "Paraguay", "Uruguay", "New Zealand", "Austria", "Belgium", "Bosnia and Herzegovina", "Croatia", "Czechia", "England", "France", "Germany", "Netherlands", "Norway", "Portugal", "Scotland", "Spain", "Sweden", "Switzerland", "Turkey"
    ]);
    const maxTeams = Math.floor(48 / players.length);
    const [error, setError] = useState("");

    const teamAdder = () => {
        if (!selectedPlayer || !currentPlayer) {
            setError("Please select a player first");
            return;
        }
        if (currentPlayer.teams.length < maxTeams) {
            setError("");
            const index = Math.floor(Math.random() * teamsToPick.length);
            const team = teamsToPick[index];
            setPlayers(players.map(player => {
                if (player.name === selectedPlayer.name) {
                    return {
                        ...player, teams: [...player.teams, team]
                    }
                }
                return player;
            }))
            setTeamsToPick(prev => prev.filter(t => t !== team))
        } else {
            setError("Player has reached max number of teams");
            return;
        }
    }

    const currentPlayer = players.find(p => p.name === selectedPlayer?.name);

    return (
        <>
            {!sweepStarted ? (
                <>
                    <h1>World Cup 2026 SweepStake</h1>
                    <div>
                        <p>Players:</p>
                        <ul>
                            {players.map(player => (
                                <p>{player.name}
                                    <button type="button"
                                            onClick={() => setPlayers(prev => prev.filter(p => p.name !== player.name))}>Delete
                                    </button>
                                </p>
                            ))}
                        </ul>

                    </div>
                    <div>
                        <input value={player} placeholder="Enter player name"
                               onChange={(e) => setPlayer(e.target.value)}/>
                        <button type="button" onClick={() => {
                            setPlayers(prev => [...prev, {name: player, teams: []}]);
                            setPlayer("")
                        }}
                        >Add player
                        </button>
                    </div>
                    <div>
                        <button onClick={() => setSweepStarted(true)}>Start SweepSteak</button>
                    </div>
                </>
            ) : (
                !sweepFinished ? (
                    <div style={{display: "flex", gap: "450px"}}>
                        <div style={{textAlign:"left"}}>
                            {teamsToPick.map(team => (
                                <ul key={team}>{team}</ul>
                            ))}
                        </div>

                        <div style={{textAlign:"right"}}>

                            {selectedPlayer ? (
                                <h3 style={{textAlign:"left"}}>Selected player: {selectedPlayer.name}</h3>
                            ) : (
                                <h3>Please select a player</h3>
                            )}

                            <p>
                                {players.map(player => (
                                    <button
                                        key={player.name}
                                        onClick={() => {
                                            setSelectedPlayer(player)
                                            setError("")
                                        }}
                                    >
                                        {player.name}
                                    </button>
                                ))}
                            </p>

                            <h4 style={{textAlign:"left"}}>Teams</h4>

                            <div>
                                <button onClick={teamAdder}>Add team</button>

                                {currentPlayer && currentPlayer.teams.map(team => (
                                    <ul key={team}>{team}</ul>
                                ))}
                            </div>
                            {error && <p>{error}</p>}
                            <button onClick={() => setSweepFinished(true)}>
                                Finish sweepstakes
                            </button>

                        </div>
                    </div>
                ) : (
                    <>
                        <h1>Final results</h1>
                        <div>
                            {players.map(player => (
                                <div>
                                    <h3>{player.name}</h3>
                                    <p>{player.teams.join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )
            )
            }
        </>
    );
}



