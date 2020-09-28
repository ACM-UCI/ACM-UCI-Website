#include <string>
#include <iterator>
#include <iostream>
#include <algorithm>
#include <array>

using namespace std;
#define LL long long
#define UL unsigned long
#define matrix array<array<LL, 5>, 5>
#define vector array<LL, 5>

LL mod = 1000000007;

matrix matmul(matrix a, matrix b)
{
    matrix c;
    for (unsigned long i = 0; i < a.size(); i++)
    {
        for (unsigned long j = 0; j < b.size(); j++)
        {
            c[i][j] = 0;
            for (unsigned long k = 0; k < 5; k++)
            {
                c[i][j] += (a[i][k] * b[k][j]) % mod;
                c[i][j] %= mod;
            }
        }
    }
    return c;
}

vector matmul(matrix a, vector b)
{
    vector c;
    for (int i = 0; i < 5; i++)
    {
        c[i] = 0;
        for (int j = 0; j < 5; j++)
        {
            c[i] += (a[i][j] * b[i]) % mod;
            c[i] %= mod;
        }
    }
    return c;
}

matrix pow(matrix mat, long p)
{
    if (p == 0)
        return matrix{{{1, 0, 0, 0, 0}, {0, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 0}, {0, 0, 0, 0, 1}}};
    matrix temp = pow(mat, p / 2);
    if (p % 2 == 0)
        return matmul(temp, temp);
    return matmul(matmul(temp, temp), mat);
}

LL solve(LL t)
{
    if (t == 0)
        return 1;
    matrix init = matrix{{{1, 1, 1, 1, 1},
                          {1, 0, 1, 1, 0},
                          {1, 1, 0, 1, 1},
                          {1, 1, 1, 0, 0},
                          {1, 0, 1, 0, 0}}};
    matrix result = pow(init, t - 1);
    vector lastRow = matmul(result, vector{1, 1, 1, 1, 1});
    LL s = 0;
    for (int i = 0; i < 5; i++)
    {
        s += lastRow[i];
        s %= mod;
    }
    return (s * s) % mod;
}

int main()
{
    int t;
    LL c;
    cin >> t;
    for (int i = 0; i < t; i++)
    {
        cin >> c;
        cout << solve(c) << endl;
    }
}