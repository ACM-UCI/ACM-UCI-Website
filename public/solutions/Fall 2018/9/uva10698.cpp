// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10698
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

string lower(const string& s) {
  string res = s;
  for (int i = 0; i < res.size(); ++i) {
    if (isupper(res[i])) res[i] += 'a' - 'A';
  }
  return res;
}

int get_width(int n) {
  int width = 0;
  for (; n != 0; n /= 10, ++width)
    ;
  return width;
}

struct team {
  string name;
  int games;
  int pts;
  int poss_pts;
  int goals;
  int suffered;

  team() {}
  team(string& name_)
      : name(name_), goals(0), suffered(0), games(0), pts(0), poss_pts(0) {}

  // sort by points, goal diff, scored goals, name
  bool operator<(const team& rhs) const {
    if (pts != rhs.pts) return pts < rhs.pts;

    int diff = goals - suffered;
    int rhs_diff = rhs.goals - rhs.suffered;
    if (diff != rhs_diff) return diff < rhs_diff;

    if (goals != rhs.goals) return goals < rhs.goals;

    return lower(name) > lower(rhs.name);
  }

  bool operator==(const team& rhs) const {
    int diff = goals - suffered;
    int rhs_diff = rhs.goals - rhs.suffered;
    return pts == rhs.pts && diff == rhs_diff && goals == rhs.goals;
  }

  bool operator!=(const team& rhs) const { return !(*this == rhs); }
};

int main() {
  int t, g;
  string buf;
  bool first = true;
  while (GET(t) && GET(g) && !(!t && !g)) {
    // team input
    unordered_map<string, team> stats;
    for (int i = 0; i < t; ++i) {
      cin >> buf;
      stats[buf] = team(buf);
    }

    // score input
    string team1, team2;
    int score1, score2;
    char dummy;
    for (int i = 0; i < g; ++i) {
      cin >> team1 >> score1 >> dummy >> score2 >> team2;
      stats[team1].poss_pts += 3;
      stats[team2].poss_pts += 3;
      stats[team1].games += 1;
      stats[team2].games += 1;
      stats[team1].goals += score1;
      stats[team2].goals += score2;
      stats[team1].suffered += score2;
      stats[team2].suffered += score1;
      if (score1 > score2) {
        // team1 wins
        stats[team1].pts += 3;
      } else if (score1 < score2) {
        // team2 wins
        stats[team2].pts += 3;
      } else {
        // tie
        stats[team1].pts += 1;
        stats[team2].pts += 1;
      }
    }

    // Move teams into array for sorting
    vector<team> teams;
    for (auto& x : stats) {
      teams.push_back(x.second);
    }
    sort(teams.begin(), teams.end(), [](team& a, team& b) { return !(a < b); });

    // Output
    if (first)
      first = false;
    else
      printf("\n");

    team prev;
    for (int i = 0; i < t; ++i) {
      if (i == 0 || teams[i] != prev) {
        printf("%2d. ", i + 1);
      } else {
        for (int i = 0; i < 4; ++i) putchar(' ');
      }
      printf("%15s%4d%4d%4d%4d%4d", teams[i].name.c_str(), teams[i].pts,
             teams[i].games, teams[i].goals, teams[i].suffered,
             teams[i].goals - teams[i].suffered);
      if (teams[i].poss_pts == 0) {
        printf("    N/A\n");
      } else {
        printf("%7.2lf\n",
               100.0 * double(teams[i].pts) / double(teams[i].poss_pts));
      }
      prev = teams[i];
    }
  }
  return 0;
}
