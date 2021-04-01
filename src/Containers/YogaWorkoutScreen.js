import React, { Component } from 'react';
import '../App.css';
import YogaJumbotron from '../Components/YogaJumbotron'
import NavBar from '../Components/NavBar'
import preset_sequences from '../json/preset_sequences.json'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { URL } from '../URL'
import ClearSequenceAction from '../actions/clearsequence'
import LoadCategoriesAction from '../actions/loadcategories'

const mapDispatchToProps = dispatch => {
	return {
		clearsequence: () => {
			dispatch(ClearSequenceAction())
		},
		loadcategories: categories => {
			dispatch(LoadCategoriesAction(categories))
		}
	
	}
}

const mapStateToProps = state => {
	return {
		jwt: state.jwt
	}
}



class YogaWorkoutScreen extends Component {
	constructor(props){
		super()
	}

	componentDidMount() {
		fetch(`${URL}/api/v1/categories`,{headers: {Authorization: `Bearer ${this.props.jwt}`}})
			.then(resp => resp.json())
			.then(data => {
				this.props.clearsequence()
				this.props.loadcategories(data)
			})
			.catch(error => {
				console.log(error)
			})
		}
	
	renderJumbotrons = () => {
		return preset_sequences.map((sequence, index) => {
													return <YogaJumbotron key={index} img = {sequence.img} name={sequence.name} asanas={sequence.asanas}/>
												}) 
	}
	
	render(){
		return(
			<div style={{backgroundColor: '#EAA724'}}>
				<NavBar />	
				<div>
					{this.renderJumbotrons()}
				</div>
			</div>
		)
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(YogaWorkoutScreen))