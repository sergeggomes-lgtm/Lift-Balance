import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import LogWorkout from './pages/LogWorkout';
import History from './pages/History';
import Summary from './pages/Summary';
import Balance from './pages/Balance';
import WorkoutDetail from './pages/WorkoutDetail';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={LogWorkout} />
        <Route path="/history" component={History} />
        <Route path="/summary" component={Summary} />
        <Route path="/balance" component={Balance} />
        <Route path="/workout/:id" component={WorkoutDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
