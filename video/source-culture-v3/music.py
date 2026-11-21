import numpy as np, wave, sys
sr=44100; D=42.0; N=int(sr*D); L=np.zeros(N); R=np.zeros(N)
bpm=120; beat=60/bpm; off=0.5   # music time = t + off -> downbeats on scene cuts
rng=np.random.default_rng(3)
def add(sig,t,pan=0.0,g=1.0):
    i=int(t*sr)
    if i>=N: return
    if i<0: sig=sig[-i:]; i=0
    n=min(len(sig),N-i); L[i:i+n]+=sig[:n]*g*(1-pan)/1.0; R[i:i+n]+=sig[:n]*g*(1+pan)/1.0
def env(n,a,d): t=np.arange(n)/sr; return np.minimum(1,t/max(a,1e-4))*np.exp(-t/d)
def kick():
    n=int(.35*sr);t=np.arange(n)/sr;f=45+90*np.exp(-t*30);ph=2*np.pi*np.cumsum(f)/sr;return np.sin(ph)*env(n,.002,.12)*1.0
def clap():
    n=int(.25*sr);x=rng.standard_normal(n);x=np.diff(np.concatenate([[0],x]));return x*env(n,.001,.07)*.35
def hat(o=False):
    n=int((.12 if o else .05)*sr);x=rng.standard_normal(n);x=np.diff(np.diff(np.concatenate([[0,0],x])));return x*env(n,.001,.05 if o else .015)*.08
def tone(f,dur,kind='saw',a=.005,d=.3,h=12):
    n=int(dur*sr);t=np.arange(n)/sr;s=np.zeros(n)
    if kind=='sine': s=np.sin(2*np.pi*f*t)
    elif kind=='tri':
        for k in range(1,h,2): s+=((-1)**((k-1)//2))*np.sin(2*np.pi*f*k*t)/k**2
    else:
        for k in range(1,h): s+=np.sin(2*np.pi*f*k*t)/k*np.exp(-k*.15)
    return s*env(n,a,d)
def hz(m): return 440*2**((m-69)/12)
prog=[[45,48,52,57],[41,45,48,53],[48,52,55,60],[43,47,50,55]]  # Am F C G
total_beats=int((D+off)/beat)+1
for b in range(total_beats):
    tm=b*beat-off; bar=b//4; ch=prog[bar%4]; inbar=b%4
    intro = tm<5.0; outro = tm>=39.2
    if not intro and tm<39.2 and not (28.0<=tm<32.0 and b%2):
        add(kick(),tm,0,.9)
        if inbar in (1,3): add(clap(),tm,.1,1)
        add(hat(),tm+beat/2,-.3,1); add(hat(),tm+beat/4,.3,.6); add(hat(True),tm+3*beat/4,.2,.5)
    # bass 8ths
    if tm<39.2 and (not intro or tm>=2.0):
        for e in range(2):
            add(tone(hz(ch[0]-12),beat/2*.9,'saw',.003,.12,8),tm+e*beat/2,0,.35 if not intro else .15)
    # chord stab on 1 and the "and" of 2
    if (inbar in (0,) or (inbar==1)) and not intro:
        tt=tm if inbar==0 else tm+beat/2
        for m in ch[1:]+[ch[0]+12]: add(tone(hz(m),.6,'saw',.004,.18,10),tt,(m%5-2)/6,.09)
    # arp 16ths, from scene 2 on
    if tm>=10.5 and tm<39.2 and not (28.0<=tm<32.0):
        notes=[ch[0]+24,ch[1]+12,ch[2]+12,ch[3]+12]
        for s in range(4):
            m=notes[(inbar*4+s)%4]+(12 if (inbar==3 and s==3) else 0)
            add(tone(hz(m),.18,'tri',.002,.07),tm+s*beat/4,(-.5 if s%2 else .5),.13)
# whoosh into each cut
for c in [5,10.5,16,22,28,32,37]:
    n=int(.6*sr);x=rng.standard_normal(n);k=np.linspace(0,1,n)
    lp=np.zeros(n);a=0.0
    for i in range(n):
        al=.02+.4*k[i]**2; a+=al*(x[i]-a); lp[i]=a
    add(lp*k**2*.5,c-.6,0,1)
    add(tone(hz(84),.8,'sine',.001,.25)*.25,c,.0,1)  # sparkle on the cut
# intro riser + final ring
for tk in [0.4,0.9,1.4,1.9,2.4,2.9]:
    add(tone(1800,.06,'sine',.0005,.012)*.5,tk,-.2,1); add(tone(900,.09,'sine',.0005,.03)*.4,tk+.19,.2,1)
n=int(1.4*sr);t=np.arange(n)/sr;add(np.sin(2*np.pi*(150+700*(t/1.4)**2)*t)*(t/1.4)**2*.12,3.6,0,1)
add(kick()*1.2,5.0,0,1)
for m in [57,64,69,72,76]: add(tone(hz(m),1.2,'saw',.002,.35,10),5.0,(m%5-2)/6,.11)
for m in [45,52,57,60,64,69]: add(tone(hz(m),3,'saw',.01,1.4,10),39.2,(m%5-2)/6,.12)
mix=np.stack([L,R],1); mix=np.tanh(mix*1.2); fade=np.ones(N); fn=int(1.2*sr); fade[-fn:]=np.linspace(1,0,fn); mix*=fade[:,None]
mix/=np.abs(mix).max()*1.12
with wave.open(sys.argv[1],'w') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes())
