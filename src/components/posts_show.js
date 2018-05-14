import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost , deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component{
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deletePost(id , () => {
      this.props.history.push('/');
    });
  }
  render(){
    const { post } = this.props;
    if (!post) {
      return (
        <div className="container-fluid">
          <div className="row w-100 text-center bg-light justify-content-center">
            <h2 className="lead align-self-center text-center">
            <span className="spinner spinner--large">Loading…</span>
            </h2>
          </div>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <ul className="nav-pills">
          <li className="nav-item">
            <Link to="/">
            <p className="h4">Back to Index</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={this.onDeleteClick.bind(this)}>
              <p className="h4">Delete Post</p>
            </Link>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row w-100 justify-content-center">
            <h2 className="col-md-4 display-4 text-center">{ post.title }</h2>
          </div>
          <h4  className="text-center"> Categories : { post.categories }</h4>
          <blockquote className="lead">{ post.content }</blockquote>
        </div>
      </div>
    );
  }
}

function mapStateToProps({post} , ownProps){
  return { post : post[ownProps.match.params.id] }
}

export default connect(mapStateToProps , {fetchPost , deletePost})(PostShow);
