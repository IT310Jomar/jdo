// import AppLogoIcon from './app-logo-icon';
import JomarLogoIcon from '@/components/jdo-log';

export default function AppLogo() {
    return (
        <>
            <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <JomarLogoIcon  />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">JDO OCC Attendance</span>
            </div>
        </>
    );
}
