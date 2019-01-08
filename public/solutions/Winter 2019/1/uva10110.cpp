// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10110
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// All based on number of factors of a number; a perfect square has an odd
// number of factors while other numbers have even number of factors.
int main() {
  ll n;
  while (scanf("%lld", &n) && n) {
    ll rt = ll(sqrt(double(n)));
    if (rt * rt == n) {
      printf("yes\n");
    } else {
      printf("no\n");
    }
  }
  return 0;
}
