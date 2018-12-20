#include <iostream>
#include <tuple>
#include <cmath>
#include <vector>
using namespace std;

int main () {
    int q; scanf("%d", &q);
    while (q --> 0) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<tuple<int, int, int> > edges;
        for (int i = 0; i < m; ++i) {
            int a, b, w;
            scanf("%d %d %d", &a, &b, &w);
            edges.push_back(make_tuple(a, b, w));
        }

        // Bellman - Ford
        int distance[n];
        for (int i = 0; i < n; ++i) {
            distance[i] = INFINITY;
        }
        distance[0] = 0;

        for (int i = 0; i < n - 1; ++i) {
            for (auto e: edges) {
                int a, b, w;
                tie(a, b, w) = e;
                distance[b] = min(distance[b], distance[a] + w);
            }
        }

        // check for negative cycle
        bool isNegativeCylce = false;
        for (auto e: edges) {
            int a, b, w;
            tie(a, b, w) = e;
            if (distance[a] + w < distance[b]) {
                cout << "possible" << endl;
                isNegativeCylce = true;
                break;
            }
        }

        if (!isNegativeCylce) cout << "not possible" << endl;

    }
    return 0;
}