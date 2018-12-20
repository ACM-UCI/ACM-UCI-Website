//https://www.hackerrank.com/challenges/luck-balance/problem

// Complete the luckBalance function below.
int luckBalance(int k, vector<vector<int>> contests) {
    sort(contests.begin(), contests.end(), comp);
    int sum = 0;
    int size = contests.size();
    int lose = 0;
    for (int i = 0; i < size; ++i)
    {
        cout << contests [i][0] << " " << contests[i][1] <<endl;
        if (contests[i][1] == 1 && lose < k)
        {
            sum+=contests[i][0];
            ++lose;
        }
        else if (contests[i][1] == 1 && lose >= k)
            sum -=contests[i][0];
        else
            sum += contests[i][0];
    }
    return sum;
}
