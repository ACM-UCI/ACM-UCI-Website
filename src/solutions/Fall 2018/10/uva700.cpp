// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 700
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int y[25];
int a[25];
int b[25];

int main() {
  int n;
  for (int ca = 1; GET(n) && n; ++ca) {
    for (int i = 0; i < n; ++i) {
      GET(y[i]);
      GET(a[i]);
      GET(b[i]);
    }

    // Complete search :D
    int res = 0;
    bool ok = false;
    for (int i = *max_element(a, a + n); i < 10000; ++i) {
      bool loc_ok = true;
      for (int j = 0; j < n; ++j) {
        if ((i - y[j]) % (b[j] - a[j]) != 0) {
          loc_ok = false;
          break;
        }
      }
      if (loc_ok) {
        res = i;
        ok = true;
        break;
      }
    }

    printf("Case #%d:\n", ca);
    if (!ok) {
      printf("Unknown bugs detected.\n");
    } else {
      printf("The actual year is %d.\n", res);
    }
    printf("\n");
  }
  return 0;
}
