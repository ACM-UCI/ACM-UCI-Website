// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 836
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int grid[30][30];
int sums[30][30];

int main() {
  int ca;
  GET(ca);
  getchar();
  getchar();
  char buf[50];
  bool first = true;

  while (ca--) {
    fgets(buf, 50, stdin);
    int n = strlen(buf) - 1;
    for (int i = 0; i < n; ++i) {
      for (int j = 0; j < n; ++j) {
        grid[i][j] = buf[j] - '0';
      }
      fgets(buf, 50, stdin);
    }

    // Sum up squares
    for (int i = 0; i < n; ++i) {
      for (int j = 0; j < n; ++j) {
        int tot = grid[i][j];
        if (i > 0) tot += sums[i - 1][j];
        if (j > 0) tot += sums[i][j - 1];
        if (i > 0 && j > 0) tot -= sums[i - 1][j - 1];
        sums[i][j] = tot;
      }
    }

    // Search for match
    int mx = 0;
    for (int x0 = 0; x0 < n; ++x0) {
      for (int y0 = 0; y0 < n; ++y0) {
        for (int x = x0; x < n; ++x) {
          for (int y = y0; y < n; ++y) {
            int area = sums[x][y];
            if (x0 > 0) area -= sums[x0 - 1][y];
            if (y0 > 0) area -= sums[x][y0 - 1];
            if (x0 > 0 && y0 > 0) area += sums[x0 - 1][y0 - 1];
            if (area == (x - x0 + 1) * (y - y0 + 1)) mx = max(mx, area);
          }
        }
      }
    }

    if (!first)
      printf("\n");
    else
      first = false;
    printf("%d\n", mx);
  }

  return 0;
}
