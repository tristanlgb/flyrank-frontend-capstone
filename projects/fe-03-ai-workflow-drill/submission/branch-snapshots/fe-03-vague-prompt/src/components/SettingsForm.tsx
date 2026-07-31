import { useState } from 'react';
export function SettingsForm(){
 const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [theme,setTheme]=useState('light'); const [notifications,setNotifications]=useState(false);
 const submit=(event:React.FormEvent)=>{event.preventDefault();alert(`Saved ${name} ${email} ${theme} ${notifications}`)};
 return <form onSubmit={submit} className="card form-grid"><h2>Settings</h2><input placeholder="Display name" value={name} onChange={e=>setName(e.target.value)}/><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><select value={theme} onChange={e=>setTheme(e.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select><div className="inline"><input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)}/>Email notifications</div><button type="submit">Save</button></form>;
}
