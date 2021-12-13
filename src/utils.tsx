import { useNavigate, useParams } from "react-router-dom";

export function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export function withParams(Component: any) {
  return (props: any) => <Component {...props} params={useParams()} />;
}
