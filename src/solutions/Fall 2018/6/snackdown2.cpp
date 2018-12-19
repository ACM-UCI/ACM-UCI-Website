#include <bits/stdc++.h>
using namespace std;

int main() {
  int t, n;
  scanf("%d", &t);

  scanf("%d",&n);
  while(t --> 0){
    vector<int>primes;
    int counter = n;
    while(counter-->2){
    
      bool isPrime= true;
      for(int i = 2; i<=floor(sqrt(counter)); ++i){
        if(counter%i==0){isPrime=false;break;}
        
      }
      if(isPrime){primes.push_back(counter);}
      
    }
    vector<int>semiprimes;
    for(int i=0; i<primes.size(); ++i){
      for(int j=i+1; j<primes.size();++j){
        if(primes[i]!=primes[j]){
          semiprimes.push_back(primes[i]*primes[j]);
        }
      }
    }
    bool sumSemi = false;
    for(int i=0; i<semiprimes.size();++i){
      for(int j=i; j<semiprimes.size();++j){
        if(semiprimes[i]+semiprimes[j]==n){
          printf("%s","YES\n");
          sumSemi = true;
          break;}
      }
      if (sumSemi){break;}
    }
    if (!sumSemi){
      printf("%s", "NO\n");
    }

    scanf("%d",&n);
  }
  return 0;
}