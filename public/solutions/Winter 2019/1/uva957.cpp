// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 957
#include <bits/stdc++.h>
#define FOR(i, a, b) for (int i = a; i < b; ++i)
#define FORe(i, a, b) for (int i = a; i <= b; ++i)
#define GET(x) scanf("%d", &x)
typedef long long ll;
using namespace std;

int popes[101000];

int main() {
  int y, p;
  while (GET(y) > 0) {
    GET(p);
    FOR(i, 0, p) { GET(popes[i]); }

    int mx = 0;
    int first = 0;
    int last = 0;
    for (int i = 0; i < p; ++i) {
      int* last_pos = upper_bound(popes, popes + p, popes[i] + y - 1);
      int num = last_pos - (popes + i);
      if (num > mx) {
        mx = num;
        first = popes[i];
        last = popes[i + num - 1];
      }
    }

    printf("%d %d %d\n", mx, first, last);
  }
  return 0;
}
