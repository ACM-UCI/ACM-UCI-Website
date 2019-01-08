// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10152
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int ca;
  cin >> ca;
  int n;
  while (ca--) {
    cin >> n;
    cin.get();
    vector<string> cur(n);
    vector<string> des(n);
    unordered_map<string, int> destoi;
    string s;
    for (int i = 0; i < n; ++i) getline(cin, cur[i]);
    for (int i = 0; i < n; ++i) getline(cin, des[i]);
    for (int i = 0; i < n; ++i) destoi[des[i]] = i;

    // find last one that is out of order
    int last = 0;  // index we are looking for next
    int out = -1;  // last out of order
    for (int i = 0; i < n; ++i) {
      int cur_i = destoi[cur[i]];
      if (cur_i == last) {
        ++last;
      } else if (cur_i > last) {
        last = cur_i + 1;
        out = last - 2;
      }
      // do nothing if cur_i < last
    }

    // output
    for (int i = out; i >= 0; --i) {
      printf("%s\n", des[i].c_str());
    }
    printf("\n");
  }
  return 0;
}
