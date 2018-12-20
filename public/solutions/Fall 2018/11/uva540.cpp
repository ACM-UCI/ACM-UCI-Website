// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 540
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int main() {
  int t;
  for (int ca = 1; GET(t) && t; ++ca) {
    printf("Scenario #%d\n", ca);

    // Collect teams
    unordered_map<int, int> teams;
    int sz;
    for (int i = 0; i < t; ++i) {
      GET(sz);
      int k;
      for (int j = 0; j < sz; ++j) {
        GET(k);
        teams[k] = i;
      }
    }

    // Keep track of where each team has a position in the queue. Use a list
    // because the iterator does not change.
    // List has a pair of team number and list of team members.
    list<pair<int, queue<int>>> q;
    vector<list<pair<int, queue<int>>>::iterator> team_pos(t, q.end());
    string cmd;
    int x;
    while (cin >> cmd && cmd != "STOP") {
      if (cmd == "ENQUEUE") {
        GET(x);
        int team = teams[x];
        // Check if the team is in the queue
        if (team_pos[team] == q.end()) {
          q.push_back({team, queue<int>()});
          q.back().second.push(x);
          team_pos[team] = --q.end();
        } else {
          team_pos[team]->second.push(x);
        }
      } else if (cmd == "DEQUEUE") {
        printf("%d\n", q.front().second.front());
        q.front().second.pop();
        // Check if the front can be removed
        if (q.front().second.size() == 0) {
          team_pos[q.front().first] = q.end();
          q.pop_front();
        }
      }
    }

    printf("\n");
  }
  return 0;
}
