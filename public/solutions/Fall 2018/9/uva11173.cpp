// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11173
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int main() {
  int N;
  GET(N);
  while (N--) {
    int n, k;
    GET(n);
    GET(k);

    int res = 0;
    int lim = 1 << n;
    for (int i = n - 1; i >= 0; --i) {
      // add in a new digit and reflect k
      if (k >= lim / 2) {
        res |= 1 << i;
        k = lim / 2 - (k - (lim / 2) + 1);
      }
      lim /= 2;
    }

    printf("%d\n", res);
  }
  return 0;
}
