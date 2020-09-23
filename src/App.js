import React, { Component } from "react";
import Particles from "react-tsparticles";
import Navigation from "./components/Navigation/Navigation.component";
import Logo from "./components/Logo/Logo.component";
import ImageTextForm from "./components/ImageTextForm/ImageTextForm.component";
import Rank from "./components/Rank/Rank.component";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay.component";
import SignIn from "./components/SignIn/SignIn.component";
import Register from "./components/Register/Register.component";

import "./App.css";

const particlesComp = {
  fpsLimit: 60,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  isSignedIn: false,
  route: "signIn",
  user: {
    id: "",
    name: "",
    email: "",
    passwords: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        hash: data.hash,
        entries: data.entries,
        joined: data.joined,
      },
    });
    console.log("user", this.state.user);
  };

  addBoxDimension = (boxDimension) => {
    this.setState({ box: boxDimension });
  };

  calculateBoxData = (data) => {
    console.log(data);
    const boxData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("imageDisplay");
    const width = image.width;
    const height = image.height;

    const boxDimension = {
      leftCol: boxData.left_col * width,
      rightCol: width - boxData.right_col * width,
      bottomRow: height - boxData.bottom_row * height,
      topRow: boxData.top_row * height,
    };
    this.addBoxDimension(boxDimension);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureChange = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://smart-brain-server1.herokuapp.com/imageUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://smart-brain-server1.herokuapp.com/image", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            )
            .catch((err) => console.log(err));
        }
        this.calculateBoxData(response);
      });
  };

  changeRoute = (route) => {
    this.setState({ route: route });
  };

  signedIn = () => {
    this.setState({
      isSignedIn: true,
      route: "signIn",
    });
  };
  signedOut = () => {
    this.setState(initialState);
  };
  registered = () => {
    this.setState({
      isSignedIn: true,
    });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSignedIn}
          signedIn={this.signedOut}
          registered={this.registered}
          signedOut={this.signedOut}
          changeRoute={this.changeRoute}
        />
        <Particles
          className="particles"
          id="tsparticles"
          options={particlesComp}
        />

        {this.state.isSignedIn || this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageTextForm
              onInputChange={this.onInputChange}
              onPictureChange={this.onPictureChange}
            />
            <ImageDisplay Box={this.state.box} ImageUrl={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn
            className="flex items-center"
            signedIn={this.signedIn}
            changeRoute={this.changeRoute}
            loadUser={this.loadUser}
          />
        ) : this.state.route === "register" ? (
          <Register
            className="flex items-center"
            changeRoute={this.changeRoute}
            registered={this.registered}
            loadUser={this.loadUser}
          />
        ) : (
          <SignIn
            className="flex items-center"
            signedIn={this.signedIn}
            changeRoute={this.changeRoute}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
