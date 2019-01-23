/*****************************************
*   UVA #10038 : Jolly Jumpers            *
*   Labels     : Hashing                  *
******************************************/

#include <bits/stdc++.h>

using namespace std;

int main()
{
  int n;
  while(cin >> n){
    bool arr[3001]={};
    int x,y;
    string s="Jolly";
    cin >> x;
    for(int i=0; i<n-1; i++){
      y = x;
      cin >> x;
      int diff = max(x,y)-min(x,y);
      if(arr[diff] || diff>n-1 || diff<1){
        s = "Not jolly";
      }
      arr[diff]=true;
    }
    cout << s << endl;;
  }

  return 0;
}
