//Problem @ http://codeforces.com/problemset/problem/1051/D
//#dp
#include<iostream>
using namespace std;
#define ll long long
const int M = 998244353;
ll BBWW[1005][2018]; //BBWW[row#][# of components] = # of ways w/ bb or ww as last col
ll BWWB[1005][2018]; //BWWB[row#][# of components] = # of ways w/ bw or wb as last col
int main(){
    int n,k;
    cin >> n >> k;
    BBWW[1][1] = 2; //having 1 column with 1 compent has two options, either bb or ww
    BWWB[1][2] = 2; // having 1 column with 2 compoent is only possible with bw or wb

    for(int col = 2; col <= n; col++){
        for(int j = 1; j <= 2*col; j++){ //2*col is the maximum number of components
            //BBWW can only have BB or WW as last column. 
            //  so adding BB or WW to a BBWW can either increase the components by 1
            //  or don't change the number of components.
            //Adding BB or WW to a BWWB will always increase the # of comps by 1
            //  hence, 2 options for every BWWB
            BBWW[col][j] = (BBWW[col - 1][j - 1] + BBWW[col - 1][j] + 2* BWWB[col - 1][j]) % M;

            //BWWB can only have BW or WB as the last column
            //Adding BB or WW will increase the # of comps by 1
            //Adding WB or BW can either increase the # of comps by 2 or none
            BWWB[col][j] = (BWWB[col - 1][j] + BWWB[col - 1][j -2] + 2 * BBWW[col - 1][j - 1]) % M;
        }
    }

    cout<< (BBWW[n][k] + BWWB[n][k]) % M << endl;

    return 0;
}