"""Modern synth-pop track, 100 BPM. Hook hits on each word slam (every beat for 5 beats), drop at 3.0s."""
import numpy as np, wave, sys
sr = 44100; D = 30.0; N = int(sr * D)
L = np.zeros(N); R = np.zeros(N)
beat = 0.6
rng = np.random.default_rng(21)

def add(sig, t, pan=0.0, g=1.0):
    i = int(t * sr)
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    n = min(len(sig), N - i)
    L[i:i+n] += sig[:n] * g * (1 - pan); R[i:i+n] += sig[:n] * g * (1 + pan)

def env(n, a, d):
    t = np.arange(n) / sr
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def kick():
    n = int(.4 * sr); t = np.arange(n) / sr
    f = 42 + 110 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / sr) * env(n, .002, .16)

def clap():
    n = int(.3 * sr); x = rng.standard_normal(n); x = np.diff(np.concatenate([[0], x]))
    e = env(n, .001, .09)
    for o in (.008, .016):  # layered clap
        k = int(o * sr); e[k:] += env(n - k, .001, .02)[:n - k] * .6
    return x * e * .32

def hat(open_=False):
    n = int((.15 if open_ else .05) * sr); x = rng.standard_normal(n)
    x = np.diff(np.diff(np.concatenate([[0, 0], x])))
    return x * env(n, .001, .06 if open_ else .014) * .07

def synth(f, dur, a=.004, d=.3, h=14, det=.004):
    n = int(dur * sr); t = np.arange(n) / sr; s = np.zeros(n)
    for dd in (-det, 0, det):  # detuned supersaw-ish
        for k in range(1, h):
            s += np.sin(2 * np.pi * f * (1 + dd) * k * t) / k * np.exp(-k * .12)
    return s / 3 * env(n, a, d)

def sub(f, dur):
    n = int(dur * sr); t = np.arange(n) / sr
    return np.sin(2 * np.pi * f * t) * env(n, .005, dur * .7)

def pluck(f, dur):
    n = int(dur * sr); t = np.arange(n) / sr; s = np.zeros(n)
    for k in range(1, 8):
        s += np.sin(2 * np.pi * f * k * t) / k * np.exp(-t * k * 6)
    return s * env(n, .001, .12)

hz = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
roots = [45, 41, 36, 43]

# hook: one hit per word slam
for k in range(5):
    tm = k * beat
    add(kick(), tm, 0, 1.0); add(clap(), tm, 0, .8)
    for m in prog[0] + [69]: add(synth(hz(m + (0 if k < 4 else 12)), .5, .002, .14), tm, (m % 5 - 2) / 6, .07)
# riser into drop
n = int(.6 * sr); t = np.arange(n) / sr
add(np.sin(2 * np.pi * (300 + 1500 * (t / .6) ** 2) * t) * (t / .6) ** 2 * .1, 2.4, 0, 1)

nb = int(D / beat)
for b in range(5, nb):
    tm = b * beat
    if tm >= 29.2: break
    bar = (b - 5) // 4; ib = (b - 5) % 4; ch = prog[bar % 4]; rt = roots[bar % 4]
    add(kick(), tm, 0, .9)
    if ib in (1, 3): add(clap(), tm, .05, 1)
    add(hat(), tm + beat / 2, .3, 1); add(hat(), tm + beat / 4, -.3, .5); add(hat(), tm + 3 * beat / 4, -.2, .5)
    if ib == 3: add(hat(True), tm + beat / 2, .2, .8)
    # sub bass offbeat pump
    add(sub(hz(rt - 12), beat * .9), tm, 0, .5)
    add(synth(hz(rt), beat * .45, .003, .1, 6), tm + beat / 2, 0, .12)
    # pad stab on 1 and 3
    if ib in (0, 2):
        for m in ch: add(synth(hz(m), beat * 1.6, .01, .45), tm, (m % 5 - 2) / 6, .06)
    # 16th arp
    arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12]
    for s16 in range(4):
        add(pluck(hz(arp[(ib * 4 + s16) % 4]), .2), tm + s16 * beat / 4, -.4 if s16 % 2 else .4, .13)

# whoosh into each cut
for c in [3.0, 9.0, 15.0, 21.0, 25.2]:
    n = int(.5 * sr); x = rng.standard_normal(n); k = np.linspace(0, 1, n)
    lp = np.zeros(n); a = 0.0
    for j in range(n):
        al = .03 + .35 * k[j] ** 2; a += al * (x[j] - a); lp[j] = a
    add(lp * k ** 2 * .4, c - .5, 0, 1)
# final chord
for m in [45, 57, 60, 64, 69, 72]: add(synth(hz(m), 2.5, .01, 1.0), 27.6, (m % 5 - 2) / 6, .08)

mix = np.stack([L, R], 1); mix = np.tanh(mix * 1.15)
fn = int(1.0 * sr); mix[-fn:] *= np.linspace(1, 0, fn)[:, None]
mix /= np.abs(mix).max() * 1.12
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
