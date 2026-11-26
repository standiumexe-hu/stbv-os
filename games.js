/* DUAL Arcade v3.1 — sin dependencias. */
let extraGameCleanup=null,extraGamePause=null;
function disposeExtraGame(){if(extraGameCleanup)extraGameCleanup();extraGameCleanup=null;extraGamePause=null;}
function pauseExtraGame(){if(extraGamePause)extraGamePause();}
function readGameRecord(key){try{return Math.max(0,Number(localStorage.getItem('stbv-'+key))||0);}catch{return 0;}}
function writeGameRecord(key,n){try{localStorage.setItem('stbv-'+key,String(n));}catch{/* almacenamiento bloqueado */}}
function normalizeSong(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/%/g,'percent').replace(/[^a-z0-9]/g,'');}
let songBag=[];
function renderSongGuess(root){
  const bank=data.songGame||[];
  if(!bank.length){root.append(el('p','empty','Agrega canciones al banco de pistas en data.js.'));return;}
  if(!songBag.length)songBag=shuffle(bank);
  const song=songBag.pop();let guesses=[],ended=false,clipTimer,record=readGameRecord('song-streak');
  const intro=el('div','arcade-intro');intro.append(el('p','extra-label','03 / SONG GUESS'),el('h4','','Guess the song ♡'),el('p','','Tienes cinco intentos. Cada respuesta incorrecta desbloquea una pista nueva.'));
  const hud=el('div','arcade-hud'),attempts=el('span'),streak=el('span');hud.append(attempts,streak);
  const hints=el('ol','song-hints'),history=el('div','song-history');
  const form=el('form','song-form'),label=el('label','form-field','Título de la canción'),input=el('input');input.type='text';input.autocomplete='off';input.maxLength=140;input.required=true;input.placeholder='Escribe tu respuesta…';label.append(input);
  const submit=el('button','action primary','Adivinar ↵');submit.type='submit';form.append(label,submit);
  const msg=el('p','game-status');msg.setAttribute('role','status');
  const next=button('Nueva canción',()=>{disposeExtraGame();root.replaceChildren();renderSongGuess(root);});
  const skip=button('Saltar / revelar',()=>finish(false,'Canción revelada.'));const actions=el('div','actions');actions.append(skip,next);next.disabled=true;
  root.append(intro,hud,hints);
  let audio=null;
  function stopClip(){clearTimeout(clipTimer);if(audio)audio.pause();}
  if(song.audio){
    audio=el('audio');audio.src=song.audio;audio.preload='none';
    const play=button('▶ Escuchar 2 segundos',async()=>{try{stopClip();audio.currentTime=0;await audio.play();if(!root.isConnected||ended||!state.visible||document.hidden){stopClip();return;}clipTimer=setTimeout(stopClip,2000);}catch{msg.textContent='No se pudo reproducir el fragmento. Puedes seguir con las pistas.';}});
    audio.addEventListener('timeupdate',()=>{if(audio.currentTime>=2)stopClip();});root.append(play,audio);
  }
  root.append(history,form,msg,actions);
  function draw(){attempts.textContent='Intentos: '+guesses.length+' / 5';streak.textContent='Racha: '+record;hints.replaceChildren();for(let i=0;i<5;i++){const li=el('li',i<=guesses.length?'unlocked':'locked',i<=guesses.length?song.clues[i]:'Pista bloqueada');hints.append(li);}history.replaceChildren();for(let i=0;i<5;i++){const g=guesses[i];history.append(el('div','guess-row '+(g?(g.correct?'correct':'incorrect'):''),g?(g.correct?'✓ ':'✕ ')+g.text:'Intento '+(i+1)));}}
  function finish(won,message){if(ended)return;ended=true;stopClip();record=won?record+1:0;writeGameRecord('song-streak',record);msg.textContent=message+' Respuesta: '+song.title+' ♡';input.disabled=submit.disabled=skip.disabled=true;next.disabled=false;draw();}
  form.addEventListener('submit',e=>{e.preventDefault();if(ended)return;const raw=input.value.trim(),guess=normalizeSong(raw);if(!guess){msg.textContent='Escribe un título válido.';return;}if(guesses.some(g=>normalizeSong(g.text)===guess)){msg.textContent='Ya intentaste ese título; prueba otro.';return;}const correct=[song.title,...(song.aliases||[])].some(s=>normalizeSong(s)===guess);guesses.push({text:raw,correct});input.value='';if(correct)finish(true,'¡Correcto!');else if(guesses.length===5)finish(false,'Se acabaron los intentos.');else{msg.textContent='No es esa. ¡Nueva pista desbloqueada!';draw();input.focus();}});
  function onHidden(){if(document.hidden)stopClip();}document.addEventListener('visibilitychange',onHidden);
  extraGamePause=stopClip;extraGameCleanup=()=>{ended=true;stopClip();document.removeEventListener('visibilitychange',onHidden);};draw();
}
function renderBravoCatch(root){
  const cfg=data.arcade,W=360,H=360,PW=106,PH=106,PY=H-PH-5,S=37;
  let x=(W-PW)/2,score=0,lives=cfg.lives,best=readGameRecord('catch-best'),objects=[],running=false,over=false,frame=0,last=0,spawn=0,elapsed=0,anim=0,facing=1,drag=false,dragUntil=0,doubleUntil=0,slowUntil=0,keys=new Set(),selected=0,disposed=false;
  try{const saved=localStorage.getItem('stbv-catch-character');const idx=cfg.characters.findIndex(c=>c.id===saved);if(idx>=0)selected=idx;}catch{}
  const intro=el('div','arcade-intro');intro.append(el('p','extra-label','04 / BRAVO CATCH'),el('h4','','Choose your BRAVO ♡'),el('p','','Atrapa objetos, consigue bonus y supera tu récord. Elige tu personaje antes de jugar.'));
  const choices=el('div','bravo-choices'),choiceButtons=[];
  cfg.characters.forEach((c,i)=>{const b=button('',()=>{if(running||elapsed>0&&!over)return;selected=i;try{localStorage.setItem('stbv-catch-character',c.id);}catch{};updateChoices();drawPlayer(false);},'bravo-choice');const thumb=el('span','bravo-thumb');thumb.style.backgroundImage=`url("${c.idle||c.run}")`;b.append(thumb,el('span','',c.name));choices.append(b);choiceButtons.push(b);});
  const hud=el('div','arcade-hud'),scoreEl=el('span'),livesEl=el('span'),bestEl=el('span');hud.append(scoreEl,livesEl,bestEl);
  const effects=el('div','catch-effects','Sin bonus activos');
  const board=el('div','catch-board bravo-stage');board.tabIndex=0;board.setAttribute('aria-label','Área de juego. Usa las flechas izquierda y derecha o arrastra el personaje.');
  const field=el('div','catch-field'),player=el('div','catch-player bravo-sprite');player.setAttribute('role','img');
  const overlay=el('div','catch-overlay','¿Ready, DUAL? ♡');field.append(player);board.append(field,overlay);
  const status=el('p','game-status','Presiona Jugar para comenzar.');status.setAttribute('role','status');
  const start=button('▶ Jugar',()=>{if(over)reset();if(running)pause();else play();},'action primary'),restart=button('Reiniciar',()=>{reset();status.textContent='Partida reiniciada. Presiona Jugar.';});
  const controls=el('div','catch-controls'),left=button('◀ Izquierda',()=>{}),right=button('Derecha ▶',()=>{});controls.append(left,start,right);
  const legend=el('div','catch-legend bravo-legend'),sheet=new Image();sheet.src=cfg.objectSheet;
  function icon(spec){const tile=el('span','bravo-object-art');const [sx,sy,sw,sh]=spec.rect;tile.style.backgroundImage=`url("${cfg.objectSheet}")`;tile.style.backgroundSize=`${1536/sw*100}% ${1024/sh*100}%`;tile.style.backgroundPosition=`${sx/(1536-sw)*100}% ${sy/(1024-sh)*100}%`;tile.setAttribute('aria-hidden','true');return tile;}
  const labels={life:'+1 vida',double:'×2 · 10 s',slow:'Lento · 5 s',bonus:'+50 pts'};
  cfg.objects.forEach(o=>{const item=el('span','bravo-legend-item');item.append(icon(o),el('span','',o.name+' · '+(labels[o.effect]||'+'+o.points+' pts')));legend.append(item);});
  root.append(intro,choices,hud,effects,board,controls,legend,status,restart);
  // Precarga las hojas originales para evitar destellos al cambiar de estado.
  const preload=cfg.characters.flatMap(c=>[c.run,c.idle].filter(Boolean)).map(src=>{const img=new Image();img.src=src;return img;});
  function updateChoices(){choiceButtons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===selected));b.disabled=running||(elapsed>0&&!over);});}
  function drawPlayer(moving){const c=cfg.characters[selected],src=moving?c.run:(c.idle||c.run),n=!moving&&!c.idle?0:Math.floor(anim*(moving?12:4))%8;player.style.backgroundImage=`url("${src}")`;player.style.backgroundPosition=`${(n%4)*100/3}% ${Math.floor(n/4)*100}%`;player.style.transform=`scaleX(${facing})`;player.style.left=(x/W*100)+'%';player.style.top=(PY/H*100)+'%';player.dataset.animation=moving?'run':'idle';player.dataset.frame=n;player.setAttribute('aria-label',c.name);}
  function hudUpdate(){scoreEl.textContent='Puntos: '+score;livesEl.textContent='Vidas: '+lives;bestEl.textContent='Récord: '+best;}
  function showEffects(){const a=[];if(doubleUntil>elapsed)a.push('★ ×2: '+Math.ceil(doubleUntil-elapsed)+' s');if(slowUntil>elapsed)a.push('⌛ Lento: '+Math.ceil(slowUntil-elapsed)+' s');effects.textContent=a.join(' · ')||'Sin bonus activos';}
  function clearKeys(){keys.clear();drag=false;dragUntil=0;}
  function stop(){running=false;cancelAnimationFrame(frame);clearKeys();drawPlayer(false);updateChoices();}
  function pause(){if(!running)return;stop();overlay.hidden=false;overlay.textContent='PAUSA ♡';start.textContent='▶ Continuar';status.textContent='Partida en pausa.';}
  function reset(){stop();objects.forEach(o=>o.node.remove());objects=[];x=(W-PW)/2;score=0;lives=cfg.lives;elapsed=spawn=anim=doubleUntil=slowUntil=0;facing=1;over=false;overlay.hidden=false;overlay.textContent='¿Ready, DUAL? ♡';start.textContent='▶ Jugar';drawPlayer(false);hudUpdate();showEffects();updateChoices();}
  function play(){if(disposed||!root.isConnected||!state.visible)return;running=true;last=performance.now();overlay.hidden=true;start.textContent='Ⅱ Pausar';status.textContent='¡Atrapa todos los objetos!';updateChoices();board.focus({preventScroll:true});frame=requestAnimationFrame(tick);}
  function end(){over=true;stop();overlay.hidden=false;overlay.textContent='GAME OVER · '+score+' pts ♡';status.textContent='Fin de la partida. Puntos: '+score+'.';start.textContent='▶ Otra partida';}
  const regular=cfg.objects.filter(o=>!o.effect),special=cfg.objects.filter(o=>o.effect);
  function addObject(){const pool=Math.random()<.12?special:regular,spec=pool[Math.floor(Math.random()*pool.length)],node=el('span','catch-object bravo-drop');node.append(icon(spec));node.setAttribute('aria-hidden','true');const o={x:Math.random()*(W-S),y:-S,node,spec};field.append(node);objects.push(o);}
  function moveTo(n){const next=Math.min(W-PW,Math.max(0,n));if(Math.abs(next-x)>.01)facing=next>x?1:-1;x=next;}
  function collect(o){const s=o.spec;let points=s.points*(doubleUntil>elapsed?2:1);if(s.effect==='life')lives=Math.min(5,lives+1);if(s.effect==='double')doubleUntil=elapsed+10;if(s.effect==='slow')slowUntil=elapsed+5;score+=points;if(score>best){best=score;writeGameRecord('catch-best',best);}const fx=el('span','bravo-spark',points?'+'+points:labels[s.effect]);fx.style.left=(o.x/W*100)+'%';fx.style.top=(o.y/H*100)+'%';field.append(fx);fx.addEventListener('animationend',()=>fx.remove(),{once:true});hudUpdate();showEffects();}
  function tick(now){if(!running)return;if(!root.isConnected||!state.visible||document.hidden){pause();return;}const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;elapsed+=dt;anim+=dt;const speed=Math.min(300,100+elapsed*4)*(slowUntil>elapsed?.5:1);spawn+=dt;const interval=Math.max(.42,1.1-elapsed*.013);if(spawn>=interval){spawn-=interval;addObject();}const dx=Number(keys.has('right'))-Number(keys.has('left')),before=x;moveTo(x+dx*265*dt);drawPlayer(Math.abs(x-before)>.01||now<dragUntil);showEffects();
    // Hitbox horizontal centrada en el cuerpo, separada de los márgenes de la hoja.
    const hx=x+PW*.23,hw=PW*.54,hy=PY+PH*.21;
    for(let i=objects.length-1;i>=0;i--){const o=objects[i],prev=o.y;o.y+=speed*dt;o.node.style.left=(o.x/W*100)+'%';o.node.style.top=(o.y/H*100)+'%';const caught=prev+S<=PY+PH&&o.y+S>=hy&&o.y<=PY+PH&&o.x+S>=hx&&o.x<=hx+hw;if(caught){collect(o);o.node.remove();objects.splice(i,1);}else if(o.y>=H){o.node.remove();objects.splice(i,1);if(!o.spec.effect){lives=Math.max(0,lives-1);hudUpdate();if(!lives){end();return;}}}}frame=requestAnimationFrame(tick);
  }
  const direction=k=>['ArrowLeft','a','A'].includes(k)?'left':['ArrowRight','d','D'].includes(k)?'right':null;
  function down(e){if(!running||e.target.matches('input,textarea,select,[contenteditable=true]'))return;const d=direction(e.key);if(d){e.preventDefault();keys.add(d);}else if(e.key==='Escape')pause();}
  function up(e){const d=direction(e.key);if(d)keys.delete(d);}
  function hold(b,d){b.addEventListener('pointerdown',e=>{if(!running)return;b.setPointerCapture(e.pointerId);keys.add(d);e.preventDefault();});['pointerup','pointercancel','lostpointercapture'].forEach(n=>b.addEventListener(n,()=>keys.delete(d)));b.addEventListener('click',e=>{if(running&&e.detail===0){moveTo(x+(d==='left'?-32:32));dragUntil=performance.now()+150;}});}
  hold(left,'left');hold(right,'right');
  function pointerMove(e){const r=field.getBoundingClientRect(),before=x;moveTo((e.clientX-r.left)/r.width*W-PW/2);if(Math.abs(x-before)>.01)dragUntil=performance.now()+150;}
  board.addEventListener('pointerdown',e=>{if(!running)return;drag=true;board.setPointerCapture(e.pointerId);pointerMove(e);});board.addEventListener('pointermove',e=>{if(running&&drag)pointerMove(e);});['pointerup','pointercancel','lostpointercapture'].forEach(n=>board.addEventListener(n,()=>drag=false));
  function hidden(){if(document.hidden)pause();}window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',pause);document.addEventListener('visibilitychange',hidden);
  extraGamePause=pause;extraGameCleanup=()=>{disposed=true;stop();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',pause);document.removeEventListener('visibilitychange',hidden);};reset();
}
