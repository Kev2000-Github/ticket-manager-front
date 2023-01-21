import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../router/AppRouter';
import '@fontsource/roboto/400.css';

const App = () => (
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>
);

export default App;