import React from "react";
import jsonCountry from "../assets/json/country.json";

class CountryOptions extends React.Component {
  render() {
    // const jsonCountry = JsonCountry;
    return (
      <div>
        <form>
          <label htmlFor="country" className="text-light">
            País
          </label>
          <select
            className="form-control form-control-sm btn-dark btn-outline-light"
            id="country"
            name="country"
            value={this.props.selectedCountry}
            onChange={(e) => {
              this.props.handleSelectedCountry(
                e.target.value,
                jsonCountry.find((x) => x.name === e.target.value).country_code
              );
            }}
          >
            {jsonCountry.map((country) => (
              <option value={country.name} key={country.country_code}>
                {country.name}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default CountryOptions;
