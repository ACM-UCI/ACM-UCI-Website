// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 100
#include <bits/stdc++.h>
using namespace std;

// NOTE: MAX I AND J ARE ACTUALLY IN RANGE OF 1000000.
// Problem statement is wrong - I had to keep increasing this until it passed.
long long cycles[1000100];

long long algo(long long n) {
  long long tot = 0;
  while (true) {
    ++tot;
    if (n == 1) return tot;
    if (n % 2 == 1)
      n = n * 3 + 1;
    else
      n >>= 1;
  }
}

void precalculate() {
  for (int i = 1; i < 1000100; ++i) cycles[i] = algo(i);
}

int main() {
  precalculate();
  int i, j;
  while (scanf("%d %d", &i, &j) > 0) {
    long long mx = 0;
    int lo = min(i, j);
    int hi = max(i, j);
    for (int k = lo; k <= hi; ++k)
      if (cycles[k] > mx) mx = cycles[k];
    printf("%d %d %lld\n", i, j, mx);
  }
}
