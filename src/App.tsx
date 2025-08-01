// all routes
import Routes from './routes/Routes';
import { AppColors } from './utils/Colors';

// helpers

// For Default import Theme.scss
import './assets/scss/Theme.scss';

const App = () => {
    return (
        <div
            style={{
                backgroundColor: AppColors.backgroundColor,
                minHeight: '100vh',
            }}>
            <Routes />
        </div>
    );
};

export default App;
