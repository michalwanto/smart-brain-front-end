import React from "react";
import "./Register.styles.css";

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      email: "",
      passwords: "",
      entries: 0,
      joined: "",
    };
  }
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  onSubmit = (event) => {
    const { loadUser, registered } = this.props;
    fetch("https://smart-brain-server1.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        passwords: this.state.passwords,
      }),
    })
      .then((response) => response.json(response))
      .then((data) => {
        if (data.id) {
          registered();
          loadUser(data);
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="passwords"
                  id="password"
                  onChange={this.onInputChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign Up"
                onClick={this.onSubmit}
              />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db">
                Register
              </a>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
