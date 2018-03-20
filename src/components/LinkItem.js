import React from 'react'
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import PropTypes from 'prop-types';

export default function LinkItem({ link, deleteLink }) {

    const tags = (link.tags) ? link.tags.map((tag, index) => 
        <a className="ui label" key={index}>
            {tag.tag}
        </a>): '';

    return (
    <div className="item">
        <div className="middle aligned content">
            <div className="header">
                <a href={link.url} target="_blank">{link.title}</a>
                {link.isShared === true ? <i className="red share icon"></i> :""}
            </div>
            <div className="description">
                <div className="ui list">
                    <div className="item">
                        <div className="content">Updated At {moment(link.updateAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </div>
                </div>
                <div className="ui tag labels">
                    {tags}
                </div>
            </div>
            <div className="extra">
                <Link className='ui blue button' to={`/links/edit/${link.id}`}>Edit</Link>
                <button className='ui red button' type="button" onClick={() => deleteLink(link.id)}>Delete</button>
            </div>
        </div>
    </div>
    )
}

LinkItem.propTypes = {
    link: PropTypes.object.isRequired
}
