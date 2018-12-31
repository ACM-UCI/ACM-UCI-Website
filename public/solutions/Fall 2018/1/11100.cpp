// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11100

// Based on (copied) from
// github.com/lamphanviet/competitive-programming/uva-online-judge/accepted-solutions/11100
// - The Trip - 2007.cpp

#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  scanf("%d\n", &n);
  while (n > 0) {
    // Make initial list of bags.
    vector<int> bags;
    for (int i = 0; i < n; ++i) {
      int x;
      scanf("%d\n", &x);
      bags.push_back(x);
    }
    sort(bags.begin(), bags.end());
    bags.push_back(-1);

    // The number of sets of bags needed is equal to the maximum number of
    // one kind of bag. For instance, in the sample input for the problem,
    // we need 3 sets because we have 3 bags of size 2.
    int numsets = 0;
    int tempsize = 1;
    for (int i = 1; i <= n; ++i) {
      if (bags[i] != bags[i - 1]) {
        if (tempsize > numsets) numsets = tempsize;
        tempsize = 1;
      } else {
        ++tempsize;
      }
    }

    // Print output for this case -- The bags in each set are determined by
    // simply going through the input, stepping by numsets each time. This
    // works because the input is already sorted, so as we go through we
    // always increase in bag size. We are guaranteed to not have repeated
    // bag sizes because there are at most numsets bags of each size.
    printf("%d\n", numsets);
    for (int i = 0; i < numsets; ++i) {
      printf("%d", bags[i]);
      for (int j = i + numsets; j < n; j += numsets) {
        printf(" %d", bags[j]);
      }
      putchar('\n');
    }

    // Get next input
    scanf("%d\n", &n);
    if (n > 0) putchar('\n');
  }
  return 0;
}
