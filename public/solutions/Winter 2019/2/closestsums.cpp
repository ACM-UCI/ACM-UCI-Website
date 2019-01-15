// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) closestsums
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int a[1010];

// simply try all pairs of numbers and see which pair has the closest sum
int main() {
  int n;
  for (int ca = 1; GET(n) > 0; ++ca) {
    printf("Case %d:\n", ca);

    for (int i = 0; i < n; ++i) {
      GET(a[i]);
    }

    int m;
    GET(m);
    while (m--) {
      int q;
      GET(q);
      int res = a[0] + a[1];
      for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
          if (abs(a[i] + a[j] - q) < abs(res - q)) {
            res = a[i] + a[j];
          }
        }
      }
      printf("Closest sum to %d is %d.\n", q, res);
    }
  }
  return 0;
}
