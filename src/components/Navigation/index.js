import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = () => (
  <nav className="main-menu">
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      {/* {authUser ? <NavigationAuth /> : <NavigationNonAuth />} */}
    </AuthUserContext.Consumer>
  </nav>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>¡Bienvenido!</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>¡Bienvenido!</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Iniciar Sesión</Link>
    </li>
  </ul>
);

// {
//   return (
//     <nav className="main-menu">
//       <ul className="flex-row">
//         <li>
//           <Link to={ROUTES.SIGN_IN}>Entrar</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.SIGN_UP}>Registrarse</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.LANDING}>¡Bienvenido!</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.HOME}>Home</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.ACCOUNT}>Cuenta</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.ADMIN}>Administración</Link>
//         </li>
//         <li>
//           <SignOutButton />
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default Navigation;
