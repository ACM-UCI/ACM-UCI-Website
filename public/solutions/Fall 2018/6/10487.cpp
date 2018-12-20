#include <iostream>
using namespace std;

int main () {
    int index = 1;
    while (true) {
        int n; scanf("%d\n", &n);
        if (n == 0) break;
        int nums[n];
        for (int i = 0; i < n; ++i) {
            scanf("%d\n", &nums[i]);
        }

        int m; scanf("%d\n", &m);
        cout << "Case " << index << ":" << endl;
        for (int i = 0; i < m; ++i) {
            int query; scanf("%d\n", &query);
            int result = nums[0] + nums[1];
            int diff = abs(query - result);
            for (int j = 0; j < n; ++j) {
                for (int k = j + 1; k < n; ++k) {
                    if (abs(query - (nums[j] + nums[k])) < diff) {
                        result = nums[j] + nums[k];
                        diff = abs(query - (nums[j] + nums[k]));
                    }
                }
            }
            cout << "Closest sum to " << query << " is " << result << "." << endl;
        }
        ++index;
    }
    return 0;
}