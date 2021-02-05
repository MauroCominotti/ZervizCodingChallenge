import { Component } from "react";
import CountryOptions from "./components/CountryOptions";
import SportOptions from "./components/SportOptions";
import PlayerOptions from "./components/PlayerOptions";
import PlayerImage from "./components/PlayerImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.css";

import JsonPlayer from "./assets/json/player.json";

class App extends Component {
  state = {
    selectedCountry: "Chile",
    selectedSport: "Futbol",
    selectedPlayer: "Alexis Sanchez",
    IDselectedCountry: 1,
    IDselectedSport: 1,
    IDselectedPlayer: 1,
    jsonPlayer: JsonPlayer.filter(
      (x) => x.sport_code === 1 && x.country_code === 1
    ),
    selectedUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2017_Confederation_Cup_-_CHIAUS_-_Alexis_S%C3%A1nchez_%28cropped%29.jpg/338px-2017_Confederation_Cup_-_CHIAUS_-_Alexis_S%C3%A1nchez_%28cropped%29.jpg",
  };

  handleSelectedCountry = (selection, id) => {
    let copyJsonPlayer = [...JsonPlayer];
    copyJsonPlayer = copyJsonPlayer.filter(
      (x) =>
        x.country_code === id && x.sport_code === this.state.IDselectedSport
    );
    let nameJsonPlayer = copyJsonPlayer[0] ? copyJsonPlayer[0].name : "Unknown";
    let urlPlayer = copyJsonPlayer[0]
      ? copyJsonPlayer[0].url_image
      : "https://kicksdigitalmarketing.com/wp-content/uploads/2019/09/iStock-1142986365.jpg";
    this.setState({
      selectedCountry: selection,
      IDselectedCountry: id,
      jsonPlayer: copyJsonPlayer,
      selectedUrl: urlPlayer,
      selectedPlayer: nameJsonPlayer,
    });
  };

  handleSelectedSport = (selection, id) => {
    let copyJsonPlayer = [...JsonPlayer];
    copyJsonPlayer = copyJsonPlayer.filter(
      (x) =>
        x.country_code === this.state.IDselectedCountry && x.sport_code === id
    );
    let nameJsonPlayer = copyJsonPlayer[0] ? copyJsonPlayer[0].name : "Unknown";
    let urlPlayer = copyJsonPlayer[0]
      ? copyJsonPlayer[0].url_image
      : "https://kicksdigitalmarketing.com/wp-content/uploads/2019/09/iStock-1142986365.jpg";
    this.setState({
      selectedSport: selection,
      IDselectedSport: id,
      jsonPlayer: copyJsonPlayer,
      selectedUrl: urlPlayer,
      selectedPlayer: nameJsonPlayer,
    });
  };

  handleSelectedPlayer = (selection, id) => {
    let copyJsonPlayer = [...JsonPlayer];
    let urlPlayer = copyJsonPlayer.filter((x) => x.player_code === id)[0]
      .url_image;
    this.setState({ selectedPlayer: selection, selectedUrl: urlPlayer });
  };

  handleDownload = () => {
    let name = this.state.selectedPlayer;
    fetch(this.state.selectedUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", name + ".png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container-fluid v-100 bg-dark">
        <div className="row pt-5 ml-auto mr-auto">
          <div className="col-4">
            <CountryOptions
              handleSelectedCountry={this.handleSelectedCountry}
              selectedCountry={this.state.selectedCountry}
            />
          </div>
          <div className="col-4">
            <SportOptions
              handleSelectedSport={this.handleSelectedSport}
              selectedSport={this.state.selectedSport}
            />
          </div>
          <div className="col-4">
            <PlayerOptions
              IDselectedCountry={this.IDselectedCountry}
              IDselectedSport={this.IDselectedSport}
              handleSelectedPlayer={this.handleSelectedPlayer}
              selectedPlayer={this.state.selectedPlayer}
              jsonPlayer={this.state.jsonPlayer}
            />
          </div>
        </div>
        <div className="row">
          <div className="col pt-5">
            <PlayerImage selectedUrl={this.state.selectedUrl} />
          </div>
        </div>
        <div className="row">
          <div className="col p-5 d-flex justify-content-center">
            <FontAwesomeIcon icon={faDownload} onClick={this.handleDownload} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
