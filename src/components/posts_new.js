import React, { Component } from 'react';
import { Field , reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import './styles/posts_new.css';

class PostsNew extends Component{
  renderField(field){
    const {meta: {touched , error}} = field;
    const className = `form-group mt-4 mb-0 ${touched && error ? "has-danger" : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type = "text"
          {...field.input}
         />
          <div className="container-fluid text-help mt-1 w-25 alert-danger" role="alert">
            {field.meta.touched ? field.meta.error : ''}
          </div>
      </div>
    );
  }

  onSubmit(values){
    this.props.createPost(values , () => {
      this.props.history.push('/');
    });
  }

  render(){
    const {handleSubmit} = this.props;
    return (
      <div className="container-fluid px-5 pt-5">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name = "title"
            label="Title"
            component={this.renderField}
            />
          <Field
            name = "categories"
            label="Categories"
            component={this.renderField}
            />
          <Field
            name = "content"
            label="Post Content"
            component={this.renderField}
            />
            <div className="fixed-bottom px-5">
              <Link to='/' >
                <button type="button" className="btn btn-secondary btn-block cancelbutton mt-3" >Cancel</button>
              </Link>
              <button type="submit" className="btn btn-info btn-block my-1">Save</button>
            </div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a title for the post."
  }
  if (!values.categories) {
    errors.categories = "Please enter a category."
  }
  if (!values.content) {
    errors.content = "Please enter content for the post."
  }
  return errors;
}

export default reduxForm({
  validate,
  form : 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
