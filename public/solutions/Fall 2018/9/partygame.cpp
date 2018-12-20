#include <iostream>
#include <vector>

using namespace std;

int main(){
  
  int t,n;
  cin >> t;
  while(t--){
    bool c=true;
    cin >> n;
    vector<int> v(n+1);
    for(int i=0; i<n; i++){
      cin >> v[i+1];
    }

    for(int i=1; i<=n; i++){
      int ct=1,j=i;
      while(v[j]!=i){
        int temp = j;
        j = v[j];
        ct++;
        v[temp] = temp;
      }
      v[j]=j;
      int x = 0;
      while((ct | 1<<x) != ct){
        x++;
      }

      if((ct ^ (1<<x)) != 0){
        cout << "Some starve." << endl;
        c = false;
        break;
      }
    }
    if(c){
      cout << "All can eat." << endl;
    }

  }
  return 0;
}