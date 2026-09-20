import { useEffect, useState } from 'react'
import type { GitHubProfile } from '../types'
export function useGitHubProfile(username: string) {
 const [profile,setProfile]=useState<GitHubProfile|null>(null)
 useEffect(()=>{ const controller=new AbortController(); fetch(`https://api.github.com/users/${username}`,{signal:controller.signal}).then(r=>{if(!r.ok) throw new Error('GitHub request failed'); return r.json() as Promise<GitHubProfile>}).then(setProfile).catch(e=>{if(!(e instanceof DOMException&&e.name==='AbortError')) setProfile(null)}); return()=>controller.abort() },[username])
 return profile
}

