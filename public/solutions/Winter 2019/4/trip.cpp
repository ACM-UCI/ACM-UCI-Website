// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) trip
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int c[10010];

int main() {
  int n;
  while (GET(n) && n) {
    int tot = 0;
    for (int i = 0; i < n; ++i) {
      int b, d;
      scanf("%d.%d", &b, &d);
      c[i] = b * 100 + d;
      tot += c[i];
    }
    int avg = tot / n;
    int rem =
        tot - avg * n;  // tells number of people who will have an extra cent
    sort(c, c + n);  // IMPORTANT! - this way everyone who loses money will be
                     // at the end

    // greedily remove as much money as we can from the people who have above
    // average - first remove from people who will have an extra cent and then
    // from people who will not
    int res = 0;
    for (int i = n - 1; i >= n - rem; --i) {
      if (c[i] > (avg + 1)) res += c[i] - (avg + 1);
    }
    for (int i = n - rem - 1; i >= 0; --i) {
      if (c[i] > avg) res += c[i] - avg;
    }
    printf("$%d.%02d\n", res / 100, res % 100);
  }
  return 0;
}
