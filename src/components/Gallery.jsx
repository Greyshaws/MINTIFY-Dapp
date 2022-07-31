import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false,
    };
  }
  playAudio(track) {
    if (!track.preview_url) {
      return;
    }
    let url = track.preview_url;
    let audio = new Audio(url);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: url,
        audio,
      });
    } else {
      if (this.state.playingUrl === url) {
        this.state.audio.pause();
        this.setState({
          playing: false,
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: url,
          audio,
        });
      }
    }
  }

  render() {
    const { tracks } = this.props;

    return (
      <div>
        {tracks.map((track, k) => {
          const image = track.album.images[0].url;
          return (
            <div
              key={k}
              className="track"
              onClick={() => this.playAudio(track)}
            >
              <img src={image} className="track-image" alt="track" />
              <p className="track-text">{track.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
