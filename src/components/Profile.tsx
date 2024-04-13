interface SideBarProps {
    user: User;
}

export function Sidebar({user}: SidebarProps){
    return(
        <div>
            <div>{user.username}</div>
            <div>status: </div>
        </div>
    );
}

interface ProfileProps{
    user: User;
}

export function Profile({user}: ProfileProps) {
    return <div>{user.username}</div>
}