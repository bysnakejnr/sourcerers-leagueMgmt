import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import NavigationComponent from "./components/NavigationComponent";
import FooterComponent from './components/FooterComponent'; 
import AuthContext from "./context/authContext";



export default function App() {

  return (
    <>
    <AuthContext.ProviderWrapper>
      <div className="App" style={{"minHeight":"100%", "paddingBottom":"60px"}}>
        <NavigationComponent />
        <RouterProvider router={routes} />
        <FooterComponent />
      </div>
    </AuthContext.ProviderWrapper>
  </>
  );  
}
