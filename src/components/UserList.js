import React, { useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [editUser, setEditUser] = useState(null);
    const [editData, setEditData] = useState({ username: '', email: '', password: '' });

    const handleAction = (action, username) => {
        switch (action) {
            case 'Block':
                const blockedUsers = users.map(user => 
                    user.username === username ? { ...user, blocked: true } : user
                );
                updateUserList(blockedUsers);
                break;
            case 'Unblock':
                const unblockedUsers = users.map(user => 
                    user.username === username ? { ...user, blocked: false } : user
                );
                updateUserList(unblockedUsers);
                break;
            case 'Remove':
                const updatedUsers = users.filter(user => user.username !== username);
                updateUserList(updatedUsers);
                break;
            case 'Edit':
                const userToEdit = users.find(user => user.username === username);
                setEditUser(username);
                setEditData(userToEdit);
                break;
            default:
                break;
        }
    };

    const updateUserList = (updatedUsers) => {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedUsers = users.map(user => 
            user.username === editUser ? editData : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setEditUser(null);
    };

    return (
        <div>
            <div className="card">
                <h2>User List</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.username}>
                            <span>{user.username} - {user.email}</span>
                            <button onClick={() => handleAction('Block', user.username)} disabled={user.blocked}>Block</button>
                            <button onClick={() => handleAction('Unblock', user.username)} disabled={!user.blocked}>Unblock</button>
                            
                            {!user.blocked && (
                                <>
                                    <button onClick={() => handleAction('Edit', user.username)}>Edit</button>
                                    <button onClick={() => handleAction('Remove', user.username)}>Remove</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                
                {editUser && (
                    <div>
                        <h2>Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className='input-x'> 
                                <label htmlFor="name">Username:</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={editData.username} 
                                    onChange={handleEditChange} 
                                    required 
                                />
                            </div>
                            
                            <div className='input-x'>
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={editData.email} 
                                    onChange={handleEditChange} 
                                    required 
                                />
                            </div>
                            
                            <div className='input-x'>
                                <label htmlFor="password">Password:</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={editData.password} 
                                    onChange={handleEditChange} 
                                    required 
                                />
                            </div>
                            
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
