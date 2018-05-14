import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }
  renderPost(posts){
      return _.map(posts , post => {
        return (
          <Link to={`/posts/${post.id}`}  key={post.id}>
          <li className="list-group-item post-item">
            <ul>
              <li className="h4">{post.title}</li>
              <li className="text-muted">Tags : {post.categories}</li>
            </ul>
          </li>
          </Link>
        );
      });
    }
  checkPosts(){
    console.log(this.props);
    if(this.props.posts){
      return(
          <ul className='list-group'>
            {this.renderPost(this.props.posts)}
          </ul>
    );
  }
  else{
    return (
          <div className="row w-100 text-center bg-light justify-content-center">
            <h2 className="lead align-self-center text-center">
            <span className="spinner spinner--large">Sorry, no MyNotes available.</span>
            </h2>
        </div>
    );
  }
  }
  render(){
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand navbar-light">
          <div className="navbar-collapse" id="navbarNav">
          <a className="navbar-brand" href="#">My NotePad</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            </div>
            <ul className="nav justify-content-end form-inline my-2 my-lg-0">
              <Link to="/posts/new" className="nav-item dropdown-item text-dark">
              Add a Post
              </Link>
            </ul>
        </nav>
        <div className="jumbotron-fluid">
          <div className="container">
            <p className="lead">This is a sample app to store notes.</p>
          </div>
        </div>
        <div className="container-fluid">
          {this.checkPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    posts : state.post
  };
}

export default connect( mapStateToProps, {fetchPosts} )(PostsIndex);
