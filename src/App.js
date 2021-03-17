import React, { Component } from 'react'
import './App.scss';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {FaTwitter} from 'react-icons/fa'


export default class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        quoteData: [],
        quote: '',
        author: ''
      }
      this.randomQuote = this.randomQuote.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  // thanx to Akhil Aravind https://stackoverflow.com/questions/59715034/react-fetch-api-quote-random-generator?fbclid=IwAR2yd-PADcCjgq0vKO-rusF_gGNSrCgrjnmbLclE8hYNVyNi_3oa7Hbu1G4
    componentDidMount() {
      console.log("COM D Mount")
      const API = 'https://type.fit/api/quotes'
      fetch(API)
          .then((response) => response.json())
          .then((data) => {
              this.setState({
                quoteData: data
              },()=>{
                this.handleClick();
              })
          })
          .catch(error => console.log('Error', error));
    }
    randomQuote() {
      const randomNumber = Math.floor(Math.random() * this.state.quoteData.length);
      console.log(randomNumber);
      return this.state.quoteData[randomNumber];
    }

  
    handleClick() {
      const oneRandomQuote = this.randomQuote();
      this.setState({
        quote: oneRandomQuote.text,
        author: oneRandomQuote.author
      })
    }
  
    render() {
      return (
      <Jumbotron className="content" fluid>
          <Container fluid id='quote-box'>
            <h3 id='author'>
             ---<b>|</b> {this.state.author} <b>|</b>---
            </h3>
            <h1 id='text'>
              {this.state.quote}
            </h1> 
            <hr />
            <a id="tweet-quote" className="bg-info text-white" href="#top" target="_blank"> <FaTwitter size='25'/>the quote</a> <br />
            <Button variant="outline-success" size="sm" id="new-quote" onClick={this.handleClick}>Next Quote</Button>
          </Container>
      </Jumbotron>
      )
    }
  }