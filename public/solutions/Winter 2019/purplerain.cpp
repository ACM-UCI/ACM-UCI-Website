#include <iostream>
#include <cmath>
#include <iomanip>

using namespace std;

int main(){
    string s;
    cin >> s;
    long a[s.size()+1];
    a[0] = 0;
    for (int i=0; i<s.size(); i++)
    {
        if(s[i]=='B'){
            a[i+1] = a[i]+1;
        }
        else{
            a[i+1] = a[i]-1;
        }
    }
    long m = -100000, m2 = 100000;
    int k,k2;
    for (int i=0; i<s.size()+1; i++)
    {
        if(m<a[i])
        {
            m = a[i];
            k = i;
        }
        if(m2>a[i])
        {
            m2 = a[i];
            k2 = i;
        }
    }
    if(k<k2)
    {
        cout << k+1 << " " << k2 << endl;
    }
    else{
        cout << k2+1 << " " << k << endl;
    }
    return 0;
}
