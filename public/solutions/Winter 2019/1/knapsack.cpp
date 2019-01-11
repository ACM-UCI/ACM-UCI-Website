#include <bits/stdc++.h>

using namespace std;

vector<string> split_string(string);

// Complete the unboundedKnapsack function below.
int unboundedKnapsack(int k, vector<int> arr) {
    bool sum[k+1];
    sum[0]=true;
    for(int i=1; i<=k; i++){
        sum[i]=false;
        for(int j=0; j<arr.size(); j++){
            int k=i-arr[j];
            if(k>=0){
                if(sum[k]){
                    sum[i]=true;
                    break;
                }
            }
        }
    }
    while(!sum[k]){
        k--;
    }return k;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    int t,n,k;
    cin >> t;

    while(t--){
        
        cin >> n >> k;
        vector<int> arr(n,0);


        for(int i=0; i<n; i++){
            cin >> arr[i];
        }

        fout << unboundedKnapsack(k, arr) << "\n";
    }

    fout.close();

    return 0;
}