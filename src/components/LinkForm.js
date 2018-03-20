import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class LinkForm extends Component {

    state = {
        id: this.props.link ? this.props.link.id : null,
        title: this.props.link ? this.props.link.title : '',
        url: this.props.link ? this.props.link.url : '',
        isShared: this.props.link ? this.props.link.isShared : null,
        tags: this.props.link ? this.props.link.tags : [],
        errors: {},
        loading: false
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.link.id,
            title: nextProps.link.title,
            url: nextProps.link.url,
            isShared: nextProps.link.isShared,
            tags: nextProps.link.tags ? nextProps.link.tags : []
        })
    }

    resetForm = () => {
        this.setState({ 
            title: '',
            url:'',
            isShared: null,
            tags: [],
            errors: {},
            message: '',
            loading: false
        });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = (e.target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        if(!!this.state.errors[name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [name]: value,
                errors
              });
        }else{
            this.setState({
                [name]: value
            }); 
        }
    }

    handleAddTagInput = () => {

        if(this.state.tags === undefined){
            this.setState({ 
                tags: [{tag:''}]
            });
        }else{
            this.setState({ 
                tags: this.state.tags.concat([{tag:''}])
            });
        }
    }

    handleRemoveTagInput = (idx) => () => {
        this.setState({
            tags: this.state.tags.filter((s, sidx) => idx !== sidx)
        });
    }

    handleTagChange = (idx) => (e) => {
        const newTags = this.state.tags.map((tag, sidx) => {
            if (idx !== sidx) return tag;
            return { ...tag, tag: e.target.value };
          });
          
        this.setState({
            tags: newTags
        });
    }

    handleSubmit = (e) =>  {
        e.preventDefault();

        //Validation
        let errors = {};

        if(this.state.title === '') errors.title = "Title cannot be empty!";
        if(this.state.url === '') errors.url = "URL cannot be empty!";

        this.setState({
            errors
        });

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            const { id, title, url, tags, isShared } = this.state;
            this.setState({ loading : true });

            this.props.saveLink({ id, title, url, tags, isShared })
                .catch((err) => this.setState({ err, loading: false }));
        }
    }

    render() {
        const tags = (this.state.tags) ? this.state.tags.map((tag, idx) => (
            <div className="field" key={idx}>
                <div className="ui action input">
                    <input 
                    type="text" 
                    placeholder={`Enter tag #${idx + 1}`}
                    id={`tag${tag}`}
                    name={tag}
                    value={tag.tag}
                    onChange={this.handleTagChange(idx)}
                    />
                    <button className="ui basic negative button" type="button" onClick={this.handleRemoveTagInput(idx)}>
                        Delete
                    </button>
                </div>
            </div>
        )) : '';

        let form = (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <div className={classnames('field', {error: !!this.state.errors.title})}>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <span className="field error">{this.state.errors.title}</span>
                </div>
                <div className={classnames('field', {error: !!this.state.errors.url})}>
                    <label htmlFor="url">URL</label>
                    <input 
                    id="url" 
                    name="url" 
                    value={this.state.url} 
                    onChange={this.handleChange}/>
                    <span className="field error">{this.state.errors.url}</span>
                </div>
                <div className="field">
                    <button type="button" className="ui positive basic button" onClick={this.handleAddTagInput}>Add Tag</button>
                </div>

                {tags}

                <div className="field">
                    <div className="ui toggle checkbox">
                        <input 
                        id="isShared" 
                        type="checkbox" 
                        tabIndex="0" 
                        className="hidden"
                        name="isShared"
                        defaultChecked={this.state.isShared}
                        onChange={this.handleChange}/>
                        <label htmlFor="isShared">Is Shared?</label>
                    </div>
                </div>
                <div className="field">
                    <button className="ui primary basic button" type="submit">Save</button>
                    <button className="ui yellow basic button" type="button" onClick={this.resetForm}>Reset</button>
                    <Link className='ui purple basic button' to={`/`}>Back to home</Link>
                </div>
            </form>
        );
        return (
            <div>
              { form }
            </div>
        )
    }
}

export default LinkForm;