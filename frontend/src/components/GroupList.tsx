import React, { useEffect, useState } from 'react';
import { Group } from '../types';

const GroupList: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('/api/groups');
            const data = await response.json();
            setGroups(data);
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <h2>Groups</h2>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        {group.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;