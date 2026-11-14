"""Upbeat 'gallop' track in A minor pentatonic, 120 BPM, cuts on beats (4,10,17,23,27)."""
import numpy as np, wave, sys
sr = 44100; D = 32.0; N = int(sr * D)
L = np.zeros(N); R = np.zeros(N)
beat = 0.5
rng = np.random.default_rng(9)

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
    n = int(.3 * sr); t = np.arange(n) / sr
    f = 50 + 100 * np.exp(-t * 32)
    return np.sin(2 * np.pi * np.cumsum(f) / sr) * env(n, .002, .1)

def snare():
    n = int(.22 * sr); x = rng.standard_normal(n); x = np.diff(np.concatenate([[0], x]))
    t = np.arange(n) / sr
    return (x * .5 + np.sin(2 * np.pi * 190 * t) * .5) * env(n, .001, .06) * .5

def shaker():
    n = int(.06 * sr); x = rng.standard_normal(n); x = np.diff(np.diff(np.concatenate([[0, 0], x])))
    return x * env(n, .004, .02) * .06

def tone(f, dur, kind='pluck', a=.003, d=.25):
    n = int(dur * sr); t = np.arange(n) / sr; s = np.zeros(n)
    if kind == 'sine':
        s = np.sin(2 * np.pi * f * t)
    elif kind == 'pluck':  # bright plucked string
        for k in range(1, 10):
            s += np.sin(2 * np.pi * f * k * t) / k * np.exp(-t * k * 3)
    elif kind == 'bow':  # soft bowed lead with vibrato
        vib = 1 + .006 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / .3)
        ph = 2 * np.pi * np.cumsum(f * vib) / sr
        for k in range(1, 8):
            s += np.sin(ph * k) / (k ** 1.3)
        return s * np.minimum(1, t / .06) * np.exp(-t / d)
    else:
        for k in range(1, 12):
            s += np.sin(2 * np.pi * f * k * t) / k * np.exp(-k * .2)
    return s * env(n, a, d)

hz = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [45, 41, 43, 40]       # Am F G Em roots
pent = [57, 60, 62, 64, 67, 69, 72, 74, 76]
# melody (index into pent, length in beats) — 8-bar phrase, repeats
mel = [(5,1),(4,.5),(3,.5),(4,1),(2,1),(3,1.5),(2,.5),(0,2),
       (2,1),(3,.5),(4,.5),(5,1),(7,1),(6,1.5),(5,.5),(4,2),
       (5,1),(4,.5),(3,.5),(4,1),(2,1),(3,1.5),(4,.5),(5,2),
       (7,1),(6,.5),(5,.5),(4,1),(3,1),(2,1.5),(1,.5),(0,2)]

nbeats = int(D / beat)
for b in range(nbeats):
    tm = b * beat; bar = b // 4; root = prog[bar % 4]; inbar = b % 4
    intro = tm < 4.0
    # gallop bass: da-da-DUM (triplet feel)
    for off, g in [(0, .55), (beat / 3, .35), (2 * beat / 3, .45)]:
        if tm < 30.5:
            add(tone(hz(root - 12), .18, 'saw', .002, .09), tm + off, 0, g * (.5 if intro else 1) * .55)
    if not intro and tm < 30.5:
        add(kick(), tm, 0, .85)
        if inbar in (1, 3): add(snare(), tm, .1, 1)
        for k in range(3): add(shaker(), tm + k * beat / 3, (-.3, .3, 0)[k], 1)
    # plucked chord on bar start
    if inbar == 0:
        for m in (root + 12, root + 19, root + 24):
            add(tone(hz(m), 1.2, 'pluck', .002, .5), tm, (m % 5 - 2) / 6, .12 if intro else .1)

# lead melody from the first cut
t0 = 4.0; tt = t0; i = 0
while tt < 30.0:
    idx, ln = mel[i % len(mel)]
    add(tone(hz(pent[idx]), ln * beat * 1.1, 'bow', .03, .9), tt, -.15, .16)
    tt += ln * beat; i += 1

# intro: tile drops + slot-machine ticks + stamp hit
for k in range(5):
    add(tone(hz(72 + [0, 3, 5, 7, 10][k]), .25, 'pluck', .001, .12), .8 + k * .1, (k - 2) / 4, .25)
for k in range(30):
    tk = 1.7 + k * .032
    add(tone(2200, .02, 'sine', .0005, .006), tk, 0, .18)
add(kick() * 1.3, 3.1, 0, 1); add(snare() * 1.6, 3.1, 0, 1)
# whoosh into each tile-wave cut
for c in [4, 10, 17, 23, 27]:
    n = int(.5 * sr); x = rng.standard_normal(n); k = np.linspace(0, 1, n)
    lp = np.zeros(n); a = 0.0
    for j in range(n):
        al = .03 + .35 * k[j] ** 2; a += al * (x[j] - a); lp[j] = a
    add(lp * k ** 2 * .45, c - .5, 0, 1)
# confetti sparkle at the solved word (17 - 7 + 4.75)
for k, m in enumerate([76, 81, 84, 88]): add(tone(hz(m), .5, 'pluck', .001, .25), 14.75 + k * .07, (k - 1.5) / 3, .2)
# final ring
for m in [45, 52, 57, 60, 64, 69]: add(tone(hz(m), 3, 'pluck', .005, 1.2), 30.5, (m % 5 - 2) / 6, .16)

mix = np.stack([L, R], 1); mix = np.tanh(mix * 1.1)
fn = int(1.0 * sr); mix[-fn:] *= np.linspace(1, 0, fn)[:, None]
mix /= np.abs(mix).max() * 1.12
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
