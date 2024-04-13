import { Profile, Sidebar } from './Profile';

interface DashboardProps {
    user: User;
}

export default function Dashboard({user}: DashboardProps) {
    return(
        <div>
            <Sidebar user={user}></Sidebar>
            <Profile user={user}></Profile>
        </div>
    )
}