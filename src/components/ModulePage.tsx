import { useParams } from 'react-router-dom';
import Terminal from '../pages/apps/Terminal';
import TerminalList from '../pages/apps/Terminal/TerminalList';
import DailyReports from '../pages/apps/DailyReports';
import Menu from '../pages/apps/Menu';
import Staff from '../pages/apps/Staff';

const ModulePage = () => {
    const { module, outletId } = useParams();

    switch (module) {
        case 'terminal':
            if (!outletId) return <div>Please select an outlet</div>;
            return <TerminalList outletId={outletId} />;

        case 'daily-report':
            if (!outletId) return <div>Please select an outlet</div>;
            return <DailyReports outletId={outletId} />;

        case 'menu':
            if (!outletId) return <div>Please select an outlet</div>;
            return <Menu outletId={outletId} />;

        case 'staff':
            if (!outletId) return <div>Please select an outlet</div>;
            return <Staff outletId={outletId} />;

        // case 'staff':
        //     return <StaffModule outletId={outletId} />;

        default:
            return <div>Module not found</div>;
    }
};
export default ModulePage;
