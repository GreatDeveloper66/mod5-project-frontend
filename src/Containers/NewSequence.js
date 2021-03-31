import React, { Component } from 'react';
import '../App.css';
import AsanaCarousel from '../Components/AsanaCarousel'
import NavBar from '../Components/NavBar'
import FooterBar from '../Components/FooterBar'
import SortBar from '../Components/SortBar'
import { connect } from 'react-redux'
import ClearSequenceAction from '../actions/clearsequence'
import { Container, Row, Col} from 'reactstrap'
import AsanaCategories from '../Containers/AsanaCategories'
import LoadCategoriesAction from '../actions/loadcategories';
import { URL } from '../URL'

const mapStateToProps = state => {
  return {
    categories: state.categories,
		categorylabel: state.categorylabel,
		sortasanas: state.sortasanas,
		jwt: state.jwt
  }
}

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


class NewSequence extends Component {
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

	render(){
		return(
		<div style={{backgroundColor: '#E59866'}}>
			<NavBar />
			<Container>
				<Row>
					<Col sm={12}>
						<FooterBar />
						<AsanaCarousel />
						<SortBar />
					</Col>
				</Row>
			</Container>
			<AsanaCategories />
			
		</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewSequence)