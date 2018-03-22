import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
   constructor(props){
   super(props)
   this.state = {
      lastWinner: 0,
      numberOfBets: 0,
      minimumBet: 0,
      totalBet: 0,
      maxAmountOfBets: 0,
   }

   if(typeof web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
   }else{
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
   }

   const MyContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "bet",
		"outputs": [],
		"payable": true,
		"type": "function",
		"stateMutability": "payable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "checkPlayerExists",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "numberWinner",
				"type": "uint256"
			}
		],
		"name": "distributePrizes",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "generateNumberWinner",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"inputs": [
			{
				"name": "_minimumBet",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "constructor",
		"stateMutability": "nonpayable"
	},
	{
		"payable": true,
		"type": "fallback",
		"stateMutability": "payable"
	}
])
   
   this.state.ContractInstance = MyContract.at("0x2913de95f9ed0613de6711286f5a92cb784e81b4")
}

voteNumber(number){
      console.log(number)
   }

render(){
      return (
         <div className="main-container">
            <h1>Bet for your best number and win huge amounts of Ether</h1>

<div className="block">
               <h4>Timer:</h4> &nbsp;
               <span ref="timer"> {this.state.timer}</span>
            </div>

<div className="block">
               <h4>Last winner:</h4> &nbsp;
               <span ref="last-winner">{this.state.lastWinner}</span>
            </div>
<hr/>

<h2>Vote for the next number</h2>
            <ul>
               <li onClick={() => {this.voteNumber(1)}}>1</li>
               <li onClick={() => {this.voteNumber(2)}}>2</li>
               <li onClick={() => {this.voteNumber(3)}}>3</li>
               <li onClick={() => {this.voteNumber(4)}}>4</li>
               <li onClick={() => {this.voteNumber(5)}}>5</li>
               <li onClick={() => {this.voteNumber(6)}}>6</li>
               <li onClick={() => {this.voteNumber(7)}}>7</li>
               <li onClick={() => {this.voteNumber(8)}}>8</li>
               <li onClick={() => {this.voteNumber(9)}}>9</li>
               <li onClick={() => {this.voteNumber(10)}}>10</li>
            </ul>
         </div>
      )
   }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)