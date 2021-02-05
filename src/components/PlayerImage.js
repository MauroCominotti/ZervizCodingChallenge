import React from "react";

class PlayerImage extends React.Component {
  render() {
    const { selectedUrl } = this.props;
    return (
      <div className="d-flex justify-content-center">
        <img alt="tempalt" className="img-fluid w-75" src={selectedUrl} />
      </div>
    );
  }
}

export default PlayerImage;
