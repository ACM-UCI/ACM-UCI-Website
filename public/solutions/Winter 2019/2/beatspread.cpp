// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) beatspread
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// simple absolute value:
// x + y = sum
// |x - y| = diff
// just make sure to validate at every step
int main() {
  int ca;
  GET(ca);
  while (ca--) {
    int s, d;
    GET(s);
    GET(d);
    int x, y;
    x = (s + d) / 2;
    y = s - x;
    if (x >= 0 && y >= 0 && x + y == s && abs(x - y) == d) {
      printf("%d %d\n", max(x, y), min(x, y));
    } else {
      x = (s - d) / 2;
      y = s - x;
      if (x >= 0 && y >= 0 && x + y == s && abs(x - y) == d) {
        printf("%d %d\n", max(x, y), min(x, y));
      } else {
        printf("impossible\n");
      }
    }
  }
  return 0;
}
