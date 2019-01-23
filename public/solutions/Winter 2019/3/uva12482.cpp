// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 12482
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);
  int N, L, C;
  string s;
  while (cin >> N >> L >> C) {
    int lines = 1;
    int cur_line = 0;
    for (int i = 0; i < N; ++i) {
      cin >> s;
      if (cur_line + (cur_line != 0) + s.size() > C) {
        ++lines;
        cur_line = s.size();
      } else {
        cur_line += (cur_line != 0) + s.size();
      }
    }

    printf("%d\n", lines / L + (lines % L != 0));
  }
  return 0;
}
