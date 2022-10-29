import { Link, Switch, Route } from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <div className="header__logo" />
      <p className="header__email">{props.userEmail}</p>
      <Switch>
        <Route exact path='/sign-in'>
          <Link className="header__authorization" to='/sign-up'>Регистрация</Link>
        </Route>
        <Route exact path='/sign-up'>
          <Link className="header__authorization" to='/sign-in'>Войти</Link>
        </Route>
        <Route>
          {<Link
            className="header__authorization header__authorization-exit"
            onClick={props.onSignOut}
            to="/sign-in">Выйти</Link>}
        </Route>
      </Switch>
    </header>
  )
}

export default Header;