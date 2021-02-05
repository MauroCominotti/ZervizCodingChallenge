import React from "react";
import jsonSport from "../assets/json/sport.json";

class SportOptions extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="sports" className="text-light">
            Sports
          </label>
          <select
            className="form-control form-control-sm btn-dark btn-outline-light"
            id="sports"
            name="sports"
            value={this.props.selectedSport}
            onChange={(e) => {
              this.props.handleSelectedSport(
                e.target.value,
                jsonSport.find((x) => x.name === e.target.value).sport_code
              );
            }}
          >
            {jsonSport.map((sport) => (
              <option value={sport.name} key={sport.sport_code}>
                {sport.name}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default SportOptions;
