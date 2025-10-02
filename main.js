/* Jarvis Frontend Logic */
const logEl = document.getElementById('log');
function log(text) {
  const t = document.createElement('div');
  t.innerHTML = `» ${text}`;
  logEl.prepend(t);
}
document.getElementById('locale').textContent = navigator.language;
document.getElementById('plat').textContent = navigator.userAgent.split(')')[0];
function updateTime(){document.getElementById('timeSmall').textContent=new Date().toLocaleTimeString();}
setInterval(updateTime,1000);updateTime();

const canvas=document.getElementById('bgCanvas'),ctx=canvas.getContext('2d');let W,H;
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}resize();window.onresize=resize;
function loop(t){ctx.clearRect(0,0,W,H);ctx.fillStyle="rgba(0,230,217,0.04)";ctx.beginPath();ctx.arc(W/2,H/2,120+Math.sin(t*0.002)*20,0,Math.PI*2);ctx.strokeStyle="rgba(0,230,217,0.3)";ctx.stroke();requestAnimationFrame(loop);}requestAnimationFrame(loop);

const barsHolder=document.getElementById('bars');for(let i=0;i<18;i++){let b=document.createElement('div');b.className='bar';barsHolder.appendChild(b);}
function setWaveAmplitude(a){[...barsHolder.children].forEach((b,i)=>{b.style.height=(20+Math.sin(i+Date.now()/200)*40*a)+'%';});}

function speak(txt){const u=new SpeechSynthesisUtterance(txt);speechSynthesis.speak(u);log("JARVIS: "+txt);}
function handleCommand(cmd){cmd=cmd.toLowerCase();
  if(cmd.includes("time")){speak("The time is "+new Date().toLocaleTimeString());}
  else if(cmd.includes("date")){speak("Today is "+new Date().toDateString());}
  else if(cmd.includes("open")){let site=cmd.split("open")[1].trim();if(!site.startsWith("http"))site="https://"+site;window.open(site,"_blank");speak("Opening "+site);}
  else if(cmd.includes("joke")){speak("Why do Java developers wear glasses? Because they don't C sharp.");}
  else {speak("I didn't understand that.");}
}

document.getElementById('speakBtn').onclick=()=>{const val=document.getElementById('textInput').value;log("You: "+val);handleCommand(val);}
document.getElementById('clearBtn').onclick=()=>logEl.innerHTML="";

log("Booting Jarvis UI...");
