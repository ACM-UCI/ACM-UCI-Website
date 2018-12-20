// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10264
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int w[33000];
int p[33000];

int main() {
  int n;
  while (GET(n) > 0) {
    for (int i = 0; i < (1 << n); ++i) GET(w[i]);

    // Calculate all potencies
    // To generate neighbors, go through and flip each bit
    for (int i = 0; i < (1 << n); ++i) {
      p[i] = 0;
      for (int j = 0; j < n; ++j) {
        int nei = i;
        nei &= ((1 << n) - 1) - (1 << j);  // Clear bit
        nei |= (~i) & (1 << j);            // Put in inverse
        p[i] += w[nei];
      }
    }

    // Find max
    int mx = 0;
    for (int i = 0; i < (1 << n); ++i) {
      for (int j = 0; j < n; ++j) {
        int nei = i;
        nei &= ((1 << n) - 1) - (1 << j);
        nei |= (~i) & (1 << j);
        mx = max(mx, p[i] + p[nei]);
      }
    }

    printf("%d\n", mx);
  }
  return 0;
}
