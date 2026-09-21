import { useEffect,useRef,type ReactNode } from 'react'
import { TranslateIcon } from '@phosphor-icons/react'
import type { Lang } from '../types'
export function Reveal({children,delay=0}:{children:ReactNode;delay?:number}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const el=ref.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.style.transitionDelay=`${delay}ms`;el.classList.add('visible');observer.disconnect()}},{threshold:.1});observer.observe(el);return()=>observer.disconnect()},[delay]);return <div ref={ref} className="reveal">{children}</div>}
const sectionOrder: Record<string, string> = { about: '01', experience: '02', work: '03', projects: '04', skills: '05', education: '06' }
export function Section({id,title,children}:{id:string;title:string;children:ReactNode}){return <section id={id} style={{marginBottom:'80px'}}><Reveal><div className="section-heading"><span>{sectionOrder[id] ?? '00'}</span><div className="section-title">{title}</div><code>GET /api/v1/{id}</code><i>200 OK</i></div></Reveal>{children}</section>}
export function LanguageToggle({lang,onToggle}:{lang:Lang;onToggle:()=>void}){return <button className="lang-toggle" onClick={onToggle} title={lang==='pt'?'Switch to English':'Mudar para Português'}><TranslateIcon size={13}/>{lang==='pt'?'EN':'PT'}</button>}
