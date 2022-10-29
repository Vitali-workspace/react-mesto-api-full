import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {

  return (
    <Route>
      {
        () => props.statusAuth
          ? <Component {...props} />
          : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;