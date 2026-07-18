import { SettingsForm } from './components/SettingsForm';
export function App(){return <main className="app-shell"><h1>User Settings</h1><SettingsForm onSave={async()=>Promise.resolve()}/></main>;}
