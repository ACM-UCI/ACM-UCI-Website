#include <iostream>
using namespace std;

int main () {
    int k; scanf("%d", &k);
    while (k != 0) {

        int arr[k];
        for (int i = 0; i < k; ++i) {
            scanf("%d", &arr[i]);
        }

        for (int i = 0; i < k - 5; ++i) {
            for (int j = i + 1; j < k - 4; ++j) {
                for (int z = j + 1; z < k - 3; ++z) {
                    for (int x = z + 1; x < k - 2; ++x) {
                        for (int y = x + 1; y < k - 1; ++y) {
                            for (int q = y + 1; q < k; ++q) {
                                cout << arr[i] << " " << arr[j] << " " << arr[z] << " " << arr[x] << " " << arr[y] << " " << arr[q] << endl;
                            }
                        }
                    }
                }
            }
        }

        scanf("%d", &k);
        if (k != 0) cout << endl;
    }
    return 0;
}