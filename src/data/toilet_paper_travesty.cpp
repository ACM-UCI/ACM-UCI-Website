#include <bits/stdc++.h>


/* Perform a greed predicate check
 * Assuming 0-based indexing
 * First attempt to put all values greater than or equal to val in the even indexed sequence.
 * If that does not work, attempt so with the odd indexed sequence.
 */
bool check(std::vector<int>& A, int val, int k) {

    bool is_even = true;
    int cntAdded = 0;
    for (int i = 0; i < A.size(); ++i) {
        if (is_even) {
            // Add to subsequence if A[i] >= val
            if (A[i] >= val) { ++cntAdded; is_even = !is_even; }
        } else {
            // Automatically add what value is available to the odd set to leave more options for the even set.
            is_even = !is_even;
            ++cntAdded;
        }
    }

    if (cntAdded >= k) return true;

    // Repeat same procedure but adding all values greater than or equal to val to the odd subsequence.
    bool is_odd = false;
    cntAdded = 0;
    for (int i = 0; i < A.size(); ++i) {
        if (is_odd) {
            if (A[i] >= val) { ++cntAdded; is_odd = !is_odd; }
        } else {
            is_odd = !is_odd;
            ++cntAdded;
        }
    }

    return cntAdded >= k;
}

int main() {

    int N,K; scanf("%d %d", &N, &K);
    std::vector<int> A(N);
    std::vector<int> A_sorted(N);
    for (int i = 0; i < N; ++i) {
        int v; std::scanf("%d", &v);
        A[i] = v;
        A_sorted[i] = v;
    }

    // The answer must always be one of the values in the array
    // Thus we can binary search over the array
    std::sort(A_sorted.begin(), A_sorted.end());

    int lo = 0, hi = N;
    while (lo + 1 < hi) {

        int mid = (lo+hi)/2;
        
        if (check(A, A_sorted[mid], K)) {
            lo = mid;
        } else {
            hi = mid;
        }
    }

    printf("%d\n", A_sorted[lo]);

    return 0;
}
