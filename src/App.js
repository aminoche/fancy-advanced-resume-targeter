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
      summary: {
        skillsYouHaveAndInJobDescription: [],
        skillsYouDoNotHaveAndInJobDescription: [],
        skillsYouHaveAndNotInJobDescription: [],
        fluffInJobDescription: [],
        percentSkillsMatching: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      summary: summary(this.state.resume, this.state.jobDescription)
    });
  }
  render() {
    const skillsYouHaveAndInJobDescription = this.state.summary
      .skillsYouHaveAndInJobDescription;
    const skillsYouDoNotHaveAndInJobDescription = this.state.summary
      .skillsYouDoNotHaveAndInJobDescription;
    const percentSkillsMatching = Math.floor(
      this.state.summary.percentSkillsMatching * 100
    );
    const resume = this.state.resume.split(' ').map((word, index) => (
      <span
        key={index}
        className={
          skillsYouHaveAndInJobDescription.includes(word) ? 'green' : 'grey'
        }
      >
        {word}{' '}
      </span>
    ));
    const jobDescription = this.state.jobDescription
      .split(' ')
      .map((word, index) => (
        <span
          key={index}
          className={
            skillsYouHaveAndInJobDescription.includes(word)
              ? 'green'
              : skillsYouDoNotHaveAndInJobDescription.includes(word)
                ? 'red'
                : 'grey'
          }
        >
          {word}{' '}
        </span>
      ));
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
        </form>
        <h2>Percent Skills Matching: {percentSkillsMatching}%</h2>
        <h2>Resume:</h2>
        <br />
        {resume}
        <br />
        <h2>Job Description: </h2>
        {jobDescription}
        <br />
      </div>
    );
  }
}

export default App;
