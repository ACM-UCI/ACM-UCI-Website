#include <bits/stdc++.h>

using namespace std;

bool checkMagicSquare(vector<vector<int> > & arr) {
    int sum = arr[0][0] + arr[0][1] + arr[0][2];
    return (arr[0][0] + arr[1][0] + arr[2][0] == sum &&
            arr[0][1] + arr[1][1] + arr[2][1] == sum &&
            arr[0][2] + arr[1][2] + arr[2][2] == sum &&
            arr[1][0] + arr[1][1] + arr[1][2] == sum &&
            arr[2][0] + arr[2][1] + arr[2][2] == sum &&
            arr[0][0] + arr[1][1] + arr[2][2] == sum &&
            arr[0][2] + arr[1][1] + arr[2][0] == sum);
}

set<vector<vector<int> > > generateMagicSquares() {
    int arr[9] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    set<vector<vector<int> > > magicSquares;
    vector<vector<int> > tempArr(3, vector<int>(3));
    do {
        tempArr = {{arr[0], arr[1], arr[2]}, {arr[3], arr[4], arr[5]}, {arr[6], arr[7], arr[8]}};
        if (checkMagicSquare(tempArr)) {
            magicSquares.insert(tempArr);
        }
    } while (next_permutation(arr, arr+9));
    return magicSquares;
}

int calculateDifference(const vector<vector<int> > & magic, vector<vector<int> > & original) {
    int diff = 0;
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            diff += abs(magic[i][j] - original[i][j]);
        }
    }
    return diff; 
}

// Complete the formingMagicSquare function below.
int formingMagicSquare(vector<vector<int> > s) {
    set<vector<vector<int> > > allMagicSquares = generateMagicSquares();
    int result = 100;
    for (set<vector<vector<int> > >::iterator it=allMagicSquares.begin(); it!=allMagicSquares.end(); ++it) {
        result = min(result, calculateDifference(*it, s));
    }
    return result;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    vector<vector<int>> s(3);
    for (int i = 0; i < 3; i++) {
        s[i].resize(3);

        for (int j = 0; j < 3; j++) {
            cin >> s[i][j];
        }

        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }

    int result = formingMagicSquare(s);

    fout << result << "\n";

    fout.close();

    return 0;
}
