import { useEffect,useRef,type ReactNode } from 'react'
import { TranslateIcon } from '@phosphor-icons/react'
import type { Lang } from '../types'
export function GridBackground(){return <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden'}}><div style={{position:'absolute',inset:'-40px',backgroundImage:'radial-gradient(circle, rgba(52,211,153,0.18) 1px, transparent 1px)',backgroundSize:'32px 32px',animation:'grid-drift 20s linear infinite',opacity:.4}}/><div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 30%, var(--bg) 100%)'}}/></div>}
export function Reveal({children,delay=0}:{children:ReactNode;delay?:number}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const el=ref.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.style.transitionDelay=`${delay}ms`;el.classList.add('visible');observer.disconnect()}},{threshold:.1});observer.observe(el);return()=>observer.disconnect()},[delay]);return <div ref={ref} className="reveal">{children}</div>}
export function Section({id,title,children}:{id:string;title:string;children:ReactNode}){return <section id={id} style={{marginBottom:'80px'}}><Reveal><div className="section-title">{title}</div></Reveal>{children}</section>}
export function LanguageToggle({lang,onToggle}:{lang:Lang;onToggle:()=>void}){return <button className="lang-toggle" onClick={onToggle} title={lang==='pt'?'Switch to English':'Mudar para Português'}><TranslateIcon size={13}/>{lang==='pt'?'EN':'PT'}</button>}

