#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;


class Minion{
public:
    int ID;
    int l;
    int u;

    Minion(int lt, int ut, int i){
        l = lt;
        u = ut;
        ID = i;
    }

};


bool myfunction (Minion i,Minion j) { return (i.u<j.u); }

int main(){

    int n, u, l;

    vector<Minion> minions;

    cin >> n;

    for(int i=0; i<n; i++){
        cin >> l >> u;

        Minion x(l,u,i+1);
        minions.push_back(x);

    }

    sort(minions.begin(), minions.end(), myfunction);

    int k = minions[0].u;
    int s = 1;

    for(int i=1; i<n; i++){
        if(minions[i].l>k){
            s++;
            k = minions[i].u;
        }
    }

    cout << s << endl;

    return 0;

}
