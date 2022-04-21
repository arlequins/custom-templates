import { AuthProvider } from '@app/contexts/Auth';
import BrowserRoutes from '@app/routes/BrowserRoutes';

const App = () => {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>
      <BrowserRoutes />
    </AuthProvider>
  );
};

export default App;
