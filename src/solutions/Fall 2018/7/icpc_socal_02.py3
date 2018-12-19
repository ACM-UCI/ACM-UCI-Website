# Problem 2 of ICPC SoCal Regional
# Team iterator - Bryon, Chiang, Frank
import sys
from collections import defaultdict

words = []

for line in sys.stdin:
  line = line.strip().lower()
  if line == "***": break
  for i in range(128):
    if not chr(i).islower() and not chr(i) == ' ':
      line = line.replace(chr(i), "")
  words.extend(line.split())

def similar(a, b):
  # delete (covers insert too)
  for i in range(len(a)):
    if a[0:i] + a[i + 1:] == b:
      return True
  # replace
  if(len(a) == len(b)):
    diffs = 0
    for i in range(len(a)):
      if a[i] != b[i]: diffs += 1
    if diffs == 1: return True
  # transpose
  for i in range(1, len(a)):
    if a[0:i - 1] + a[i] + a[i - 1] +  a[i + 1:] == b:
      return True


sims = defaultdict(set)
for a in words:
  for b in words:
    if a != b and similar(a,b):
      sims[a].add(b)
      sims[b].add(a)

for w in sorted(sims):
  print(f"{w}: {' '.join(sorted(sims[w]))}")
