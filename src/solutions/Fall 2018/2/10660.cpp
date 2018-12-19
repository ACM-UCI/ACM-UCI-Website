#include <iostream>
#include <climits>
using namespace std;

int main () {
    int q; scanf("%d", &q);
    while (q --> 0) {
        int arr[5][5] = {0};
        int valid[5][5] = {0};

        int n; scanf("%d", &n);
        for (int i = 0; i < n; ++i) {
            int row, col, val;
            scanf("%d %d %d", &row, &col, &val);
            arr[row][col] = val;
        }

        long long best_dist = LLONG_MAX;
        int result[5] = {0, 1, 2, 3, 4};
        for (int i = 0; i < 25; ++i) {
            for (int j = i + 1; j < 25; ++j) {
                for (int x = j + 1; x < 25; ++x) {
                    for (int y = x + 1; y < 25; ++y) {
                        for (int z = y + 1; z < 25; ++z) {
                            long long total_dist = 0;
                            pair<int, int> offices[5] = { make_pair(i/5, i % 5), make_pair(j/5, j % 5), make_pair(x/5, x % 5), make_pair(y/5, y % 5), make_pair(z/5, z % 5) };
                            for (int k = 0; k < 25; ++k) {
                                int min_dist = INT_MAX;
                                int row = k / 5;
                                int col = k % 5;
                                // loop through 5 offices
                                for (int r = 0; r < 5; ++r) {
                                    min_dist = min(min_dist, (abs(row - offices[r].first) + abs(col - offices[r].second)) * arr[row][col]);
                                }
                                total_dist += min_dist;
                            }
                            if (total_dist < best_dist) {
                                best_dist = total_dist;
                                result[0] = i;
                                result[1] = j;
                                result[2] = x;
                                result[3] = y;
                                result[4] = z;
                            }
                        }
                    }
                }
            }
        }
        cout << result[0] << " " << result[1] << " " << result[2] << " " << result[3] << " " << result[4] << endl;
    }
    return 0;
}