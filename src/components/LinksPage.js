import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkList from './LinkList';
import { connect } from 'react-redux';
import { fetchLinks, deleteLink } from '../actions/links';
import Loading from './Loading';

class LinksPage extends Component {

    state = {
        loading: true,
        keyword: ''
    };

    componentWillMount(){
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500);
    }

    componentDidMount(){
        this.props.fetchLinks();
    }

    updateKeyword(event){
        this.setState({ keyword: event.target.value });
    }

    render() {
        const { keyword, loading } = this.state;

        if(loading) {
            return (                
                <Loading/>
            ); 
        } else {
            return (
                <div>
                    <div className="ui icon input">
                        <input 
                        type="text" 
                        placeholder="Search By Tag..."
                        onChange={this.updateKeyword.bind(this)}
                        value={keyword}
                        />
                    </div>
                    {!!keyword ? <h1>Links for #{keyword}</h1> : <h1>All Links</h1>}

                    {<LinkList keyword={keyword} links={this.props.links} deleteLink={this.props.deleteLink} />}
                </div>
            )
        }
    }
}

LinksPage.propTypes = {
    loading: PropTypes.bool,
    links: PropTypes.array.isRequired,
    fetchLinks: PropTypes.func.isRequired,
    deleteLink: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        loading: state.loading,
        links: state.links,
    }
}

export default connect(mapStateToProps, { fetchLinks, deleteLink })(LinksPage);