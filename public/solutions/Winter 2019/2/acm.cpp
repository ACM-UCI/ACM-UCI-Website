// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) acm
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// using a class makes it easier to keep track of things
struct problem {
  int penalty;
  bool solved;
  problem() : penalty(0), solved(false) {}
};

// implementation problem, process all input lines and update our problem data
// gradually
int main() {
  int t;
  vector<problem> problems(26);

  // get each line
  while (GET(t) && t != -1) {
    char ch, ans[10];
    scanf(" %c %s", &ch, ans);
    bool right = strcmp(ans, "right") == 0;
    int prob = ch - 'A';

    // only do something if the problem is not already solved
    if (problems[prob].solved) {
      continue;
    } else {
      if (right) {
        problems[prob].penalty += t;
        problems[prob].solved = true;
      } else {
        problems[prob].penalty += 20;
      }
    }
  }

  // find the solution by counting up solved and penalty
  int tot = 0;    // solved
  int tot_t = 0;  // penalty time
  for_each(problems.begin(), problems.end(), [&](problem& p) {
    if (p.solved) {
      ++tot;
      tot_t += p.penalty;
    }
  });

  // print out the solution
  printf("%d %d\n", tot, tot_t);

  return 0;
}
