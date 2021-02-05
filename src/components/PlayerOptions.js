import React from "react";
import JsonPlayer from "../assets/json/player.json";

class PlayerOptions extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="player" className="text-light">
            Players
          </label>
          <select
            className="form-control form-control-sm btn-dark btn-outline-light"
            id="player"
            name="player"
            value={this.props.selectedPlayer}
            onChange={(e) => {
              this.props.handleSelectedPlayer(
                e.target.value,
                JsonPlayer.find((x) => x.name === e.target.value).player_code
              );
            }}
          >
            {this.props.jsonPlayer.map((player) => (
              <option value={player.name} key={player.player_code}>
                {player.name}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default PlayerOptions;
