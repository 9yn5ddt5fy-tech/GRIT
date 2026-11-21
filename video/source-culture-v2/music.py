# Soft pentatonic score: plucked "yatga" melody, low drone, frame drum on the place cuts.
import numpy as np, wave, sys
sr = 44100; D = 36.5; N = int(sr * D); L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
def add(sig, t, pan=0.0, g=1.0):
    i = int(t * sr)
    if i >= N: return
    n = min(len(sig), N - i); L[i:i+n] += sig[:n] * g * (1 - pan); R[i:i+n] += sig[:n] * g * (1 + pan)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def pluck(f, dur=1.6, damp=.996, bright=.5):
    n = int(dur * sr); P = max(2, int(sr / f)); buf = rng.uniform(-1, 1, P) * bright + rng.uniform(-1, 1, P) * (1 - bright) * .3
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % P]; buf[i % P] = damp * .5 * (buf[i % P] + buf[(i + 1) % P])
    return out * .5
def drone(f, dur):
    n = int(dur * sr); t = np.arange(n) / sr; s = np.zeros(n)
    for k, a in [(1, 1), (2, .5), (3, .32), (4, .18), (6, .08)]: s += a * np.sin(2 * np.pi * f * k * t + k)
    env = np.minimum(1, t / 2.5) * np.minimum(1, (dur - t) / 2.5); return s * env * .06
def drum(g=1.0):
    n = int(.5 * sr); t = np.arange(n) / sr; f = 70 + 60 * np.exp(-t * 25)
    s = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 9); s += rng.standard_normal(n) * np.exp(-t * 40) * .15
    return s * .7 * g
bpm = 96; beat = 60 / bpm
scale = [57, 60, 62, 64, 67, 69, 72, 74, 76]          # A minor pentatonic
motif = [0, 2, 3, 4, 3, 2, 4, 5, 6, 5, 4, 3, 2, 3, 1, 0]
add(drone(hz(45), D), 0, 0, 1); add(drone(hz(52), D), 0, .2, .6)
t = 0.4; k = 0
while t < D - 2.0:
    m = scale[motif[k % len(motif)]] + (12 if 9 <= t < 27 and k % 8 in (5, 6) else 0)
    add(pluck(hz(m), 1.8), t, (-.35 if k % 2 else .35), .55 if t > 4.5 else .4)
    if k % 4 == 0 and t > 4.5: add(pluck(hz(m - 12), 2.2, .997, .3), t, 0, .35)
    t += beat / 2 if 4.5 <= t < 31 else beat; k += 1
cuts = [4.5 + 2.25 * i for i in range(10)] + [27.0, 31.5]
for c in cuts: add(drum(1.0 if c in (4.5, 27.0, 31.5) else .6), c - .02, 0, 1)
for b in np.arange(4.5, 27, beat * 2): add(drum(.25), b + beat, .1, 1)
for m in [57, 64, 69, 72, 76]: add(pluck(hz(m), 4.0, .9985, .6), 31.6, (m % 5 - 2) / 6, .5)
mix = np.stack([L, R], 1); mix = np.tanh(mix * 1.1); fade = np.ones(N); fn = int(2.0 * sr); fade[-fn:] = np.linspace(1, 0, fn); mix *= fade[:, None]
mix /= np.abs(mix).max() * 1.12
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((mix * 32767).astype('<i2').tobytes())
