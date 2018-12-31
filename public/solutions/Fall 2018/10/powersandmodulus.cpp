#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int main() {
  long long a;
  int b;
  cin >> a >> b;
  if(a%2==0){
    long long tot = 1;
    for(int i=0; i<b; i++){
      tot = (tot * a / 2) % a;
    }
    cout << tot << endl;
  }else{
    cout << 0 << endl;
  }
}