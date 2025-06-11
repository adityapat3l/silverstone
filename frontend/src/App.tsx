import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemList from './components/ItemList';
import GroupList from './components/GroupList';
import AddItemForm from './components/AddItemForm';
import AddPersonForm from './components/AddPersonForm';
import SuperAdminPage from './components/SuperAdminPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Camping App</h1>
        <Switch>
          <Route path="/" exact component={ItemList} />
          <Route path="/groups" component={GroupList} />
          <Route path="/add-item" component={AddItemForm} />
          <Route path="/add-person" component={AddPersonForm} />
          <Route path="/superadmin" component={SuperAdminPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;