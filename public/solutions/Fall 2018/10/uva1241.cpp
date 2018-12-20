// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 1241
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

bitset<1024> players;

int main() {
  int t;
  GET(t);
  while (t--) {
    int n, m;
    GET(n);
    GET(m);

    for (int i = 0; i < (1 << n); ++i) players[i] = true;
    for (int i = 0; i < m; ++i) {
      int j;
      GET(j);
      players[j - 1] = false;
    }

    int res = 0;
    while (n != 0) {
      for (int i = 0; i < (1 << n); i += 2) {
        if (players[i] ^ players[i + 1]) ++res;
        players[i / 2] = players[i] || players[i + 1];
      }
      --n;
    }

    printf("%d\n", res);
  }
  return 0;
}
