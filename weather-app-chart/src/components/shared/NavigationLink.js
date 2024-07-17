import { Link } from "react-router-dom";

/*type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};*/
const NavigationLink = (props) => {
  console.log('inside nav link,  ', props);
  const role = props.role;
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
      state = {{
        role : {role}
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;