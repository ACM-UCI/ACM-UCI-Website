#include <iostream>
#include <vector>
using namespace std;

int n;

int get_max_sub(vector<vector<int> > & grid) {
    // make cumulative grid
    int cum[2 * n][2 * n];
    for (int i = 0; i < 2 *n; ++i) {
        for (int j = 0; j < 2 * n; ++j) {
            cum[i][j] = grid[i][j];
            if (i > 0) cum[i][j] += cum[i - 1][j];
            if (j > 0) cum[i][j] += cum[i][j - 1];
            if (i > 0 && j > 0) cum[i][j] -= cum[i - 1][j - 1];
        }
    }

    int result = 75 * -100;
    // starting coordinate
    for (int a = 0; a < 2 * n; ++a) {
        for (int b = 0; b < 2 * n; ++b) {

            // ending coordinate
            for (int x = a; x < 2 * n && x < (a + n); ++x) {
                for (int y = b; y < 2 * n && y < (b + n); ++y) {
                    int temp = cum[x][y];
                    if (a > 0) temp -= cum[a - 1][y];
                    if (b > 0) temp -= cum[x][b - 1];
                    if (a > 0 && b > 0) temp += cum[a - 1][b - 1];
                    result = max(result, temp);
                }
            }

        }
    }
    return result;
}

int main () {

    // read input
    int q; scanf("%d", &q);
    while (q --> 0) {
        scanf("%d", &n);
        vector<vector<int> > grid(2*n, vector<int>(2*n));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                scanf("%d", &grid[i][j]);
                grid[i][j + n] = grid[i][j];
                grid[i + n][j] = grid[i][j];
                grid[i + n][j + n] = grid[i][j];

            }
        }

        cout << get_max_sub(grid) << endl;
    }
    return 0;
}