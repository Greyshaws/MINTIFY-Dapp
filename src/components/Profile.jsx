import React from 'react';

class Profile extends React.Component {
  renderImage() {
    if (this.props.artist.images[0]) {
      return (
        <img
          alt="Profile"
          className="profile-image"
          src={this.props.artist.images[0].url}
        />
      );
    }
  }
  renderArtist() {
    if (this.props.artist) {
      return (
        <div className="profile">
          {this.renderImage()}
          <div className="profile-info">
            <div className="profile-name">{this.props.artist.name}</div>
            <div className="profile-followers">
              Spotify followers: {this.props.artist.followers.total}
            </div>
          </div>
        </div>
      );
    }
    return;
  }

  render() {
    return <div>{this.renderArtist()}</div>;
  }
}

export default Profile;
