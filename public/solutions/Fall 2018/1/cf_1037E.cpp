//Problem @ http://codeforces.com/problemset/problem/1037/E
//#graph #k-core
#include<iostream>
#include<set>

#define N 200005 //just a large number, makes it easier than using vectors.

using namespace std;

set<int> v[N];
set<int> s;
pair<int, int> edges[N];
int k;

void remove(int x){
    if(v[x].size() < k && s.erase(x)){ // removes node if it has less than k degree
        for(auto i: v[x]){
            v[i].erase(x); //removes x from other neighbors' lists
            remove(i); // this checks whether the node that has 1 less degree still can stay.
        }
    }
}

int main(){
    int n,m, a,b;
    cin>>n>>m>>k;
    for(int i = 1; i <= m; i++){ //i th edge added
        cin >> a >> b;
        edges[i].first = a;
        edges[i].second = b;
        v[a].insert(b);
        v[b].insert(a);
    }

    for(int j = 1; j <= n; j++){ //add all nodes, so then to be checked later
        s.insert(j);
    }

    for(int i=1; i <= n; i++){
        remove(i); // check whether the node has to be removed, 
                    //      if yes: the method will take of all the dependencies
    }

    int ans[N];
    for(int i = m; i >= 1; i--){ // going from last edge added to the first
        ans[i] = s.size(); //the answer would be the number of nodes in the set
                            //after removing disqualified nodes
        
        //now we need to remove the last edge, and remove disqualified nodes
        int x = edges[i].first;
        int y = edges[i].second;

        //remove x from y and y from x
        v[x].erase(y);
        v[y].erase(x);

        //remove disqualified nodes
        remove(x);
        remove(y);
    }

    //print the answers
    for(int i = 1; i <= m; i++)
        cout << ans[i] << endl;


    return 0;
}