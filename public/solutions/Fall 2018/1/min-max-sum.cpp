//https://www.hackerrank.com/challenges/mini-max-sum/problem
// Complete the miniMaxSum function below.
void miniMaxSum(vector<int> arr) {
    long min= arr[0],max = arr[0];
    long total = 0;
    for(int i =0; i<arr.size();++i){
        if (arr[i]<min){
            min = arr[i];
        }
        else if(arr[i]>max){
            max = arr[i];
        }
        total+=arr[i];
    }
    cout<<total-max<< " "<<total-min<<endl;
}