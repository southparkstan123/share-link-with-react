import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveLink, updateLink, fetchLink } from '../actions/links';
import LinkForm from './LinkForm';
import Loading from './Loading';

class LinkFormPage extends Component {

    state = {
        redirect: false,
        loading: true
    };

    componentWillMount(){
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500);
    }

    componentDidMount = () => {
        if(this.props.match.params.id){
            this.props.fetchLink(this.props.match.params.id);
        } 
    }

    saveLink = ({id, title, url, tags, isShared}) => {
        if(id){
            return this.props.updateLink({ id, title, url, tags, isShared })
            .then(
                () => {
                    this.setState({ 
                        redirect: true
                    });
                }
            )
        }else{
            return this.props.saveLink({ title, url, tags, isShared })
            .then(
                () => {
                    this.setState({ 
                        redirect: true
                    });
                }
            )
        } 
    }

    render() {
        const { loading } = this.state;

        if(loading) {
            return(
                <Loading/>
            );
        } else{
            return (
                <div>
                    {
                        this.state.redirect ?
                        <Redirect to={`/`} /> :
                        <LinkForm link={this.props.link} saveLink={this.saveLink}/>
                    }
                </div>
            )
        }

    }
}

function mapStateToProps(state, props){
    if(props.match.params.id){
        return {
            link: state.links.find(item => item.id === props.match.params.id)
        }
    }
    return { link : null };
}

export default connect(mapStateToProps, { saveLink, updateLink, fetchLink })(LinkFormPage);
