import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const settingsSchema=z.object({displayName:z.string().trim().min(2,'Display name must be at least 2 characters.').max(50),email:z.string().trim().email('Enter a valid email address.'),theme:z.enum(['light','dark','system']),emailNotifications:z.boolean()});
export type SettingsFormValues=z.infer<typeof settingsSchema>;
interface SettingsFormProps{onSave?:(values:SettingsFormValues)=>Promise<void>|void;}

export function SettingsForm({onSave}:SettingsFormProps){
 const [status,setStatus]=useState('');
 const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<SettingsFormValues>({resolver:zodResolver(settingsSchema),defaultValues:{displayName:'',email:'',theme:'system',emailNotifications:false}});
 const submit=handleSubmit(async values=>{setStatus('');await onSave?.(values);setStatus('Settings saved successfully.');});
 return <form onSubmit={submit} className="card form-grid" noValidate>
  <h2>Profile settings</h2>
  <div><label htmlFor="displayName">Display name</label><input id="displayName" autoComplete="name" aria-invalid={Boolean(errors.displayName)} aria-describedby={errors.displayName?'displayName-error':undefined}{...register('displayName')}/>{errors.displayName&&<p id="displayName-error" className="error">{errors.displayName.message}</p>}</div>
  <div><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?'email-error':undefined}{...register('email')}/>{errors.email&&<p id="email-error" className="error">{errors.email.message}</p>}</div>
  <div><label htmlFor="theme">Theme</label><select id="theme" {...register('theme')}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></div>
  <fieldset><legend>Notifications</legend><label className="inline" htmlFor="emailNotifications"><input id="emailNotifications" type="checkbox" {...register('emailNotifications')}/>Receive email notifications</label></fieldset>
  <button type="submit" disabled={isSubmitting}>{isSubmitting?'Saving…':'Save settings'}</button><p aria-live="polite" className="success">{status}</p>
 </form>;
}
