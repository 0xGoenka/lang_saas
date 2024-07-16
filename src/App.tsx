import "./App.css";
import { Navigator } from "./Navigator";
import { ServicesProvider } from "./services/Services";
import { AppContainer } from "./components/AppContainer";

function App() {
  return (
    <AppContainer>
      <ServicesProvider>
        <Navigator />
      </ServicesProvider>
    </AppContainer>
  );
}

export default App;
