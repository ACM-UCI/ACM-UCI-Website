// Complete the compareTriplets function below.
//https://www.hackerrank.com/challenges/compare-the-triplets/problem
vector<int> compareTriplets(vector<int> a, vector<int> b) {
    int alice, bob;
    vector<int>result;
    alice = bob = 0;
    for(int i = 0; i<a.size();++i){
        if (a[i]>b[i]){
            ++alice;
        }
        else if(b[i]>a[i]){
            ++bob;
        }
    }
    result.push_back(alice);
    result.push_back(bob);
    return result;
}