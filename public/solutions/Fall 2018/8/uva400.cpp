// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 400
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

#define W 60

int main() {
  int n;
  string files[105];
  while (GET(n) > 0) {
    for (int i = 0; i < n; ++i) cin >> files[i];
    sort(files, files + n);
    int max_length =
        max_element(files, files + n,
                    [](string& a, string& b) { return a.size() < b.size(); })
            ->size();
    int cols = (W - max_length) / (max_length + 2) + 1;
    int rows = n / cols;
    if (rows * cols < n) ++rows;

    // dividing line
    for (int i = 0; i < W; ++i) cout << '-';
    cout << endl;

    // other output
    for (int r = 0; r < rows; ++r) {
      for (int c = 0; c < cols; ++c) {
        int index = c * rows + r;
        if (index >= n) continue;
        cout << files[index];
        if (c != cols - 1) {
          for (int i = files[index].size(); i < max_length + 2; ++i)
            cout << ' ';
        }
      }
      cout << '\n';
    }
  }
  return 0;
}
