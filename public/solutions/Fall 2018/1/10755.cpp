#include <bits/stdc++.h>
using namespace std;

long long max_sum(long long reduced[], int n) {
    long long dp[n];
    dp[0] = reduced[0];
    for (int i = 1; i < n; ++i) {
        dp[i] = max(reduced[i], dp[i - 1] + reduced[i]);
    }
    
    long long result = dp[0];
    for (int i = 0; i < n; ++i) {
        result = max(result, dp[i]);
    }

    return result; 
}

int A, B, C;

long long solve(vector<vector<vector<long long> > > & rect, int A, int B, int C) {
    // make cumulative slices
    long long rect_cum[A][B][C];
    for (int k = 0; k < C; ++k) {
        for (int i = 0; i < A; ++i) {
            for (int j = 0; j < B; ++j) {
                rect_cum[i][j][k] = rect[i][j][k];
                if (i > 0) rect_cum[i][j][k] += rect_cum[i - 1][j][k];
                if (j > 0) rect_cum[i][j][k] += rect_cum[i][j - 1][k];
                if (i > 0 && j > 0) rect_cum[i][j][k] -= rect_cum[i - 1][j - 1][k];
            }
        }
    }

    long long final_res = -LONG_MAX;
    // starting point for subslice
    for (int k = 0; k < A; ++k) {
        for (int l = 0; l < B; ++l) {

            // end point for subslice
            for (int i = k; i < A; ++i) {
                for (int j = l; j < B; ++j) {

                    // calculate all the sums of the subslices
                    long long reduced[C];
                    for (int z = 0; z < C; ++z) {
                        long long sum = rect_cum[i][j][z];
                        if (k > 0) sum -= rect_cum[k - 1][j][z];
                        if (l > 0) sum -= rect_cum[i][l - 1][z];
                        if (k > 0 && l > 0) sum += rect_cum[k-1][l-1][z];
                        reduced[z] = sum;
                    }
                    long long result = max_sum(reduced, C);
                    final_res = max(final_res, result);
                }
            }

        }
    }
    // cout << final_res << endl;
    return final_res;
}

int main () {
    int n; scanf("%d", &n);
    while (n--) {
        scanf("%d %d %d", &A, &B, &C);
        vector<vector<vector<long long> > > rect(A);
        for (int i = 0; i < A; ++i) {
            vector<vector<long long> > temp(B);
            rect[i] = temp;
            for (int j = 0; j < B; ++j) {
                vector<long long> temp(C);
                rect[i][j] = temp;
                for (int k = 0; k < C; ++k) {
                    scanf("%lld", &rect[i][j][k]);
                }
            }
        }
        cout << solve(rect, A, B, C) << endl;
        if (n > 0)
            cout << endl;
    }
    return 0;
}