import React, { Component } from 'react';
import fartLogo from './fartLogo.png';
import { summary } from './components/dataComparison';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resume: '',
      jobDescription: '',
      summary: {}
    };
    // this.sendSummary = this.sendSummary.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // sendSummary(event) {
  //   event.preventDefault();
  //   return summary(this.state.resume, this.state.jobDescription);
  // }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      summary: summary(this.state.resume, this.state.jobDescription)
    });
  }
  render() {
    const resume = this.state.resume;
    const jobDescription = this.state.jobDescription;
    return (
      <div className="App">
        <header className="App-header">
          <img src={fartLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fancy Advanced Resume Targeter</h1>
        </header>
        <p className="App-intro">
          The purpose of the Fancy Advanced Resume Targeter is to enable an end
          user to compare their resume against a job description's keywords.
        </p>
        <form>
          <label>
            Resume
            <textarea
              type="text"
              name="resume"
              resume={this.state.resume}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Job Description
            <textarea
              type="text"
              name="jobDescription"
              jobdescription={this.state.jobDescription}
              onChange={this.handleChange}
            />
          </label>
          {/* <input type="submit" value="Submit" onClick={this.sendSummary} /> */}
        </form>
        Resume:
        <br />
        {resume}
        <br />
        Job Description: {jobDescription}
        <br />
      </div>
    );
  }
}

export default App;
