import { Link, Switch, Route } from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <div className="header__logo" />
      <p className="header__email">{props.userEmail}</p>
      <Switch>
        <Route exact path='/signin'>
          <Link className="header__authorization" to='/signup'>Регистрация</Link>
        </Route>
        <Route exact path='/signup'>
          <Link className="header__authorization" to='/signin'>Войти</Link>
        </Route>
        <Route>
          {<Link
            className="header__authorization header__authorization-exit"
            onClick={props.onSignOut}
            to="/signin">Выйти</Link>}
        </Route>
      </Switch>
    </header>
  )
}

export default Header;