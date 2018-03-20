import React from 'react';
import PropTypes from 'prop-types';
import LinkItem from './LinkItem';
import { connect } from 'react-redux';

function LinkList({links, deleteLink, keyword}){
    const emptyLinkMessage = (
        <h1>Oops! No results!</h1>
    )

    const filteredLinks = links.filter(item => 
        (item.tags) ? item.tags
            .map(tag => tag.tag)
            .join("")
            .toLowerCase()
            .includes(keyword.toLowerCase()): item
    );

    const linkList = (
        <div className="ui items">
            {filteredLinks.map(link => <LinkItem link={link} key={link.id} deleteLink={deleteLink}/>)}
        </div>
    )

    return (
        <div>
            {filteredLinks.length === 0 ? emptyLinkMessage : linkList}
        </div>
    );
}

LinkList.propTypes = {
    links: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
    return {
        links: state.links
    }
}
  
export default connect(mapStateToProps)(LinkList);
