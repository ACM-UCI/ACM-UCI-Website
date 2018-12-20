#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  int t; scanf("%d", &t);
  while (t --> 0) {
    int n, k; scanf("%d %d", &n, &k);
    vector<long long> teams(n);
    for (int i = 0; i < n; ++i) {
      scanf("%lld", &teams[i]);
    }
    sort(teams.rbegin(), teams.rend());

    int count = k;
    while (teams[count] == teams[count - 1]) ++count;
    printf("%d\n", count);
  }
  return 0;
}