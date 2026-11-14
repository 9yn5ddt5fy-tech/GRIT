"""10s logo-intro sound: airy pad, bubbly plucks as spheres enter, hits on keywords, swell into a
low boom + shimmer when the logo resolves (~7.05s)."""
import numpy as np, wave, sys
sr = 44100; D = 10.0; N = int(sr * D)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(5)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

def add(sig, t, pan=0.0, g=1.0):
    i = int(t * sr)
    if i >= N: return
    n = min(len(sig), N - i)
    L[i:i+n] += sig[:n] * g * (1 - pan); R[i:i+n] += sig[:n] * g * (1 + pan)

def env(n, a, d):
    t = np.arange(n) / sr
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def pad(f, dur, a=1.2, rel=1.5):
    n = int(dur * sr); t = np.arange(n) / sr; s = np.zeros(n)
    for dd in (-.006, -.002, .002, .006):
        for k in range(1, 7):
            s += np.sin(2 * np.pi * f * (1 + dd) * k * t + k) / (k ** 1.6)
    e = np.minimum(1, t / a) * np.minimum(1, (dur - t) / rel).clip(0, 1)
    return s * e / 4

def bubble(f):  # pitched "blip" for each sphere
    n = int(.35 * sr); t = np.arange(n) / sr
    fr = f * (1 + 1.2 * np.exp(-t * 40))
    return np.sin(2 * np.pi * np.cumsum(fr) / sr) * env(n, .002, .09)

def pluck(f, d=.4):
    n = int(1.2 * sr); t = np.arange(n) / sr; s = np.zeros(n)
    for k in range(1, 9):
        s += np.sin(2 * np.pi * f * k * t) / k * np.exp(-t * k * 2.5)
    return s * env(n, .002, d)

def kick(dec=.25, f0=40):
    n = int(1.2 * sr); t = np.arange(n) / sr
    f = f0 + 120 * np.exp(-t * 25)
    return np.sin(2 * np.pi * np.cumsum(f) / sr) * env(n, .002, dec)

def noise_swell(dur, t_lo=.02, t_hi=.45):
    n = int(dur * sr); x = rng.standard_normal(n); k = np.linspace(0, 1, n)
    lp = np.zeros(n); a = 0.0
    for j in range(n):
        al = t_lo + (t_hi - t_lo) * k[j] ** 2; a += al * (x[j] - a); lp[j] = a
    return lp * k ** 2

# pad: Dmaj9 colour, then resolves to G/D on the logo
for m in (50, 57, 62, 66, 69): add(pad(hz(m), 7.4, 1.5, 1.0), 0.0, (m % 5 - 2) / 6, .05)
for m in (43, 55, 59, 62, 66, 71): add(pad(hz(m), 3.0, .05, 1.6), 7.0, (m % 5 - 2) / 6, .06)
# spheres entering (render: .05 + i*.08)
for i, m in enumerate((74, 78, 81, 83, 86, 88, 90)):
    add(bubble(hz(m)), .1 + i * .08, (i - 3) / 5, .18)
# keyword hits (1.2, 2.05, 2.9, 3.75): soft kick + bright pluck
for i, t0 in enumerate((1.2, 2.05, 2.9, 3.75)):
    add(kick(.18, 50), t0, 0, .55)
    for m in ((74, 81), (76, 83), (78, 85), (81, 88))[i]: add(pluck(hz(m), .5), t0, (i - 1.5) / 3, .14)
# gentle pulse under the keywords
for k in range(16):
    t0 = 1.2 + k * .2125
    if t0 < 4.9: add(pluck(hz(50 if k % 2 == 0 else 57), .15), t0, 0, .07)
# converge swell 5.0 -> 7.05, then boom + shimmer
add(noise_swell(2.05, .01, .5) * .5, 5.0, 0, 1)
n = int(2.0 * sr); t = np.arange(n) / sr
add(np.sin(2 * np.pi * (120 + 500 * (t / 2) ** 2) * t) * (t / 2) ** 2 * .06, 5.05, 0, 1)
add(kick(.9, 34), 7.05, 0, 1.1)
for k, m in enumerate((83, 86, 90, 95, 98)): add(pluck(hz(m), .7), 7.5 + k * .06, (k - 2) / 4, .12)

mix = np.stack([L, R], 1); mix = np.tanh(mix * 1.2)
fn = int(.8 * sr); mix[-fn:] *= np.linspace(1, 0, fn)[:, None]
mix /= np.abs(mix).max() * 1.12
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
