import React from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import request from 'request';
import Profile from './components/Profile';
import Gallery from './components/Gallery';
import ConnectWallet from './components/ConnectWallet';
//import bunzz from 'bunzz-sdk';
import Minter from './components/Minter.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      tracks: [],
    };
  }

  search() {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const client_secret = process.env.REACT_APP_CLIENT_SECRET;

    const auth = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
    };

    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const ARTISTS_URL = 'https://api.spotify.com/v1/artists';

    request.post(auth, async (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: FETCH_URL,
          headers: {
            Authorization: 'Bearer ' + token,
          },
          json: true,
        };
        request.get(options, (error, response, body) => {
          const artist = body.artists.items[0];
          this.setState({ artist });
          let new_options = { ...options };

          const NEW_URL = `${ARTISTS_URL}/${artist.id}/top-tracks?country=GB`;
          new_options.url = NEW_URL;
          request.get(new_options, (error, response, res) => {
            const tracks = res.tracks;
            this.setState({ tracks });
          });
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
      <div className="info1">
      <p>Search for an artist.<br/><br/>
      For Windows, right-click on
            song image to save.<br/> For Mac OS,
            left-click and hold on 
            image to save.<br/><br/>
      Click on song image<br/>
            to listen to a preview.</p>
      </div>
      
        <header className="App-header">M I N T I F Y</header>
        <ConnectWallet/>
        <div>
          <FormGroup>
            <InputGroup className="form">
              <FormControl
                value={this.state.query}
                onChange={(event) => {
                  this.setState({ query: event.target.value });
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.search();
                  }
                }}
                type="text"
              />
              <Button onClick={() => this.search()} className="search">Search</Button>
            </InputGroup>
          </FormGroup>
          <Profile artist={this.state.artist} />
          <Gallery tracks={this.state.tracks} />
          <Minter/>
        </div>
      </div>
    );
  }
}

export default App;
