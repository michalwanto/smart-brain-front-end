import React, { Component } from "react";
import "./SignIn.styles.scss";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      passwords: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log(this.state.email);
  };

  onPasswordsChange = (event) => {
    this.setState({
      passwords: event.target.value,
    });
    console.log(this.state.passwords);
  };

  onSubmit = (event) => {
    const { loadUser } = this.props;
    fetch("https://smart-brain-server1.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        passwords: this.state.passwords,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          console.log(data);
          loadUser(data);
          this.props.signedIn();
        } else {
          console.log("please double check your credentials");
        }
      })
      .catch(console.log("failed to sign in"));
  };

  render() {
    const { changeRoute, signedIn } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordsChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmit}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => changeRoute("register")}
                className="f6 link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
