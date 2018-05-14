import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import PostsIndex from './components/post_index';
import reducers from './reducers';
import promise from 'redux-promise';
import PostsNew from './components/posts_new';
import PostShow from './components/posts_show';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          <Route path='/posts/:id' component={PostShow} />
          <Route path='/' component={PostsIndex} />
        </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
