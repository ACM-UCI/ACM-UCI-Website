// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11760
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

bool rows[10010];
bool cols[10010];

int main() {
  int r, c, n;
  for (int ca = 1; scanf("%d %d %d", &r, &c, &n) && !(!r && !c && !n); ++ca) {
    memset(rows, true, sizeof(rows));
    memset(cols, true, sizeof(cols));

    int r2, c2;
    for (int i = 0; i < n; ++i) {
      GET(r2);
      GET(c2);
      rows[r2] = false;
      cols[c2] = false;
    }
    GET(r2);
    GET(c2);

    printf("Case %d: ", ca);
    bool escapes[] = {
        rows[r2] && cols[c2],
        (r2 > 0) && rows[r2 - 1] && cols[c2],
        (r2 < r - 1) && rows[r2 + 1] && cols[c2],
        (c2 > 0) && rows[r2] && cols[c2 - 1],
        (c2 < c - 1) && rows[r2] && cols[c2 + 1],
    };
    if (any_of(escapes, escapes + 5, [](bool b) { return b; })) {
      printf("Escaped again! More 2D grid problems!\n");
    } else {
      printf("Party time! Let's find a restaurant!\n");
    }
  }
  return 0;
}
