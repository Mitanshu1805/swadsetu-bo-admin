import { BrowserRouter } from 'react-router-dom';

// routes
import { AllRoutes } from './index';

const Routes = () => {
    return (
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    );
};

export default Routes;

// App.tsx or Routes.tsx

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './components/PrivateRoute';  // import PrivateRoute
// import Dashboard from './components/Dashboard';  // your Dashboard component
// import Login from './components/Login';  // your Login component

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={Login} />
//         <PrivateRoute path="/dashboard" component={Dashboard} />  {/* Protected Route */}
//         <Redirect from="/" to="/login" />
//       </Switch>
//     </Router>
//   );
// };

// export default App;
